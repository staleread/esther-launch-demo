import type { HttpError } from '@/common/errors/http-error.interface';
import { toHttpError } from '@/common/utils/axios-helpers';
import { HttpStatus } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosResponse,
  default as axios,
} from 'axios';
import { ResultAsync, ok } from 'neverthrow';
import type { ProfileService } from './domain.types';
import type { Cookie } from './dto.types';
import type {
  ProfileLaunchDto,
  ProfileLaunchResultDto,
  ProfileStopDto,
} from './dto.types';

type ProfileData = {
  startUrl: string;
  [key: string]: unknown;
};

export class GologinProfileService implements ProfileService {
  private readonly localClient: AxiosInstance;
  private readonly webClient: AxiosInstance;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    const localApiOptions =
      configService.get<AxiosRequestConfig>('gologin.localApi');
    const webApiOptions =
      configService.get<AxiosRequestConfig>('gologin.webApi');

    if (!localApiOptions || !webApiOptions) {
      throw new Error('API options not set');
    }

    this.localClient = axios.create({ ...localApiOptions });
    this.webClient = axios.create({ ...webApiOptions });
  }

  public launchProfile(
    dto: ProfileLaunchDto,
  ): ResultAsync<ProfileLaunchResultDto, HttpError> {
    const profileId = dto.profileId;

    return this.getProfileData(profileId)
      .andThen((data: ProfileData) =>
        this.updateProfileData(profileId, { ...data, startUrl: dto.startUrl }),
      )
      .andThen(() => this.loadCookies(profileId, dto.cookies))
      .andThen(() => this.startProfile(profileId))
      .map(() => ({}));
  }

  public stopProfile(dto: ProfileStopDto): ResultAsync<null, HttpError> {
    throw new Error('Not implemented');
  }

  private getProfileData(
    profileId: string,
  ): ResultAsync<ProfileData, HttpError> {
    return ResultAsync.fromPromise(
      this.webClient.get(`/browser/${profileId}`),
      toHttpError,
    );
  }

  private updateProfileData(
    profileId: string,
    profileData: ProfileData,
  ): ResultAsync<null, HttpError> {
    return ResultAsync.fromPromise(
      this.webClient.put(`/browser/${profileId}`, { ...profileData }),
      toHttpError,
    ).andThen(() => ok(null));
  }

  private loadCookies(
    profileId: string,
    cookies: Cookie[],
  ): ResultAsync<null, HttpError> {
    return ResultAsync.fromPromise(
      this.webClient.post(`/browser/${profileId}/cookies`, [...cookies]),
      toHttpError,
    ).andThen(() => ok(null));
  }

  private startProfile(profileId: string): ResultAsync<null, HttpError> {
    return ResultAsync.fromPromise(
      this.localClient.post('/browser/start-profile', {
        profileId,
        sync: true,
      }),
      toHttpError,
    ).andThen(() => ok(null));
  }
}
