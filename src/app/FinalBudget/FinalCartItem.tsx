"use client";

import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Service } from '../types'; // Garanta que a importação do tipo Service está correta

interface FinalCartItemProps {
  serviceId: string;
  quantity: number;
  serviceType: 'recorrente' | 'avulso';
  onUpdate: (serviceId: string, quantity: number) => void;
  formatCurrency: (value: number) => string;
  findServiceById: (id: string) => Service | undefined;
  calculateItemSubtotal: (service: Service, quantity: number) => number;
}

const FinalCartItem: React.FC<FinalCartItemProps> = ({
  serviceId,
  quantity,
  serviceType,
  onUpdate,
  formatCurrency,
  findServiceById,
  calculateItemSubtotal
}) => {
  let service: Service | { name: string; type: 'fixed'; price: number };
  let itemTotal: number;
  let displayName: string;
  let isMonthly: boolean;

  if (serviceId === 'trafego_investimento_custom') {
    service = { name: 'Investimento em Anúncios', type: 'fixed', price: 0 };
    itemTotal = quantity;
    displayName = service.name;
    isMonthly = serviceType === 'recorrente';
  } else {
    const foundService = findServiceById(serviceId);
    if (!foundService) return null;
    service = foundService;
    itemTotal = calculateItemSubtotal(service, quantity);
    displayName = service.name;
    isMonthly = serviceType === 'recorrente' && 
      (service.billing === 'monthly' || service.type === 'quantity');
  }

  const handleRemove = () => {
    onUpdate(serviceId, 0);
    if (serviceId === 'trafego_gestao') {
      onUpdate('trafego_investimento_custom', 0);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    onUpdate(serviceId, Math.max(0, newQuantity));
  };

  const renderControls = () => {
    if (service.type === 'quantity') {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="w-8 h-8 bg-slate-700 text-slate-300 font-bold rounded-full hover:bg-slate-600 transition-colors"
          >
            <Minus className="w-4 h-4 mx-auto" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
            className="w-14 text-center bg-transparent font-bold text-white border border-slate-600 rounded px-2 py-1"
            min="0"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-8 h-8 bg-slate-700 text-slate-300 font-bold rounded-full hover:bg-slate-600 transition-colors"
          >
            <Plus className="w-4 h-4 mx-auto" />
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={handleRemove}
        className="text-red-400 hover:text-red-300 transition-colors p-1"
      >
        <X className="w-5 h-5" />
      </button>
    );
  };
  
  const originalPrice = service.type === 'quantity' ? service.price * quantity : itemTotal;
  const discountAmount = originalPrice - itemTotal;

  return (
    <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-lg">
      <div className="flex-grow">
        <p className="font-bold text-white">{displayName}</p>
        <p className="text-sm text-slate-400">
          {formatCurrency(itemTotal)} {isMonthly ? '/mês' : ''}
          {service.type === 'quantity' && discountAmount > 0 && (
            <span className="text-green-400 font-semibold ml-2">
              (Desconto: {formatCurrency(discountAmount)})
            </span>
          )}
        </p>
        {serviceType === 'recorrente' && service.type === 'quantity' && quantity > 0 && (
          <p className="text-xs text-blue-300 mt-1">
            (Equivale a ~{(quantity / 4).toFixed(1).replace('.0', '')} posts/semana)
          </p>
        )}
      </div>
      {renderControls()}
    </div>
  );
};

export default FinalCartItem;