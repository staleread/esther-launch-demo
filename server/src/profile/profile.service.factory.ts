import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ProfileService } from './domain.types';
import type { ProviderType } from './dto.types';
import { MultiloginProfileService } from './multilogin-profile.service';

const profileServices: Record<
  ProviderType,
  new (
    cs: ConfigService,
  ) => ProfileService
> = {
  multilogin: MultiloginProfileService,
};

@Injectable()
export class ProfileServiceFactory {
  private readonly serviceMap: Map<ProviderType, ProfileService> = new Map();

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  public getProfileService(type: ProviderType): ProfileService {
    const maybeService = this.serviceMap.get(type);

    if (maybeService) {
      return maybeService;
    }
    return this.createProfileService(type);
  }

  private createProfileService(type: ProviderType): ProfileService {
    const service = new profileServices[type](this.configService);
    this.serviceMap.set(type, service);

    return service;
  }
}
