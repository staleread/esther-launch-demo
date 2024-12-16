import { z } from 'zod';

// TODO: Add gologin and sessionBox
export const ProviderTypeSchema = z.enum(['multilogin']);

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

export const CookieSchema = z.object({
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

export const ProfileLaunchDtoSchema = z.object({
  profileId: z.string(),
  startUrl: z.string().url(),
  cookies: z.array(CookieSchema),
});

export const ProfileStopDtoSchema = z.object({
  profileId: z.string(),
});
