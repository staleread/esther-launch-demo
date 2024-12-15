import { z, type TypeOf } from 'zod';
import { config } from '@/common/config/config';
import { getProfile } from './profile.storage';
import type { ProfileLaunchDto } from './types/form.types';
import type { CookieSchema } from './schemas/api.schemas';

interface ProfileLaunchApiDto {
  profileId: string;
  startUrl: string;
  cookies: Array<TypeOf<typeof CookieSchema>>;
}

const ErrorResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

const ProfileLaunchResponseDtoSchema = z.union([
  ErrorResponseSchema,
  z.object({
    url: z.string().url().optional(),
  }),
]);

export async function launchProfile(formDto: ProfileLaunchDto): Promise<string> {
  const dto: ProfileLaunchApiDto = {
    ...formDto,
    cookies: JSON.parse(formDto.cookies)
  };

  try {
    const url = getLaunchUrl(dto.profileId);
    const body = JSON.stringify(dto);

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      body,
    });

    const json = await response.json();
  
    return resolveLaunchResponse(json);
  } catch (err: unknown) {
    if (err instanceof SyntaxError) {
      throw err;
    }
    return 'Failed to ping the server';
  }
}

function getLaunchUrl(profileId: string): string {
  const profileType = getProfile(profileId).type;
  return `${config.launcherBaseUrl}/launch?profile-type=${profileType}`;
}
  
function resolveLaunchResponse(json: unknown): string {
  const parseResult = ProfileLaunchResponseDtoSchema.safeParse(json);

  if (!parseResult.success) {
    return 'Failed to parse response';
  }
  const dto = parseResult.data;

  if ("statusCode" in dto) {
    return dto.message;
  }
  if (dto.url) {
    window.open(dto.url, '_blank')?.focus();
  }
  return '';
}
