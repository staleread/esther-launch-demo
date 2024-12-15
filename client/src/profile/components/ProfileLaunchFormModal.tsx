import { Modal } from '@/common/components/Modal';
import { useSchemaForm } from '@/common/hooks/useSchemaForm';
import type { FormEvent } from 'react';
import { ProfileLaunchDtoSchema } from '../schemas/form.schemas';
import type { ProfileLaunchDto } from '../types/form.types';

interface ProfileLaunchFormModalProps {
  profileId: string;
  isOpen: boolean;
  onClose: () => void;
  onValidSubmit: (dto: ProfileLaunchDto) => void;
}

const COOKIES_EXAMPLE = `[
  {
    "name": "my_cookie",
    "value": "Some value",
    "domain": "mydomain.com",
    "hostOnly": true,
    "path": "/view/",
    "secure": false,
    "httpOnly": false,
    "sameSite": "lax",
    "session": false,
    "firstPartyDomain": "",
    "partitionKey": null,
    "expirationDate": 1768579558,
    "storeId": null
  }
]`;

export function ProfileLaunchFormModal({
  profileId,
  isOpen,
  onClose,
  onValidSubmit,
}: ProfileLaunchFormModalProps) {
  const { formData, setFormData, formErrors, validateForm } =
    useSchemaForm<ProfileLaunchDto>(ProfileLaunchDtoSchema, {
      profileId,
      startUrl: '',
      cookies: '',
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
        <h1 className="text-lg font-bold">Launch Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 justify-between">
            <label htmlFor="start-url" className="text-slate-500 text-xs">
              Start URL
            </label>
            <input
              id="start-url"
              type="text"
              className="border-2 rounded border-slate-300 focus:border-slate-600 p-2 text-sm"
              placeholder="https://example.com"
              value={formData.startUrl}
              onChange={(e) =>
                setFormData({ ...formData, startUrl: e.target.value })
              }
            />
            <small className="text-red-400">{formErrors.startUrl}</small>
          </div>
          <div className="flex flex-col gap-1 justify-between">
            <label htmlFor="cookies" className="text-slate-500 text-xs">
              Cookies (JSON Array)
            </label>
            <textarea
              id="cookies"
              rows={17}
              cols={30}
              className="border-2 rounded border-slate-300 focus:border-slate-600 p-2 text-sm"
              placeholder={COOKIES_EXAMPLE}
              value={formData.cookies}
              onChange={(e) =>
                setFormData({ ...formData, cookies: e.target.value })
              }
            />
            <small className="text-red-400">{formErrors.cookies}</small>
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
              className="bg-yellow-400 hover:bg-yellow-300 px-3 py-1 rounded-md flex-1 text-yellow-900"
            >
              Launch
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
