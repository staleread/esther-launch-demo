import type { ProfileLaunchDto, ProfileTypeDto } from '@/schemas/ui.schemas';

type ApiError = string;
type ApiSuccess = '';

export type ProfileLaunchResult = ApiError | ApiSuccess;

export type ProfileLaunchApiDto = ProfileLaunchDto & {
  profileType: ProfileTypeDto;
};
