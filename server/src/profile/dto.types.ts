import type { TypeOf } from 'zod';
import type {
  CookieSchema,
  ProfileLaunchDtoSchema,
  ProfileStopDtoSchema,
  ProviderTypeSchema,
} from './dto.schemas';

export type Cookie = TypeOf<typeof CookieSchema>;
export type ProviderType = TypeOf<typeof ProviderTypeSchema>;
export type ProfileLaunchDto = TypeOf<typeof ProfileLaunchDtoSchema>;
export type ProfileStopDto = TypeOf<typeof ProfileStopDtoSchema>;

export interface ProfileLaunchResultDto {
  url?: string;
}
