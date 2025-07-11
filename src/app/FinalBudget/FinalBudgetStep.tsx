"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, MessageCircle, Minus, Plus } from 'lucide-react';
import { Cart, UserData, Totals } from '../types';
import FinalCartItem from './FinalCartItem';
import DiscountModal from '../Modals/DiscountModal';
import { services } from '../data/services';

interface FinalBudgetStepProps {
  cart: Cart;
  userData: UserData;
  totals: Totals;
  serviceType: 'recorrente' | 'avulso';
  discountApplied: boolean;
  onCartUpdate: (serviceId: string, quantity: number) => void;
  onBack: () => void;
  onApplyDiscount: () => void;
  onCancelOrder: () => void;
  formatCurrency: (value: number) => string;
  findServiceById: (id: string) => any;
  calculateItemSubtotal: (service: any, quantity: number) => number;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const FinalBudgetStep: React.FC<FinalBudgetStepProps> = ({
  cart,
  userData,
  totals,
  serviceType,
  discountApplied,
  onCartUpdate,
  onBack,
  onApplyDiscount,
  onCancelOrder,
  formatCurrency,
  findServiceById,
  calculateItemSubtotal,
  showToast
}) => {
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  const formatBudgetDetails = () => {
    let message = `*DADOS DO CLIENTE:*\n`;
    message += `Nome: ${userData.name || 'Não informado'}\n`;
    message += `E-mail: ${userData.email || 'Não informado'}\n`;
    message += `Celular: ${userData.phone || 'Não informado'}\n`;
    message += `Instagram: ${userData.instagram || 'Não informado'}\n`;
    message += `Área de Atuação: ${userData.field || 'Não informado'}\n\n`;
    message += `*SERVIÇOS SOLICITADOS (${serviceType === 'recorrente' ? 'Plano Recorrente' : 'Serviço Avulso'}):*\n`;

    Object.entries(cart).sort((a,b) => a[0].localeCompare(b[0])).forEach(([id, value]) => {
      let service, itemTotal, name;
      if (id === 'trafego_investimento_custom') {
        service = { name: 'Investimento em Anúncios' };
        itemTotal = value;
        name = service.name;
      } else {
        service = findServiceById(id);
        itemTotal = calculateItemSubtotal(service, value);
        name = service.type === 'quantity' ? `${service.name} (Qtd: ${value})` : service.name;
      }
      message += `- ${name}: ${formatCurrency(itemTotal)}\n`;
    });

    message += `\n*RESUMO DO ORÇAMENTO:*\n`;
    if (discountApplied) {
      const discountTerm = serviceType === 'recorrente' ? 'no valor total do primeiro mês.' : 'no valor total.';
      message += `*OFERTA ESPECIAL APLICADA (50% OFF ${discountTerm})*\n\n`;
      message += `Subtotal: ${formatCurrency(totals.originalFirstMonthPayment)}\n`;
      message += `Desconto (50%): -${formatCurrency(totals.discountAmount)}\n`;
      message += `--------------------------------\n`;
      message += `*Total a Pagar:* ${formatCurrency(totals.finalFirstMonthPayment)}\n`;
    } else {
      message += `*Pagamento Inicial:* ${formatCurrency(totals.originalFirstMonthPayment)}\n`;
    }

    if (serviceType === 'recorrente' && totals.monthlyTotal > 0) {
      message += `*Mensalidade (a partir do 2º mês):* ${formatCurrency(totals.monthlyTotal)}`;
    }
    return message;
  }
const saveBudgetToDatabase = useCallback(async () => { // [!code ++]
    const budgetDetails = formatBudgetDetails();
    try {
      const response = await fetch('/api/save-budget', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email: userData.email, budgetDetails }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Resposta da API:', result.message);
      } else {
        const errorResult = await response.json();
        console.error('Falha ao salvar o orçamento:', errorResult.message);
        console.error('Detalhes do erro do servidor:', errorResult.error);
        showToast(`Erro ao salvar: ${errorResult.message || 'Verifique o console'}`, 'error');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Erro de rede ou ao conectar com a API:', message);
      showToast('Não foi possível conectar ao servidor. Verifique o console.', 'error');
    }
}, [formatBudgetDetails, userData.email, showToast]); // [!code ++]

useEffect(() => {
  if (!totals.cartIsEmpty) {
    saveBudgetToDatabase();
  }
}, [totals.cartIsEmpty, saveBudgetToDatabase]); // Adicione a função aqui


  const sendToWhatsApp = () => {
    const message = formatBudgetDetails();
    const whatsappUrl = `https://wa.me/5575981865878?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCancelOrder = () => {
    if (discountApplied) return;
    setShowDiscountModal(true);
  };

  const handleDiscountAccept = () => {
    onApplyDiscount();
    setShowDiscountModal(false);
    showToast('Desconto de 50% aplicado!', 'success');
  };

  const handleDiscountReject = () => {
    setShowDiscountModal(false);
    onCancelOrder();
  };

  const oneTimeItems: any[] = [];
  const recurringItems: any[] = [];

  Object.entries(cart).forEach(([id, value]) => {
    if (value === 0) return;
    
    let isMonthly;
    if (id === 'trafego_investimento_custom') {
      isMonthly = serviceType === 'recorrente';
    } else {
      const service = findServiceById(id);
      if (!service) return;
      isMonthly = serviceType === 'recorrente' && 
        (service.billing === 'monthly' || service.type === 'quantity');
    }

    const itemData = { id, value };
    if (isMonthly) {
      recurringItems.push(itemData);
    } else {
      oneTimeItems.push(itemData);
    }
  });

  if (totals.cartIsEmpty) {
    return (
      <div className="animate-in fade-in duration-600">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Seu Orçamento
        </h2>
        <div className="bg-slate-800 p-8 rounded-xl max-w-3xl mx-auto text-center">
          <p className="text-slate-400 text-lg mb-6">Seu orçamento está vazio.</p>
          <button
            onClick={onBack}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar e adicionar serviços
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-600">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Seu Orçamento Personalizado está Pronto!
      </h2>
      
      <div className="bg-slate-800 p-6 lg:p-8 rounded-xl max-w-4xl mx-auto">
        <div className="space-y-6 mb-6">
          {oneTimeItems.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-blue-300 border-b border-slate-600 pb-2 mb-4">
                Custos de Setup (Pagamento Único)
              </h4>
              <div className="space-y-3">
                {oneTimeItems.map(({ id, value }) => (
                  <FinalCartItem
                    key={id}
                    serviceId={id}
                    quantity={value}
                    serviceType={serviceType}
                    onUpdate={onCartUpdate}
                    formatCurrency={formatCurrency}
                    findServiceById={findServiceById}
                    calculateItemSubtotal={calculateItemSubtotal}
                  />
                ))}
              </div>
            </div>
          )}

          {recurringItems.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-blue-300 border-b border-slate-600 pb-2 mb-4">
                Custos Mensais Recorrentes
              </h4>
              <div className="space-y-3">
                {recurringItems.map(({ id, value }) => (
                  <FinalCartItem
                    key={id}
                    serviceId={id}
                    quantity={value}
                    serviceType={serviceType}
                    onUpdate={onCartUpdate}
                    formatCurrency={formatCurrency}
                    findServiceById={findServiceById}
                    calculateItemSubtotal={calculateItemSubtotal}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {(() => {
          const quantityServiceIds = services
            .filter(cat => cat.category === 'Criação de Artes Gráficas' || cat.category === 'Edição de Vídeo')
            .flatMap(cat => cat.items)
            .map(item => item.id);

          const unselectedItems = quantityServiceIds.filter(id => !(cart[id] > 0));

          if (serviceType === 'recorrente' && unselectedItems.length > 0) {
            return (
              <div className="my-6">
                <h4 className="text-lg font-bold text-slate-300 mb-3">Adicione mais conteúdo ao seu plano:</h4>
                <div className="space-y-3">
                  {unselectedItems.map(id => {
                    const service = findServiceById(id);
                    if (!service) return null;
                    return (
                      <div key={id} className="flex justify-between items-center bg-slate-900/40 p-3 rounded-lg">
                        <div>
                          <p className="font-semibold text-white">{service.name}</p>
                          <p className="text-sm text-blue-400">{formatCurrency(service.price)} /unidade</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => onCartUpdate(id, 0)} className="w-8 h-8 bg-slate-700 text-slate-300 font-bold rounded-full"><Minus className="w-4 h-4 mx-auto" /></button>
                          <span className="font-bold text-white w-8 text-center">0</span>
                          <button onClick={() => onCartUpdate(id, 1)} className="w-8 h-8 bg-slate-700 text-slate-300 font-bold rounded-full"><Plus className="w-4 h-4 mx-auto" /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          }
          return null;
        })()}
        
        
        {(() => {
  const totalPosts = Object.entries(cart).reduce((total, [id, quantity]) => {
    const serviceInfo = services
      .flatMap(cat => cat.items.map(item => ({...item, categoryName: cat.category})))
      .find(item => item.id === id);

    if (serviceInfo && serviceInfo.type === 'quantity' && (serviceInfo.categoryName === 'Criação de Artes Gráficas' || serviceInfo.categoryName === 'Edição de Vídeo')) {
      return total + quantity;
    }
    return total;
  }, 0);

  if (serviceType !== 'recorrente' || totalPosts === 0) {
    return null;
  }

  const averageWeekly = totalPosts / 4;

  const getFeedback = (avg: number) => {
    if (avg < 2) return { text: 'Volume muito baixo.', barColor: 'bg-red-500', tipColor: 'bg-red-500/10 text-red-400', tip: 'Uma frequência maior pode trazer resultados mais rápidos. Que tal adicionar mais alguns posts?' };
    if (avg < 3) return { text: 'Volume baixo, mas um começo.', barColor: 'bg-orange-500', tipColor: 'bg-orange-500/10 text-orange-400', tip: 'Você está no caminho certo! Adicionar mais 1 ou 2 posts por semana pode acelerar seu crescimento.' };
    if (avg < 4) return { text: 'Volume ideal para começar.', barColor: 'bg-yellow-500', tipColor: 'bg-yellow-500/10 text-yellow-300', tip: 'Excelente frequência para construir uma base sólida e engajar sua audiência de forma consistente.' };
    if (avg < 5) return { text: 'Bom volume de postagens!', barColor: 'bg-green-500', tipColor: 'bg-green-500/10 text-green-400', tip: 'Com essa frequência, você se manterá relevante e presente para seu público.' };
    return { text: 'Excelente volume, alta frequência!', barColor: 'bg-blue-500', tipColor: 'bg-blue-500/10 text-blue-300', tip: 'Plano de conteúdo robusto para dominar seu nicho e gerar autoridade máxima!' };
  };

  const feedback = getFeedback(averageWeekly);
  const barWidthPercentage = Math.min((averageWeekly / 5) * 100, 100);

  return (
    <div className="my-6 text-center bg-slate-900/50 p-4 rounded-lg border border-blue-500/30">
      <h4 className="text-lg font-bold text-blue-300 mb-2">Resumo de Frequência</h4>
      <p className="text-white text-xl">
        Isso equivale a <span className="font-bold text-2xl">{averageWeekly.toFixed(1).replace('.0', '')}</span> posts por semana, em média.
      </p>

      <div className="w-full h-3 rounded-full bg-slate-700 my-3 overflow-hidden">
         <div 
            className={`h-full rounded-full ${feedback.barColor} transition-all duration-500`}
            style={{ width: `${barWidthPercentage}%` }}
          ></div>
      </div>

      <p className={`text-center text-sm font-semibold h-5`}>
        {feedback.text}
      </p>

      {averageWeekly < 5 && (
        <div className={`mt-3 text-xs p-2 rounded-md ${feedback.tipColor}`}>
           <span className="font-bold">Dica:</span> {feedback.tip}
        </div>
      )}
    </div>
  );
})()}

        {/* Totals */}
        <div className="border-t-2 border-slate-600 pt-6 space-y-3">
          {discountApplied ? (
            <>
              <div className="text-center text-green-400 text-sm mb-4">
                {serviceType === 'recorrente' 
                  ? 'Desconto de 50% aplicado no valor total do primeiro mês.' 
                  : 'Desconto de 50% aplicado no valor total.'}
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-slate-300">Subtotal:</span>
                <span className="font-semibold text-white">
                  {formatCurrency(totals.originalFirstMonthPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-green-400">Desconto (50%):</span>
                <span className="font-semibold text-green-400">
                  -{formatCurrency(totals.discountAmount)}
                </span>
              </div>
              <div className="border-t border-slate-600 my-3"></div>
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold text-slate-300">Total a Pagar:</span>
                <span className="font-bold text-blue-400">
                  {formatCurrency(totals.finalFirstMonthPayment)}
                </span>
              </div>
              {serviceType === 'recorrente' && totals.monthlyTotal > 0 && (
                <div className="flex justify-between items-center text-lg mt-2">
                  <span className="font-semibold text-slate-300">
                    Mensalidade (a partir do 2º mês):
                  </span>
                  <span className="font-bold text-white">
                    {formatCurrency(totals.monthlyTotal)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-between items-center text-xl">
                <span className="font-semibold text-slate-300">Valor Inicial a Pagar:</span>
                <span className="font-bold text-blue-400">
                  {formatCurrency(totals.originalFirstMonthPayment)}
                </span>
              </div>
              {serviceType === 'recorrente' && totals.monthlyTotal > 0 && (
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-slate-300">
                    Cobrança Mensal Recorrente:
                  </span>
                  <span className="font-bold text-white">
                    {formatCurrency(totals.monthlyTotal)}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-3 mt-8">
          <button
            onClick={sendToWhatsApp}
            className="w-full flex items-center justify-center gap-3 bg-green-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Finalizar e Enviar no WhatsApp
          </button>
          
          <button
            onClick={onBack}
            className="w-full text-slate-400 font-semibold py-3 rounded-lg hover:bg-slate-700 transition-colors"
          >
            ← Voltar e editar serviços
          </button>
          
          {!discountApplied && (
            <button
              onClick={handleCancelOrder}
              className="w-full text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors py-2 rounded-lg"
            >
              Cancelar Pedido
            </button>
          )}
        </div>
      </div>

      <DiscountModal
        isOpen={showDiscountModal}
        onAccept={handleDiscountAccept}
        onReject={handleDiscountReject}
        serviceType={serviceType}
      />
    </div>
  );
};

export default FinalBudgetStep;