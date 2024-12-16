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
import { ResultAsync, errAsync, ok } from 'neverthrow';
import type { ProfileService } from './domain.types';
import type { Cookie } from './dto.types';
import type {
  ProfileLaunchDto,
  ProfileLaunchResultDto,
  ProfileStopDto,
} from './dto.types';

export class MultiloginProfileService implements ProfileService {
  private readonly localClient: AxiosInstance;
  private readonly webClient: AxiosInstance;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    const localApiOptions = configService.get<AxiosRequestConfig>(
      'multilogin.localApi',
    );
    const webApiOptions =
      configService.get<AxiosRequestConfig>('multilogin.webApi');

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
    const folderId = this.configService.get<string>(
      'multilogin.profiles.folderId',
    );

    if (!folderId) {
      return errAsync({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'FolderId env var is missing',
      });
    }

    const urls = [dto.startUrl];

    return this.importCookies(profileId, folderId, dto.cookies)
      .andThen(() => this.updateCustomUrls(profileId, urls))
      .andThen(() => this.runProfile(profileId, folderId))
      .map(() => ({}));
  }

  public stopProfile(dto: ProfileStopDto): ResultAsync<null, HttpError> {
    throw new Error('Not implemented');
  }

  private importCookies(
    profileId: string,
    folderId: string,
    cookies: Cookie[],
  ): ResultAsync<null, HttpError> {
    const cookiesString = JSON.stringify(cookies);

    return ResultAsync.fromPromise(
      this.localClient.post('/v1/cookie_import', {
        profile_id: profileId,
        folder_id: folderId,
        cookies: cookiesString,
      }),
      toHttpError,
    ).andThen(() => ok(null));
  }

  private updateCustomUrls(
    profileId: string,
    urls: string[],
  ): ResultAsync<null, HttpError> {
    return ResultAsync.fromPromise(
      this.webClient.post('/profile/partial_update', {
        profile_id: profileId,
        custom_start_urls: urls,
      }),
      toHttpError,
    ).andThen(() => ok(null));
  }

  private runProfile(
    profileId: string,
    folderId: string,
  ): ResultAsync<null, HttpError> {
    const url = `/v2/profile/f/${folderId}/p/${profileId}/start`;

    return ResultAsync.fromPromise(
      this.localClient.get(url),
      toHttpError,
    ).andThen(() => ok(null));
  }
}
