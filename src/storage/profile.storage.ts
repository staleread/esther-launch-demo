import type { Profile } from '@/types/model.types';
import config from '@/utils/config';

export function getProfiles(): Profile[] {
  const rawProfiles = localStorage.getItem(config.profilesStorageId);
  return rawProfiles ? JSON.parse(rawProfiles) : [];
}

export function addProfile(profile: Profile): void {
  const profiles = [...getProfiles(), profile];
  localStorage.setItem(config.profilesStorageId, JSON.stringify(profiles));
}
