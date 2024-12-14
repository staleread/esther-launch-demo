import type { HttpError } from '@/common/errors/http-error.interface';
import type { ResultAsync } from 'neverthrow';
import type { ProfileLaunchResult } from './profile-launch-result.interface';
import type { ProfileLaunch } from './profile-launch.interface';
import type { ProfileStop } from './profile-stop.interface';

export interface ProfilesStrategy {
  launchProfile(
    dto: ProfileLaunch,
  ): ResultAsync<ProfileLaunchResult, HttpError>;

  stopProfile(dto: ProfileStop): ResultAsync<null, HttpError>;
}
