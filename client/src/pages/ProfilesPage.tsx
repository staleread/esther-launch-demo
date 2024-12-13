import { launchProfile } from '@/api/profile-launch.api';
import ProfileAddFormModal from '@/components/ProfileAddFormModal';
import ProfileLaunchFormModal from '@/components/ProfileLaunchFormModal';
import ProfileLaunchingModal from '@/components/ProfileLaunchingModal';
import ProfileList from '@/components/ProfileList';
import type { ProfileAddDto, ProfileLaunchDto } from '@/schemas/ui.schemas';
import {
  addProfile,
  deleteProfile,
  getProfiles,
} from '@/storage/profile.storage';
import type { ProfileLaunchResult } from '@/types/api.types';
import type { Profile } from '@/types/model.types';
import { useEffect, useState } from 'react';

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isProfileAddModalOpen, setIsProfileAddModalOpen] = useState(false);
  const [profileToLaunchId, setProfileToLaunchId] = useState<string>('');
  const [launchDto, setLaunchDto] = useState<ProfileLaunchDto | null>(null);
  const [launchResult, setLaunchResult] = useState<ProfileLaunchResult | null>(
    null,
  );
  const [isProfileLaunchModalOpen, setIsProfileLaunchModalOpen] =
    useState(false);
  const [isProfileLaunchingModalOpen, setIsProfileLaunchingModalOpen] =
    useState(false);

  useEffect(() => {
    setProfiles([...getProfiles()]);
  }, []);

  useEffect(() => {
    if (!launchDto) {
      return;
    }
    setIsProfileLaunchModalOpen(false);
    setIsProfileLaunchingModalOpen(true);

    setLaunchResult(null);
    launchProfile(launchDto).then((result: string) => {
      setLaunchResult(result);
    });
    setLaunchDto(null);
  });

  const handleProfileAdd = (dto: ProfileAddDto) => {
    addProfile(dto);
    setIsProfileAddModalOpen(false);
    setProfiles([...getProfiles()]);
  };

  const handleProfileDelete = (id: string) => {
    deleteProfile(id);
    setProfiles([...getProfiles()]);
  };

  const handleProfileLaunchRequest = (id: string) => {
    setProfileToLaunchId(id);
    setIsProfileLaunchModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 container mx-auto py-6 px-4 lg:px-0 max-w-4xl">
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
        onProfileLaunch={handleProfileLaunchRequest}
        onProfileDelete={handleProfileDelete}
      />
      <ProfileAddFormModal
        key={+isProfileAddModalOpen}
        isOpen={isProfileAddModalOpen}
        onClose={() => setIsProfileAddModalOpen(false)}
        onValidSubmit={handleProfileAdd}
      />
      <ProfileLaunchFormModal
        key={+isProfileLaunchModalOpen + 2}
        profileId={profileToLaunchId}
        isOpen={isProfileLaunchModalOpen}
        onClose={() => setIsProfileLaunchModalOpen(false)}
        onValidSubmit={setLaunchDto}
      />
      <ProfileLaunchingModal
        key={+isProfileLaunchingModalOpen + 4}
        isOpen={isProfileLaunchingModalOpen}
        onClose={() => setIsProfileLaunchingModalOpen(false)}
        result={launchResult}
      />
    </div>
  );
}
