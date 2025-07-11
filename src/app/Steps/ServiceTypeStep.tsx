"use client";

import React from 'react';
import { ArrowLeft, RefreshCw, Zap } from 'lucide-react';

interface ServiceTypeStepProps {
  onServiceTypeSelect: (type: 'recorrente' | 'avulso') => void;
  onPrev: () => void;
}

const ServiceTypeStep: React.FC<ServiceTypeStepProps> = ({ onServiceTypeSelect, onPrev }) => {
  return (
    <div className="animate-in fade-in duration-600">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Qual tipo de serviço você busca?
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <button
          onClick={() => onServiceTypeSelect('recorrente')}
          className="group bg-slate-800 p-8 rounded-xl border-2 border-transparent text-left hover:border-blue-500 hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
              <RefreshCw className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Serviço recorrente</h3>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Ideal para quem busca um plano de marketing <b>contínuo</b>, com acompanhamento e otimização mensal.
          </p>
        </button>

        <button
          onClick={() => onServiceTypeSelect('avulso')}
          className="group bg-slate-800 p-8 rounded-xl border-2 border-transparent text-left hover:border-blue-500 hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
              <Zap className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Serviço avulso</h3>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Perfeito para projetos pontuais, como a criação de artes, edição de vídeos ou a configuração inicial de uma ferramenta.
          </p>
        </button>
      </div>

      <div className="text-center mt-12">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ServiceTypeStep;