import { z } from 'zod';
import { ProfileCookieDto } from './profile-cookie.dto';
import { ProfileTypeDto } from './profile-type.dto';

export const ProfileLaunchDto = z.object({
  profileId: z.string(),
  profileType: ProfileTypeDto,
  startUrl: z.string().url(),
  cookies: z.array(ProfileCookieDto),
});

export type ProfileLaunchDto = z.infer<typeof ProfileLaunchDto>;
