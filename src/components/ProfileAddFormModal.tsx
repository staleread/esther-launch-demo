import type { Profile, ProfileType } from '@/types/model.types';
import { type FormEvent, useState } from 'react';
import Modal from './ui/Modal';

interface ProfileAddFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidSubmit: (p: Profile) => void;
}

export default function ProfileAddFormModal({
  isOpen,
  onClose,
  onValidSubmit,
}: ProfileAddFormModalProps) {
  const [idInput, setIdInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [typeValue, setTypeValue] = useState<ProfileType>('gologin');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const profile: Profile = {
      id: idInput,
      name: nameInput,
      type: typeValue,
    };
    onValidSubmit(profile);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold">Add Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 justify-between">
            <label htmlFor="profile-id" className="text-slate-500 text-xs">
              Profile ID
            </label>
            <input
              id="profile-id"
              type="text"
              className="border-2 rounded border-slate-300 focus:border-slate-600 p-2 text-sm"
              placeholder="Enter ID"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 justify-between">
            <label htmlFor="profile-name" className="text-slate-500 text-xs">
              Profile Name
            </label>
            <input
              id="profile-name"
              type="text"
              className="border-2 rounded border-slate-300 focus:border-slate-600 p-2 text-sm"
              placeholder="Enter profile name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 justify-between">
            <label htmlFor="profile-type" className="text-slate-500 text-xs">
              Profile Type
            </label>
            <select
              id="profile-type"
              className="border-2 rounded border-slate-300 focus:border-slate-600 p-2 text-sm"
              value={typeValue}
              onChange={(e) => setTypeValue(e.target.value as ProfileType)}
            >
              <option value="gologin">GoLogin</option>
              <option value="multilogin">Multilogin</option>
              <option value="sessionBox">SessionBox One</option>
            </select>
          </div>
          <div className="flex flex-row gap-2 justify-between">
            <button
              type="button"
              className="bg-slate-400 hover:bg-slate-300 px-3 py-1 rounded-md flex-1 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-300 px-3 py-1 rounded-md flex-1 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
