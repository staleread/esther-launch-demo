import { Modal } from './Modal';

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  // `null` when in progress, '' when success, error otherwise
  result: string | null;
}

export function LoadingModal({ isOpen, result, onClose }: LoadingModalProps) {
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
          <div className="bg-red-400 text-white font-bold px-3 py-1 rounded-md border-2 border-red-500 max-w-64">
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
