import Modal from '@/components/ui/Modal';

interface ProfileLaunchingProps {
  isOpen: boolean;
  onClose: () => void;
  // `null` when in progress, '' when success, error otherwise
  result: string | null;
}

export default function ProfileLaunchFormModal({
  isOpen,
  result,
  onClose,
}: ProfileLaunchingProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold">Launching Profile</h1>
        {result === null && (
          <div className="size-10 border-4 border-x-slate-500 rounded-full mx-auto p-2 animate-spin" />
        )}
        {result === '' && (
          <div className="bg-green-400 text-green-700 px-3 py-1 rounded-md border-2 border-green-500">
            Done
          </div>
        )}
        {!!result?.length && (
          <div className="bg-red-400 text-red-700 px-3 py-1 rounded-md border-2 border-red-500">
            Error: {result}
          </div>
        )}
        {result !== null && (
          <button
            type="button"
            className="bg-slate-400 hover:bg-slate-300 px-3 py-1 rounded-md w-full text-white"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </Modal>
  );
}