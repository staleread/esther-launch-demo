import { ValidationPipe } from '@/common/pipes/validation.pipe';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import type { ProfileService } from './domain.types';
import {
  ProfileLaunchDtoSchema,
  ProfileStopDtoSchema,
  ProviderTypeSchema,
} from './dto.schemas';
import type {
  ProfileLaunchDto,
  ProfileLaunchResultDto,
  ProfileStopDto,
  ProviderType,
} from './dto.types';
import { ProfileServiceFactory } from './profile.service.factory';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(ProfileServiceFactory)
    private readonly profileServiceFactory: ProfileServiceFactory,
  ) {}

  @Post('/launch')
  public async launchProfile(
    @Query('provider-type', new ValidationPipe(ProviderTypeSchema))
    providerType: ProviderType,
    @Body(new ValidationPipe(ProfileLaunchDtoSchema))
    dto: ProfileLaunchDto,
  ): Promise<ProfileLaunchResultDto> {
    const profileService =
      this.profileServiceFactory.getProfileService(providerType);

    const result = await profileService.launchProfile(dto);

    if (result.isOk()) {
      return result.value;
    }

    const error = result.error;
    throw new HttpException(error.message, error.status);
  }

  @Delete('/stop')
  public async stopProfile(
    @Query('provider-type', new ValidationPipe(ProviderTypeSchema))
    providerType: ProviderType,
    @Body(new ValidationPipe(ProfileStopDtoSchema)) dto: ProfileStopDto,
  ): Promise<void> {
    const profileService =
      this.profileServiceFactory.getProfileService(providerType);

    const result = await profileService.stopProfile(dto);

    if (result.isOk()) {
      return;
    }

    const error = result.error;
    throw new HttpException(error.message, error.status);
  }
}
