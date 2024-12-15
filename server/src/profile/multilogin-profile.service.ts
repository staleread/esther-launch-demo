import type { HttpError } from '@/common/errors/http-error.interface';
import { toHttpError } from '@/common/utils/axios-helpers';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosResponse,
  default as axios,
} from 'axios';
import type { ResultAsync } from 'neverthrow';
import type { ProfileService } from './domain.types';
import type {
  ProfileLaunchDto,
  ProfileLaunchResultDto,
  ProfileStopDto,
} from './dto.types';

export class MultiloginProfileService implements ProfileService {
  private readonly httpClient: AxiosInstance;

  constructor(@Inject(ConfigService) configService: ConfigService) {
    const apiOptions = configService.get<AxiosRequestConfig>('multilogin');

    if (!apiOptions) {
      throw new Error('API options not set');
    }

    this.httpClient = axios.create({ ...apiOptions });
  }

  launchProfile(
    dto: ProfileLaunchDto,
  ): ResultAsync<ProfileLaunchResultDto, HttpError> {
    throw new Error('Not implemented');
  }

  stopProfile(dto: ProfileStopDto): ResultAsync<null, HttpError> {
    throw new Error('Not implemented');
  }
}
