"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import Modal from '../Modal/Modal';
import { Service } from '../types';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, service }) => {
  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md w-full">
      <h3 className="text-2xl font-bold text-white mb-4">{service.name}</h3>
      <p className="text-slate-400 mb-6">Confira os entregáveis deste serviço:</p>
      
      <ul className="space-y-3">
        {service.deliverables?.map((deliverable: string, index: number) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300 leading-relaxed">{deliverable}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default DetailsModal;