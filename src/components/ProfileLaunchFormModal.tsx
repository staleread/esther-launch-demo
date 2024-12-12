import Modal from '@/components/ui/Modal';
import useFormValidation from '@/hooks/useFormValidation';
import {
  type ProfileLaunchDto,
  ProfileLaunchSchema,
} from '@/schemas/ui.schemas';
import type { FormEvent } from 'react';

interface ProfileLaunchFormModalProps {
  profileId: string;
  isOpen: boolean;
  onClose: () => void;
  onValidSubmit: (dto: ProfileLaunchDto) => void;
}

export default function ProfileLaunchFormModal({
  profileId,
  isOpen,
  onClose,
  onValidSubmit,
}: ProfileLaunchFormModalProps) {
  const { formData, setFormData, formErrors, validateForm } =
    useFormValidation<ProfileLaunchDto>(ProfileLaunchSchema, {
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
        <h1 className="text-lg font-bold">Add Profile</h1>
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
              placeholder="[
  {
    &quot;name&quot;: &quot;MSCC&quot;,
    &quot;value&quot;: &quot;NR&quot;,
    &quot;domain&quot;: &quot;.typescriptlang.org&quot;,
    &quot;hostOnly&quot;: false,
    &quot;path&quot;: &quot;/&quot;,
    &quot;secure&quot;: true,
    &quot;httpOnly&quot;: false,
    &quot;sameSite&quot;: &quot;no_restriction&quot;,
    &quot;session&quot;: false,
    &quot;firstPartyDomain&quot;: &quot;&quot;,
    &quot;partitionKey&quot;: null,
    &quot;expirationDate&quot;: 1733996236,
    &quot;storeId&quot;: null
  }
]"
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
