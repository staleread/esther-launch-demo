import type { TypeOf } from 'zod';
import type {
  ProfileLaunchDtoSchema,
  ProfileStopDtoSchema,
  ProviderTypeSchema,
} from './dto.schemas';

export type ProviderType = TypeOf<typeof ProviderTypeSchema>;
export type ProfileLaunchDto = TypeOf<typeof ProfileLaunchDtoSchema>;
export type ProfileStopDto = TypeOf<typeof ProfileStopDtoSchema>;

export interface ProfileLaunchResultDto {
  url?: string;
}
