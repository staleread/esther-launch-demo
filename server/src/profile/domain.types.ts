import type { HttpError } from '@/common/errors/http-error.interface';
import type { ResultAsync } from 'neverthrow';
import type {
  ProfileLaunchDto,
  ProfileLaunchResultDto,
  ProfileStopDto,
} from './dto.types';

export interface ProfileService {
  launchProfile(
    dto: ProfileLaunchDto,
  ): ResultAsync<ProfileLaunchResultDto, HttpError>;

  stopProfile(dto: ProfileStopDto): ResultAsync<null, HttpError>;
}
