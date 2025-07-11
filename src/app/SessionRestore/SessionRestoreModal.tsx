"use client";

import React from 'react';
import Modal from '../Modal/Modal';

interface SessionRestoreModalProps {
  isOpen: boolean;
  onRestore: () => void;
  onStartNew: () => void;
}

const SessionRestoreModal: React.FC<SessionRestoreModalProps> = ({
  isOpen,
  onRestore,
  onStartNew
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onStartNew} className="max-w-md w-full">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          Orçamento em Andamento
        </h3>
        <p className="text-slate-300 mb-8 leading-relaxed">
          Encontramos um orçamento que você não finalizou. Deseja continuar de onde parou?
        </p>
        <div className="flex gap-4">
          <button
            onClick={onStartNew}
            className="flex-1 bg-slate-700 text-slate-300 font-semibold py-3 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Não, começar do zero
          </button>
          <button
            onClick={onRestore}
            className="flex-1 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Sim, continuar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SessionRestoreModal;