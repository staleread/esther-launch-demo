import type { Profile } from '@/types/model.types';
import ProfileListItem from './ProfileListItem';

interface ProfileListProps {
  profiles: Profile[];
  onProfileLaunch: (profileId: string) => void;
  onProfileDelete: (profileId: string) => void;
}

export default function ProfileList({
  profiles,
  onProfileLaunch,
  onProfileDelete,
}: ProfileListProps) {
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      {profiles.length ? (
        <ul className="flex flex-col gap-3">
          {profiles.map((p) => (
            <ProfileListItem
              key={p.id}
              profile={p}
              onLaunch={() => onProfileLaunch(p.id)}
              onDelete={() => onProfileDelete(p.id)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">No profiles yet</p>
      )}
    </div>
  );
}
