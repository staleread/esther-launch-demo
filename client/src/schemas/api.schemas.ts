import { z } from 'zod';

export const ProfileLaunchResponseSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('error'),
    error: z.string(),
  }),
  z.object({
    type: z.literal('url'),
    url: z.string().url(),
  }),
  z.object({
    type: z.literal('empty'),
  }),
]);

export type ProfileLaunchResponseDto = z.infer<
  typeof ProfileLaunchResponseSchema
>;
