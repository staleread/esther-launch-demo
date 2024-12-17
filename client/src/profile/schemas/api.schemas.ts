import { z } from 'zod';

export const ProfileTypeSchema = z.enum([
  'gologin',
  'multilogin',
  'sessionBox',
]);

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
  sameSite: SameSiteStatusSchema.nullable(),
  secure: z.boolean(),
  session: z.boolean(),
  storeId: z.string().nullable(),
  value: z.string(),
});
