"use client";

import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

interface DiscountModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
  serviceType: 'recorrente' | 'avulso';
}

const DiscountModal: React.FC<DiscountModalProps> = ({
  isOpen,
  onAccept,
  onReject,
  serviceType
}) => {
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setTimeLeft(20 * 60);
    setIsExpired(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const discountTerms = serviceType === 'recorrente'
    ? 'O desconto de 50% será aplicado no valor total do primeiro mês.'
    : 'O desconto de 50% será aplicado sobre o valor total do seu pedido.';

  return (
    <Modal isOpen={isOpen} onClose={onReject} className="max-w-lg w-full">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-green-400 mb-3">
          Espere! Uma oferta especial para você.
        </h3>
        <p className="text-slate-300 mb-6 leading-relaxed">
          Para que você possa conhecer meu trabalho, estou oferecendo{' '}
          <strong className="text-white">50% de desconto</strong> no seu pedido.
        </p>
        
        <div className="bg-slate-900/50 text-slate-400 text-sm p-4 rounded-lg mb-6">
          {discountTerms}
        </div>

        <div className="bg-red-500/20 text-red-300 font-bold text-lg p-4 rounded-lg mb-8 border border-red-500/30">
          Promoção expira em: {' '}
          <span className="text-red-400">
            {isExpired ? 'Expirado!' : formatTime(timeLeft)}
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onAccept}
            disabled={isExpired}
            className="flex-1 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sim, eu quero o desconto!
          </button>
          <button
            onClick={onReject}
            className="flex-1 bg-slate-700 text-slate-300 font-semibold py-3 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Não, obrigado. Cancelar.
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DiscountModal;