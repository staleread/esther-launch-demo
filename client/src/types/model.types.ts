import type { ProfileTypeDto } from '@/schemas/ui.schemas';

export type ProfileType = ProfileTypeDto;

export interface Profile {
  id: string;
  name: string;
  type: ProfileType;
}
