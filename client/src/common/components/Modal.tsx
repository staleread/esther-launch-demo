interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <div
      className="flex justify-center items-center fixed top-0 left-0 size-full bg-[#94a3b899]"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={onClose}
    >
      {isOpen && (
        <div
          className="relative bg-slate-50 rounded-lg p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
}
