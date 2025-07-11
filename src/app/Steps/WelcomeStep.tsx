"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="text-center max-w-4xl mx-auto animate-in fade-in duration-600">
      <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
        Chega de orçamentos <span className="text-blue-400">demorados</span> e sem transparência.
      </h1>
      <h2 className="text-xl lg:text-2xl font-light text-slate-400 mt-6 leading-relaxed">
        Monte seu plano de marketing digital em minutos e saiba exatamente quanto vai investir para alcançar seus objetivos.
      </h2>
      <button
        onClick={onNext}
        className="group mt-12 bg-blue-500 text-white font-bold py-4 px-12 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 text-lg inline-flex items-center gap-3"
      >
        Montar meu orçamento
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default WelcomeStep;