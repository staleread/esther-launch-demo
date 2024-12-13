import type { Profile } from '@/types/model.types';
import config from '@/utils/config';

export function getProfiles(): Profile[] {
  const rawProfiles = localStorage.getItem(config.profilesStorageId);
  return rawProfiles ? JSON.parse(rawProfiles) : [];
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
