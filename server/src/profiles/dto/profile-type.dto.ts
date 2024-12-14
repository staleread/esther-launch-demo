import { z } from 'zod';

export const ProfileTypeDto = z.enum(['gologin', 'multilogin', 'sessionBox']);

export type ProfileTypeDto = z.infer<typeof ProfileTypeDto>;
