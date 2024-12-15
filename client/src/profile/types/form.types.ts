import type { TypeOf } from 'zod';
import type {
  ProfileAddDtoSchema,
  ProfileLaunchDtoSchema,
} from '../schemas/form.schemas';

export type ProfileAddDto = TypeOf<typeof ProfileAddDtoSchema>;
export type ProfileLaunchDto = TypeOf<typeof ProfileLaunchDtoSchema>;
