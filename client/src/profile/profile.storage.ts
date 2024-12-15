import { config } from '@/common/config/config';
import type { Profile } from './types/domain.types';

export function getProfiles(): Profile[] {
  const rawProfiles = localStorage.getItem(config.profilesStorageId);
  return rawProfiles ? JSON.parse(rawProfiles) : [];
}

export function getProfile(profileId: string): Profile {
  const profile = getProfiles().find((p) => p.id === profileId);

  if (!profile) {
    throw new Error('Profile not found');
  }
  return profile;
}

export function addProfile(profile: Profile): void {
  const updatedProfiles = [...getProfiles(), profile];
  saveProfiles(updatedProfiles);
}

export function deleteProfile(profileId: string): void {
  const updatedProfiles = getProfiles().filter(
    (p: Profile) => p.id !== profileId,
  );
  saveProfiles(updatedProfiles);
}

function saveProfiles(profiles: Profile[]) {
  localStorage.setItem(config.profilesStorageId, JSON.stringify(profiles));
}
