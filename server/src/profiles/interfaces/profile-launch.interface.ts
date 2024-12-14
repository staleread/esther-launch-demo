import type { ProfileCookie } from './profile-cookie.interface';

export interface ProfileLaunch {
  profileId: string;
  startUrl: string;
  cookies: ProfileCookie[];
}
