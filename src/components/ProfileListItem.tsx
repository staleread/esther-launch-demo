import type { Profile, ProfileType } from '@/types/model.types.ts';

interface ProfileListItemProps {
  profile: Profile;
  onLaunch: () => void;
}

const typeBadgeBackgrounds: Record<ProfileType, string> = {
  gologin: 'bg-teal-300',
  multilogin: 'bg-sky-300',
  sessionBox: 'bg-green-300',
};

const typeBadgeNames: Record<ProfileType, string> = {
  gologin: 'GoLogin',
  multilogin: 'Multilogin',
  sessionBox: 'SessionBox One',
};

export default function ProfileListItem(props: ProfileListItemProps) {
  const { profile, onLaunch } = props;

  return (
    <li className="flex flex-row gap-6 justify-between items-center">
      <div className="flex flex-row gap-6 justify-start items-center">
        <p className="">{profile.name}</p>
        <div
          className={`${typeBadgeBackgrounds[profile.type]} px-3 py-1 rounded-full`}
        >
          <p className="text-xs">{typeBadgeNames[profile.type]}</p>
        </div>
      </div>
      <button
        type="button"
        className="bg-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-300 text-yellow-950"
        onClick={onLaunch}
      >
        Launch
      </button>
    </li>
  );
}
