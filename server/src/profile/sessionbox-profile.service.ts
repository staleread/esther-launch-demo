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

interface ApiCookie {
  name: string;
  value: string;
  domain?: string;
  expirationDate?: number;
  hostOnly?: boolean;
  httpOnly?: boolean;
  path?: string;
  sameSite?: 'unspecified' | 'no_restriction' | 'lax' | 'strict';
  secure?: boolean;
  session?: boolean;
}

interface ActionTokenCreateDto {
  action: 'temp' | 'cloud' | 'local' | 'open';
  url: string;
  profileId?: string;
  cookies: ApiCookie[];
}

interface ActionTokenDto {
  success: boolean;
  token: string;
}

export class SessionBoxProfileService implements ProfileService {
  private readonly localClient: AxiosInstance;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    const localApiOptions = configService.get<AxiosRequestConfig>(
      'multilogin.localApi',
    );

    if (!localApiOptions) {
      throw new Error('API options not set');
    }
    this.localClient = axios.create({ ...localApiOptions });
  }

  public launchProfile(
    dto: ProfileLaunchDto,
  ): ResultAsync<ProfileLaunchResultDto, HttpError> {
    const profileId = dto.profileId;

    const actionTokenCreateDto: ActionTokenCreateDto = {
      action: 'open',
      url: dto.startUrl,
      profileId: dto.profileId,
      cookies: dto.cookies.map(this.toApiCookie),
    };

    return this.createActionToken(actionTokenCreateDto).map(
      (tokenDto: ActionTokenDto) => ({
        url: `https://open.sessionbox.dev/?sbo_token=${tokenDto.token}`,
      }),
    );
  }

  public stopProfile(dto: ProfileStopDto): ResultAsync<null, HttpError> {
    throw new Error('Not implemented');
  }

  private createActionToken(
    dto: ActionTokenCreateDto,
  ): ResultAsync<ActionTokenDto, HttpError> {
    return ResultAsync.fromPromise(
      this.localClient.post('/v1/action-token', dto),
      toHttpError,
    );
  }

  private toApiCookie(rawCookie: Cookie): ApiCookie {
    return {
      name: rawCookie.name,
      value: rawCookie.value,
      domain: rawCookie.domain,
      expirationDate: rawCookie.expirationDate,
      hostOnly: rawCookie.hostOnly,
      httpOnly: rawCookie.httpOnly,
      path: rawCookie.path,
      sameSite: rawCookie.sameSite,
      secure: rawCookie.secure,
      session: rawCookie.session,
    };
  }
}
