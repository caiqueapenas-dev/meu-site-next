"use client";

import React, { useState } from 'react';
import { services } from '../data/services';
import { Cart } from '../types';
import ServiceCard from './ServiceCard';
import InvestmentModal from '../Modals/InvestmentModal';
import DetailsModal from '../Modals/DetailsModal';

interface ServiceConfigStepProps {
  selectedCategories: string[];
  currentIndex: number;
  cart: Cart;
  serviceType: 'recorrente' | 'avulso';
  onCartUpdate: (serviceId: string, quantity: number) => void;
  onServiceTypeChange: (type: 'recorrente' | 'avulso') => void;
  formatCurrency: (value: number) => string;
  calculateItemSubtotal: (service: any, quantity: number) => number;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ServiceConfigStep: React.FC<ServiceConfigStepProps> = ({
  selectedCategories,
  currentIndex,
  cart,
  serviceType,
  onCartUpdate,
  onServiceTypeChange,
  formatCurrency,
  calculateItemSubtotal,
  showToast
}) => {
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const categoryName = selectedCategories[currentIndex];
  const category = services.find(s => s.category === categoryName);

  if (!category) return null;

  const handleServiceAdd = (serviceId: string) => {
    if (serviceId === 'trafego_gestao') {
      setShowInvestmentModal(true);
    } else {
      onCartUpdate(serviceId, 1);
      showToast('Serviço adicionado!');
    }
  };

  const handleServiceRemove = (serviceId: string) => {
    onCartUpdate(serviceId, 0);
    showToast('Serviço removido.', 'info');
  };

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    const currentQty = cart[serviceId] || 0;
    onCartUpdate(serviceId, quantity);
    
    if (currentQty === 0 && quantity === 1) {
      showToast('Serviço adicionado!');
    } else if (currentQty === 1 && quantity === 0) {
      showToast('Serviço removido.', 'info');
    }
  };

  const handleInvestmentConfirm = (investment: number) => {
    onCartUpdate('trafego_gestao', 1);
    onCartUpdate('trafego_investimento_custom', investment);
    setShowInvestmentModal(false);
    showToast('Serviço de Tráfego Adicionado!');
  };

  const handleShowDetails = (service: any) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  const switchToRecurring = () => {
    onServiceTypeChange('recorrente');
    showToast('Alterado para Plano Recorrente', 'info');
  };

  const isLastStep = currentIndex === selectedCategories.length - 1;

  return (
    <div className="animate-in fade-in duration-600">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Personalize: {categoryName}
        </h2>
        <p className="text-slate-400">
          Passo {currentIndex + 1} de {selectedCategories.length}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-800 p-8 rounded-xl max-w-6xl mx-auto">
        {category.items.map((service) => {
          const isItemAvailable = serviceType === 'avulso' 
            ? service.billing === 'once' 
            : true;
          const quantity = cart[service.id] || 0;

          return (
            <ServiceCard
              key={service.id}
              service={service}
              quantity={quantity}
              serviceType={serviceType}
              isAvailable={isItemAvailable}
              onAdd={() => handleServiceAdd(service.id)}
              onRemove={() => handleServiceRemove(service.id)}
              onQuantityChange={(qty) => handleQuantityChange(service.id, qty)}
              onShowDetails={() => handleShowDetails(service)}
              onSwitchToRecurring={switchToRecurring}
              formatCurrency={formatCurrency}
              calculateItemSubtotal={calculateItemSubtotal}
            />
          );
        })}
      </div>



      <InvestmentModal
        isOpen={showInvestmentModal}
        onClose={() => setShowInvestmentModal(false)}
        onConfirm={handleInvestmentConfirm}
        formatCurrency={formatCurrency}
      />

      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        service={selectedService}
      />
    </div>
  );
};

export default ServiceConfigStep;