"use client";

import React from 'react';
import { Plus, X, Minus, Info, Gift } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  quantity: number;
  serviceType: 'recorrente' | 'avulso';
  isAvailable: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
  onShowDetails: () => void;
  onSwitchToRecurring: () => void;
  formatCurrency: (value: number) => string;
  calculateItemSubtotal: (service: Service, quantity: number) => number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  quantity,
  serviceType,
  isAvailable,
  onAdd,
  onRemove,
  onQuantityChange,
  onShowDetails,
  onSwitchToRecurring,
  formatCurrency,
  calculateItemSubtotal
}) => {
  const isAdded = quantity > 0;
  const subtotal = calculateItemSubtotal(service, quantity);
  
  // Calcula o valor do desconto
  const originalPrice = service.price * quantity;
  const discountAmount = originalPrice - subtotal;

  const renderControls = () => {
    if (!isAvailable) return null;

    if (service.type === 'quantity') {
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400 font-medium">Unidades:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
                className="w-8 h-8 bg-slate-700 text-slate-300 font-bold rounded-full hover:bg-slate-600 transition-all duration-150 active:scale-95"
              >
                <Minus className="w-4 h-4 mx-auto" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => onQuantityChange(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 text-center bg-transparent font-bold text-lg text-white border-none outline-none"
                min="0"
              />
              <button
                onClick={() => onQuantityChange(quantity + 1)}
                className="w-8 h-8 bg-slate-700 text-slate-300 font-bold rounded-full hover:bg-slate-600 transition-all duration-150 active:scale-95"
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
          
          {/* --- NOVO BLOCO DE INFORMAÇÕES DINÂMICAS --- */}
          {quantity > 0 && (
            <div className="text-right pt-2 space-y-1">
              <div className="text-slate-400 text-sm">
                Subtotal: <span className="text-white font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="text-xs">
                {discountAmount > 0 && (
                  <p className="text-green-400 font-medium">
                    (Desconto: {formatCurrency(discountAmount)})
                  </p>
                )}
                {serviceType === 'recorrente' && (
                  <p className="text-blue-300 font-medium">
                    (Equivale a ~{(quantity / 4).toFixed(1).replace('.0', '')} posts/semana)
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (isAdded) {
      return (
        <div className="flex items-center justify-center gap-4">
          <span className="text-green-400 font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Adicionado
          </span>
          <button
            onClick={onRemove}
            className="text-red-400 hover:text-red-300 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={onAdd}
        className="w-full bg-green-600/80 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
      >
        Adicionar
      </button>
    );
  };

  return (
    <div className="relative bg-slate-900 p-6 rounded-xl flex flex-col justify-between transition-all duration-300 hover:bg-slate-800">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-bold text-lg text-white pr-2 leading-tight">
            {service.name}
          </h4>
          <button
            onClick={onShowDetails}
            className="text-slate-400 hover:text-blue-400 transition-colors p-1"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {service.description}
        </p>

        {service.type === 'quantity' && (
          <div className="flex items-center gap-2 text-xs text-green-400 font-semibold mb-3 bg-green-500/10 p-2 rounded-lg">
            <Gift className="w-4 h-4" />
            Quanto mais unidades, maior o desconto!
          </div>
        )}

        <p className="text-blue-400 font-semibold text-lg mb-4">
          {formatCurrency(service.price)} {service.unit}
        </p>
      </div>

      {isAvailable ? (
        <div>{renderControls()}</div>
      ) : (
        <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-[1.3px] flex flex-col items-center justify-center rounded-xl p-4 text-center">
          <div className="p-3 bg-blue-500/20 rounded-lg mb-4">
            <Plus className="w-8 h-8 text-blue-400" />
          </div>
          <button
            onClick={onSwitchToRecurring}
            className="bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Mudar para Recorrente
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;