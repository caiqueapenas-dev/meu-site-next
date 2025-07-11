"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCalculator } from '../hooks/useCalculator';
import { useToast } from '../hooks/useToast';

import WelcomeStep from '../Steps/WelcomeStep';
import UserDataStep from '../Steps/UserDataStep';
import ServiceTypeStep from '../Steps/ServiceTypeStep';
import CategorySelectionStep from '../Steps/CategorySelectionStep';
import ServiceConfigStep from '../ServiceConfig/ServiceConfigStep';
import FinalBudgetStep from '../FinalBudget/FinalBudgetStep';
import BudgetFooter from '../BudgetSummary/BudgetFooter';
import ToastContainer from '../Toast/ToastContainer';
import SessionRestoreModal from '../SessionRestore/SessionRestoreModal';

export default function BudgetClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [currentConfigIndex, setCurrentConfigIndex] = useState(0);
  const [showSessionRestore, setShowSessionRestore] = useState(false);

  const {
    cart,
    serviceType,
    selectedCategories,
    userData,
    discountState,
    totals,
    setServiceType,
    setSelectedCategories,
    setUserData,
    setDiscountState,
    updateCart,
    clearSession,
    loadSession,
    formatCurrency,
    findServiceById,
    calculateItemSubtotal
  } = useCalculator();

  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const hasSession = loadSession();
    if (hasSession && !searchParams.get('step')) {
      setShowSessionRestore(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const stepParam = searchParams.get('step');
    const step = stepParam ? parseInt(stepParam) : 0;
    if (showSessionRestore) return;
    setCurrentStep(step);
  }, [searchParams, showSessionRestore]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentStep, currentConfigIndex]);
  
  const navigateToStep = (step: number) => {
    router.push(`/marketing-budget?step=${step}`);
  };

  const handleServiceTypeSelect = (type: 'recorrente' | 'avulso') => {
    setServiceType(type);
    setSelectedCategories([]);
    navigateToStep(3);
  };

  const handleConfigNext = () => {
    if (currentConfigIndex < selectedCategories.length - 1) {
      setCurrentConfigIndex(currentConfigIndex + 1);
    } else {
      navigateToStep(5);
    }
  };

  const handleConfigPrev = () => {
    if (currentConfigIndex > 0) {
      setCurrentConfigIndex(currentConfigIndex - 1);
    } else {
      navigateToStep(3);
    }
  };
  
  const handleApplyDiscount = () => {
    setDiscountState({ applied: true, timerId: null });
  };

  const handleCancelOrder = () => {
    clearSession();
    router.push('/marketing-budget');
  };

  const handleSessionRestore = () => {
    setShowSessionRestore(false);
    navigateToStep(2);
    showToast('Sessão restaurada com sucesso!', 'success');
  };

  const handleStartNew = () => {
    clearSession();
    setShowSessionRestore(false);
    navigateToStep(0);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={() => navigateToStep(1)} />;
      case 1:
        return (
          <UserDataStep
            userData={userData}
            onUserDataChange={setUserData}
            onNext={() => navigateToStep(2)}
            onPrev={() => navigateToStep(0)}
          />
        );
      case 2:
        return (
          <ServiceTypeStep
            onServiceTypeSelect={handleServiceTypeSelect}
            onPrev={() => navigateToStep(1)}
          />
        );
      case 3:
        return (
          <CategorySelectionStep
            serviceType={serviceType as 'recorrente' | 'avulso'}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            onServiceTypeChange={setServiceType}
            onNext={() => {
              setCurrentConfigIndex(0);
              navigateToStep(4);
            }}
            onPrev={() => navigateToStep(2)}
          />
        );
      case 4:
        return (
          <ServiceConfigStep
            selectedCategories={selectedCategories}
            currentIndex={currentConfigIndex}
            cart={cart}
            serviceType={serviceType as 'recorrente' | 'avulso'}
            onCartUpdate={updateCart}
            onServiceTypeChange={setServiceType}
            onNext={handleConfigNext}
            onPrev={handleConfigPrev}
            formatCurrency={formatCurrency}
            calculateItemSubtotal={calculateItemSubtotal}
            showToast={showToast}
          />
        );
      case 5:
        return (
          <FinalBudgetStep
            cart={cart}
            userData={userData}
            totals={totals}
            serviceType={serviceType as 'recorrente' | 'avulso'}
            discountApplied={discountState.applied}
            onCartUpdate={updateCart}
            onBack={() => navigateToStep(4)}
            onApplyDiscount={handleApplyDiscount}
            onCancelOrder={handleCancelOrder}
            formatCurrency={formatCurrency}
            findServiceById={findServiceById}
            calculateItemSubtotal={calculateItemSubtotal}
            showToast={showToast}
          />
        );
      default:
        return <WelcomeStep onNext={() => navigateToStep(1)} />;
    }
  };
  
  const renderFooter = () => {
    if (currentStep === 3) {
      return (
        <BudgetFooter
          onPrev={() => navigateToStep(2)}
          onNext={() => {
            setCurrentConfigIndex(0);
            navigateToStep(4);
          }}
          isNextDisabled={selectedCategories.length === 0}
          nextLabel="Continuar"
        />
      );
    }
    if (currentStep === 4) {
      const isLastStep = currentConfigIndex === selectedCategories.length - 1;
      return (
        <BudgetFooter
          onPrev={handleConfigPrev}
          onNext={handleConfigNext}
          isNextDisabled={false}
          nextLabel={isLastStep ? 'Ver Orçamento Final' : 'Próximo'}
        />
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-inter">
      <main className="container mx-auto px-6 lg:px-10 py-10 pb-40">
        {renderCurrentStep()}
      </main>

      {renderFooter()}

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <SessionRestoreModal
        isOpen={showSessionRestore}
        onRestore={handleSessionRestore}
        onStartNew={handleStartNew}
      />
    </div>
  );
}
