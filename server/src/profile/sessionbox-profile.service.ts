import type { HttpError } from '@/common/errors/http-error.interface';
import { toHttpError } from '@/common/utils/axios-helpers';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type AxiosInstance,
  type AxiosRequestConfig,
  default as axios,
} from 'axios';
import { ResultAsync } from 'neverthrow';
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
      'sessionBox.localApi',
    );

    if (!localApiOptions) {
      throw new Error('API options not set');
    }
    this.localClient = axios.create({ ...localApiOptions });
  }

  public launchProfile(
    dto: ProfileLaunchDto,
  ): ResultAsync<ProfileLaunchResultDto, HttpError> {
    const actionTokenCreateDto: ActionTokenCreateDto = {
      action: 'cloud',
      url: dto.startUrl,
      cookies: dto.cookies.map((c: Cookie) => this.toApiCookie(c)),
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
      this.localClient
        .post<ActionTokenDto>('/v1/action-token', dto)
        .then((res) => res.data),
      toHttpError,
    );
  }

  private toApiCookie(rawCookie: Cookie): ApiCookie {
    const domain = rawCookie.domain;
    const domainWithoutDot = domain.startsWith('.') ? domain.slice(1) : domain;

    return {
      name: rawCookie.name,
      domain: domainWithoutDot,
      value: rawCookie.value,
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
