import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileServiceFactory } from './profile.service.factory';

@Module({
  controllers: [ProfileController],
  providers: [ProfileServiceFactory],
})
export class ProfileModule {}
