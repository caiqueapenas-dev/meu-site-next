"use client";

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BudgetFooterProps {
  onPrev: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
}

const BudgetFooter: React.FC<BudgetFooterProps> = ({
  onPrev,
  onNext,
  isNextDisabled = false,
  nextLabel = 'Próximo',
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-[1.3px] border-t border-slate-600 z-40">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </button>
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className="flex items-center gap-2 bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

export default BudgetFooter;