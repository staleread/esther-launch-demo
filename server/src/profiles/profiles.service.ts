import type { HttpError } from '@/common/errors/http-error.interface';
import { Injectable } from '@nestjs/common';
import type { ResultAsync } from 'neverthrow';
import type { ProfileLaunchResultDto } from './dto/profile-launch-result.dto';
import type { ProfileLaunchDto } from './dto/profile-launch.dto';
import type { ProfileStopDto } from './dto/profile-stop.dto';
import type { ProfileTypeDto } from './dto/profile-type.dto';
import type { ProfilesStrategy } from './interfaces/profiles-strategy.interface';

@Injectable()
export class ProfilesService {
  public launchProfile(
    dto: ProfileLaunchDto,
  ): ResultAsync<ProfileLaunchResultDto, HttpError> {
    throw Error('Not implemented');
  }

  public stopProfile(dto: ProfileStopDto): ResultAsync<null, HttpError> {
    throw Error('Not implemented');
  }

  private getProfilesStrategy(profileType: ProfileTypeDto): ProfilesStrategy {
    switch (profileType) {
      case 'gologin':
        throw Error('Not implemented strategy');
      case 'multilogin':
        throw Error('Not implemented strategy');
      case 'sessionBox':
        throw Error('Not implemented strategy');
    }
  }
}
