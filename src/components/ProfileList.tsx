import type { Profile } from '@/types/model.types';
import ProfileListItem from './ProfileListItem';

interface ProfileListProps {
  profiles: Profile[];
  onProfileLaunch: (profileId: string) => void;
}

export default function ProfileList(props: ProfileListProps) {
  const { profiles, onProfileLaunch } = props;

  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <ul className="flex flex-col gap-3">
        {profiles.map((p) => (
          <ProfileListItem
            key={p.id}
            profile={p}
            onLaunch={() => onProfileLaunch(p.id)}
          />
        ))}
      </ul>
    </div>
  );
}
