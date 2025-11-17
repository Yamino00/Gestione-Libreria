import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-slate-900 bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg m-4 animate-fade-in-down overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-primary-light flex justify-between items-center border-b border-sky-200">
          <h2 id="modal-title" className="text-xl font-semibold text-primary-dark">{title}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 p-1 rounded-full hover:bg-sky-200 transition-colors" aria-label="Chiudi modale">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 sm:p-8 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};