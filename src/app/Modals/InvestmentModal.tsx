"use client";

import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (investment: number) => void;
  formatCurrency: (value: number) => string;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  formatCurrency
}) => {
  const [investmentValue, setInvestmentValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('');

  const updateFeedback = (amount: number) => {
    if (amount <= 0) {
      setFeedback('');
      setFeedbackColor('');
    } else if (amount <= 200) {
      setFeedback('Valor muito baixo, pode não ter resultados.');
      setFeedbackColor('text-red-400');
    } else if (amount <= 450) {
      setFeedback('Ainda é um valor baixo, mas pode gerar algum tráfego.');
      setFeedbackColor('text-orange-400');
    } else if (amount <= 999) {
      setFeedback('Valor OK para iniciar e testar campanhas.');
      setFeedbackColor('text-yellow-400');
    } else if (amount <= 1500) {
      setFeedback('Valor recomendado para obter bons resultados.');
      setFeedbackColor('text-green-400');
    } else {
      setFeedback('Perfil de investidor arrojado que sabe o que quer!');
      setFeedbackColor('text-blue-400');
    }
  };

  const handleInputChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const numericValue = Number(cleanValue) / 100;
    
    updateFeedback(numericValue);
    
    if (cleanValue) {
      const formattedValue = numericValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      setInvestmentValue(formattedValue);
    } else {
      setInvestmentValue('');
    }
  };

  const handleConfirm = () => {
    const rawValue = investmentValue.replace(/\D/g, '');
    const investmentAmount = Number(rawValue) / 100;
    
    if (investmentAmount > 0) {
      onConfirm(investmentAmount);
      setInvestmentValue('');
      setFeedback('');
    }
  };

  const getSegmentColor = (amount: number, segmentIndex: number) => {
    if (amount <= 0) return 'bg-transparent';
    if (amount <= 200) return segmentIndex === 0 ? 'bg-red-500' : 'bg-transparent';
    if (amount <= 450) return segmentIndex <= 1 ? (segmentIndex === 0 ? 'bg-red-500' : 'bg-orange-500') : 'bg-transparent';
    if (amount <= 999) return segmentIndex <= 2 ? ['bg-red-500', 'bg-orange-500', 'bg-yellow-500'][segmentIndex] : 'bg-transparent';
    if (amount <= 1500) return segmentIndex <= 3 ? ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'][segmentIndex] : 'bg-transparent';
    return ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'][segmentIndex];
  };

  const currentAmount = investmentValue ? Number(investmentValue.replace(/\D/g, '')) / 100 : 0;

  useEffect(() => {
    if (isOpen) {
      setInvestmentValue('');
      setFeedback('');
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md w-full">
      <h3 className="text-2xl font-bold text-white mb-6">Investimento em Anúncios</h3>
      
      <div className="mb-6">
        <div className="flex w-full h-3 rounded-full bg-slate-900 overflow-hidden mb-3">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`w-1/5 transition-colors duration-300 ${getSegmentColor(currentAmount, index)}`}
            />
          ))}
        </div>
        <p className={`text-center text-sm font-semibold h-5 transition-colors duration-300 ${feedbackColor}`}>
          {feedback}
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-300 mb-3">
          Valor do Investimento (Mensal)
        </label>
        <input
          type="text"
          value={investmentValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="R$ 1.000,00"
          className="w-full bg-slate-900 border border-slate-600 text-white text-2xl font-bold p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
      </div>

      <button
        onClick={handleConfirm}
        disabled={currentAmount <= 0}
        className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirmar e Adicionar
      </button>
    </Modal>
  );
};

export default InvestmentModal;