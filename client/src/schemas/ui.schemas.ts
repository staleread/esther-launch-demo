import { z } from 'zod';

export const ProfileTypeSchema = z.enum([
  'gologin',
  'multilogin',
  'sessionBox',
]);

export type ProfileTypeDto = z.infer<typeof ProfileTypeSchema>;

export const ProfileAddSchema = z.object({
  id: z.string().min(3),
  name: z.string().min(3),
  type: ProfileTypeSchema,
});

export type ProfileAddDto = z.infer<typeof ProfileAddSchema>;

const CookiePartitionKeySchema = z.object({
  hasCrossSiteAncestor: z.boolean().optional(),
  topLevelSite: z.string().optional(),
});

const SameSiteStatusSchema = z.enum([
  'no_restriction',
  'lax',
  'strict',
  'unspecified',
]);

const CookieSchema = z.object({
  domain: z.string(),
  expirationDate: z.number().optional(),
  hostOnly: z.boolean(),
  httpOnly: z.boolean(),
  name: z.string(),
  partitionKey: CookiePartitionKeySchema.nullish(),
  path: z.string(),
  sameSite: SameSiteStatusSchema,
  secure: z.boolean(),
  session: z.boolean(),
  storeId: z.string().nullable(),
  value: z.string(),
});

export type CookieDto = z.infer<typeof CookieSchema>;

export const ProfileLaunchSchema = z.object({
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

export type ProfileLaunchDto = z.infer<typeof ProfileLaunchSchema>;