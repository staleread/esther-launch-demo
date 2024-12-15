import type { Profile, ProfileType } from '../types/domain.types';

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

export function ProfileListItem({
  profile,
  onLaunch,
  onDelete,
}: ProfileListItemProps) {
  return (
    <li className="flex flex-col sm:flex-row gap-6 justify-between sm:items-center border-b-2 border-slate-200 pb-2">
      <div className="flex flex-row gap-6 justify-start items-center">
        <p>{profile.name}</p>
        <div
          className={`${typeBadgeBackgrounds[profile.type]} px-3 py-1 rounded-full`}
        >
          <p className="text-xs">{typeBadgeNames[profile.type]}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-between sm:justify-end items-center">
        <button
          type="button"
          className="bg-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-300 text-yellow-950 grow sm:flex-none"
          onClick={onLaunch}
        >
          Launch
        </button>
        <button
          type="button"
          className="bg-slate-300 hover:bg-red-400 px-3 py-1 rounded-md text-slate-900 ease-linear duration-100 grow sm:flex-none"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
