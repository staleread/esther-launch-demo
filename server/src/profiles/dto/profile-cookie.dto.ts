import { z } from 'zod';

const CookiePartitionKeyDto = z.object({
  hasCrossSiteAncestor: z.boolean().optional(),
  topLevelSite: z.string().optional(),
});

const SameSiteStatusDto = z.enum([
  'no_restriction',
  'lax',
  'strict',
  'unspecified',
]);

export const ProfileCookieDto = z.object({
  domain: z.string(),
  expirationDate: z.number().optional(),
  hostOnly: z.boolean(),
  httpOnly: z.boolean(),
  name: z.string(),
  partitionKey: CookiePartitionKeyDto.nullish(),
  path: z.string(),
  sameSite: SameSiteStatusDto,
  secure: z.boolean(),
  session: z.boolean(),
  storeId: z.string().nullable(),
  value: z.string(),
});

export type ProfileCookieDto = z.infer<typeof ProfileCookieDto>;
