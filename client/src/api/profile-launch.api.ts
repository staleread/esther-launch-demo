import {
  type ProfileLaunchResponseDto,
  ProfileLaunchResponseSchema,
} from '@/schemas/api.schemas';
import type { ProfileLaunchDto } from '@/schemas/ui.schemas';
import { getProfile } from '@/storage/profile.storage';
import type {
  ProfileLaunchApiDto,
  ProfileLaunchResult,
} from '@/types/api.types';
import config from '@/utils/config';
import { ZodError } from 'zod';

export async function launchProfile(
  dto: ProfileLaunchDto,
): Promise<ProfileLaunchResult> {
  try {
    const apiDto = toLaunchApiDto(dto);
    const response = await fetchProfileLaunch(apiDto);
    return resolveProfileLaunchResponse(response);
  } catch (err: unknown) {
    if (err instanceof SyntaxError) {
      throw err;
    }
    if (err instanceof ZodError) {
      return 'Failed to parse response';
    }
    return 'Failed to ping the server';
  }
}

function toLaunchApiDto(uiDto: ProfileLaunchDto): ProfileLaunchApiDto {
  const profile = getProfile(uiDto.profileId);
  const cookies = JSON.parse(uiDto.cookies);

  return {
    profileId: uiDto.profileId,
    profileType: profile.type,
    startUrl: uiDto.startUrl,
    cookies,
  };
}

async function fetchProfileLaunch(
  dto: ProfileLaunchApiDto,
): Promise<ProfileLaunchResponseDto> {
  const url = `${config.launcherBaseUrl}/launch`;
  const body = JSON.stringify(dto);

  const response = await fetch(url, { method: 'POST', body });
  const json = await response.json();

  return ProfileLaunchResponseSchema.parse(json);
}

function resolveProfileLaunchResponse(
  response: ProfileLaunchResponseDto,
): ProfileLaunchResult {
  switch (response.type) {
    case 'error':
      return response.error;
    case 'empty':
      return '';
    case 'url':
      window.open(response.url, '_blank')?.focus();
      return '';
  }
}
