import { config } from '@/common/config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProfileController } from './profile.controller';
import { ProfileServiceFactory } from './profile.service.factory';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] })],
  controllers: [ProfileController],
  providers: [ProfileServiceFactory],
})
export class ProfileModule {}
