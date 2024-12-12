import useFormValidation from '@/hooks/useFormValidation';
import {
  type ProfileAddDto,
  ProfileAddSchema,
  type ProfileTypeDto,
} from '@/schemas/ui.schemas';
import type { FormEvent } from 'react';
import Modal from './ui/Modal';

interface ProfileAddFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidSubmit: (p: ProfileAddDto) => void;
}

export default function ProfileAddFormModal({
  isOpen,
  onClose,
  onValidSubmit,
}: ProfileAddFormModalProps) {
  const { formData, setFormData, formErrors, validateForm } =
    useFormValidation<ProfileAddDto>(ProfileAddSchema, {
      id: '',
      name: '',
      type: 'gologin',
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }
    onValidSubmit(formData);
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
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
            <small className="text-red-400">{formErrors.id}</small>
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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <small className="text-red-400">{formErrors.name}</small>
          </div>
          <div className="flex flex-col gap-1 justify-between">
            <label htmlFor="profile-type" className="text-slate-500 text-xs">
              Profile Type
            </label>
            <select
              id="profile-type"
              className="border-2 rounded border-slate-300 focus:border-slate-600 p-2 text-sm"
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as ProfileTypeDto,
                })
              }
            >
              <option value="gologin">GoLogin</option>
              <option value="multilogin">Multilogin</option>
              <option value="sessionBox">SessionBox One</option>
            </select>
            <small className="text-red-400">{formErrors.type}</small>
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
