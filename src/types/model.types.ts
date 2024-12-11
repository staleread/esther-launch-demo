export type ProfileType = 'gologin' | 'multilogin' | 'sessionBox';

export interface Profile {
  id: string;
  name: string;
  type: ProfileType;
}
