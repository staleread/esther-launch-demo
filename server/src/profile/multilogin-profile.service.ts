import type { HttpError } from '@/common/errors/http-error.interface';
import type { ResultAsync } from 'neverthrow';
import type { ProfileService } from './domain.types';
import type {
  ProfileLaunchDto,
  ProfileLaunchResultDto,
  ProfileStopDto,
} from './dto.types';

export class MultiloginProfileService implements ProfileService {
  launchProfile(
    dto: ProfileLaunchDto,
  ): ResultAsync<ProfileLaunchResultDto, HttpError> {
    throw new Error('Not implemented');
  }

  stopProfile(dto: ProfileStopDto): ResultAsync<null, HttpError> {
    throw new Error('Not implemented');
  }
}
