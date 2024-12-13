import type { CookieDto, ProfileTypeDto } from '@/schemas/ui.schemas';

type ApiError = string;
type ApiSuccess = '';

export type ProfileLaunchResult = ApiError | ApiSuccess;

export interface ProfileLaunchApiDto {
  profileId: string;
  profileType: ProfileTypeDto;
  startUrl: string;
  cookies: CookieDto[];
}
