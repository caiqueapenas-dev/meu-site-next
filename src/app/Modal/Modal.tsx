"use client";

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className={`bg-slate-800 rounded-lg p-8 relative animate-in zoom-in-95 duration-300 ${className}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-3xl leading-none"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;