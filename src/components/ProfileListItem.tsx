import type { Profile, ProfileType } from '@/types/model.types.ts';

interface ProfileListItemProps {
  profile: Profile;
  onLaunch: () => void;
  onDelete: () => void;
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
      <div className="flex flex-row gap-2 justify-end items-center">
        <button
          type="button"
          className="bg-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-300 text-yellow-950"
          onClick={onLaunch}
        >
          Launch
        </button>
        <button
          type="button"
          className="bg-slate-300 hover:bg-red-400 px-3 py-1 rounded-md text-slate-900 ease-linear duration-100"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
