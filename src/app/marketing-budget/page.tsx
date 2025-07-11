import React, { Suspense } from 'react';
import BudgetClientPage from './BudgetClientPage';

// Componente de fallback para o Suspense
function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <p className="text-xl">Carregando calculadora...</p>
    </div>
  );
}

export default function MarketingBudgetPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BudgetClientPage />
    </Suspense>
  );
}
