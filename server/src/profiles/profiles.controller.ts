import { ValidationPipe } from '@/common/pipes/validation.pipe';
import { Body, Controller, Delete, HttpException, Post } from '@nestjs/common';
import type { ProfileLaunchResultDto } from './dto/profile-launch-result.dto';
import { ProfileLaunchDto } from './dto/profile-launch.dto';
import { ProfileStopDto } from './dto/profile-stop.dto';
import type { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('/launch')
  public async launchProfile(
    @Body(new ValidationPipe(ProfileLaunchDto)) dto: ProfileLaunchDto,
  ): Promise<ProfileLaunchResultDto> {
    const result = await this.profilesService.launchProfile(dto);

    if (result.isOk()) {
      return result.value;
    }

    const error = result.error;
    throw new HttpException(error.message, error.status);
  }

  @Delete('/stop')
  public async stopProfile(
    @Body(new ValidationPipe(ProfileStopDto)) dto: ProfileStopDto,
  ): Promise<void> {
    const result = await this.profilesService.stopProfile(dto);

    if (result.isOk()) {
      return;
    }

    const error = result.error;
    throw new HttpException(error.message, error.status);
  }
}
