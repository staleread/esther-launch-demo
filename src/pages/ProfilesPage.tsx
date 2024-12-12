import ProfileAddFormModal from '@/components/ProfileAddFormModal';
import ProfileList from '@/components/ProfileList';
import { addProfile, getProfiles } from '@/storage/profile.storage';
import type { Profile } from '@/types/model.types';
import { useEffect, useState } from 'react';

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isProfileAddModalOpen, setIsProfileAddModalOpen] = useState(false);

  useEffect(() => {
    setProfiles([...getProfiles()]);
  }, []);

  const handleProfileAdd = (profile: Profile) => {
    addProfile(profile);
    setIsProfileAddModalOpen(false);
    setProfiles([...getProfiles()]);
  };

  return (
    <div className="flex flex-col gap-4 container mx-auto py-6 max-w-4xl">
      <div className="flex flex-row justify-between gap-4">
        <h1 className="text-xl font-bold">Profiles</h1>
        <div className="flex flex-row justify-between gap-4">
          <button
            type="button"
            className="bg-green-400 rounded-md px-3 py-1 hover:bg-green-300"
            onClick={() => setIsProfileAddModalOpen(true)}
          >
            Add Profile
          </button>
        </div>
      </div>
      <ProfileList
        profiles={profiles}
        onProfileLaunch={(id) => console.log(`Launching profile ${id}`)}
      />
      <ProfileAddFormModal
        key={isProfileAddModalOpen}
        isOpen={isProfileAddModalOpen}
        onClose={() => setIsProfileAddModalOpen(false)}
        onValidSubmit={handleProfileAdd}
      />
    </div>
  );
}
