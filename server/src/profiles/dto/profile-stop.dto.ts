import { z } from 'zod';
import { ProfileTypeDto } from './profile-type.dto';

export const ProfileStopDto = z.object({
  profileId: z.string(),
  profileType: ProfileTypeDto,
});

export type ProfileStopDto = z.infer<typeof ProfileStopDto>;
