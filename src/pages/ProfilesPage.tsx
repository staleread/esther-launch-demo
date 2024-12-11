import ProfileList from '@/components/ProfileList';
import { getProfiles } from '@/storage/profile.storage';
import type { Profile } from '@/types/model.types';
import { useEffect, useState } from 'react';

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    setProfiles([...getProfiles()]);
  }, []);

  return (
    <div className="flex flex-col gap-4 container mx-auto py-6 max-w-4xl">
      <div className="flex flex-row justify-between gap-4">
        <h1 className="text-xl font-bold">Profiles</h1>
        <div className="flex flex-row justify-between gap-4">
          <button
            type="button"
            className="bg-green-400 rounded-md px-3 py-1 hover:bg-green-300"
            onClick={() => console.log('Adding new profile')}
          >
            Add Profile
          </button>
        </div>
      </div>
      <ProfileList
        profiles={profiles}
        onProfileLaunch={(id) => console.log(`Launching profile ${id}`)}
      />
    </div>
  );
}
