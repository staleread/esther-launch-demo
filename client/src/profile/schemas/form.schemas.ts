import { ProfileTypeSchema, CookieSchema } from './api.schemas';
import { z } from 'zod';

export const ProfileAddDtoSchema = z.object({
  id: z.string().min(3),
  name: z.string().min(3),
  type: ProfileTypeSchema,
});

export const ProfileLaunchDtoSchema = z.object({
  profileId: z.string(),
  startUrl: z.string().url(),
  cookies: z.string().refine(
    (json: string) => {
      try {
        const schema = z.array(CookieSchema);
        const result = schema.safeParse(JSON.parse(json));

        return result.success;
      } catch (err: unknown) {
        return false;
      }
    },
    {
      message: "Invalid cookies' format",
    },
  ),
});
