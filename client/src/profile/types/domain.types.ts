import type { TypeOf } from 'zod';
import type { ProfileTypeSchema } from '../schemas/api.schemas';

export type ProfileType = TypeOf<typeof ProfileTypeSchema>;

export interface Profile {
  id: string;
  name: string;
  type: ProfileType;
}
