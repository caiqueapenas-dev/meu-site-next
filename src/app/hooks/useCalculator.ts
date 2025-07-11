"use client";

import { useState, useEffect, useCallback } from 'react';
import { Cart, UserData, DiscountState, Totals, Service } from '../types';
import { services } from '../data/services';

const SESSION_KEY = 'calculadoraSession';

export const useCalculator = () => {
  const [cart, setCart] = useState<Cart>({});
  const [serviceType, setServiceType] = useState<'recorrente' | 'avulso' | ''>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // CORREÇÃO 1: Adicionado 'lgpdAccepted' ao estado inicial
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    field: '',
    lgpdAccepted: false 
  });

  const [discountState, setDiscountState] = useState<DiscountState>({
    applied: false,
    timerId: null
  });

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateProgressiveDiscount = (quantity: number): number => {
    if (quantity <= 1) return 0;
    if (quantity >= 10) return 0.20;
    return ((quantity - 1) / 9) * 0.20;
  };

  const findServiceById = (id: string): Service | undefined => {
    return services.flatMap(cat => cat.items).find(item => item.id === id);
  };

  const calculateItemSubtotal = (service: Service, quantity: number): number => {
    if (!service || quantity === 0) return 0;
    let itemTotal = service.price * quantity;
    if (service.type === 'quantity') {
      itemTotal *= (1 - calculateProgressiveDiscount(quantity));
    }
    return itemTotal;
  };

  const calculateTotals = useCallback((): Totals => {
    let initialTotal = 0;
    let monthlyTotal = 0;

    Object.entries(cart).forEach(([id, value]) => {
      if (value === 0) return;
      
      let itemTotal: number;
      let isMonthly: boolean;

      if (id === 'trafego_investimento_custom') {
        itemTotal = value;
        isMonthly = serviceType === 'recorrente';
      } else {
        const service = findServiceById(id);
        if (!service) return;
        itemTotal = calculateItemSubtotal(service, value);
        isMonthly = serviceType === 'recorrente' && 
          (service.billing === 'monthly' || service.type === 'quantity');
      }

      if (isMonthly) {
        monthlyTotal += itemTotal;
      } else {
        initialTotal += itemTotal;
      }
    });

    const originalFirstMonthPayment = initialTotal + monthlyTotal;
    let discountAmount = 0;
    
    if (discountState.applied) {
      discountAmount = originalFirstMonthPayment * 0.5;
    }
    
    const finalFirstMonthPayment = originalFirstMonthPayment - discountAmount;

    return {
      initialTotal,
      monthlyTotal,
      originalFirstMonthPayment,
      discountAmount,
      finalFirstMonthPayment,
      cartIsEmpty: Object.keys(cart).length === 0
    };
  }, [cart, serviceType, discountState.applied, calculateItemSubtotal]);

  const updateCart = (serviceId: string, quantity: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (quantity === 0) {
        delete newCart[serviceId];
        if (serviceId === 'trafego_gestao') {
          delete newCart['trafego_investimento_custom'];
        }
      } else {
        newCart[serviceId] = quantity;
      }
      return newCart;
    });
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    setCart({});
    setServiceType('');
    setSelectedCategories([]);
    setUserData({
      name: '',
      email: '',
      phone: '',
      instagram: '',
      field: '',
      lgpdAccepted: false
    });
    setDiscountState({
      applied: false,
      timerId: null
    });
  };

  const saveSession = useCallback(() => {
    const sessionData = {
      cart,
      serviceType,
      userData,
      selectedCategories,
      discountState: {
        applied: discountState.applied,
        timerId: null
      }
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  }, [cart, serviceType, userData, selectedCategories, discountState.applied]);

  // CORREÇÃO 2: Estrutura da função loadSession ajustada
  const loadSession = useCallback((): boolean => {
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        const parsedData = JSON.parse(savedSession);
        setCart(parsedData.cart || {});
        setServiceType(parsedData.serviceType || '');
        setUserData({
            name: '',
            email: '',
            phone: '',
            instagram: '',
            field: '',
            lgpdAccepted: false,
            ...(parsedData.userData || {}),
        });
        setSelectedCategories(parsedData.selectedCategories || []);
        setDiscountState(parsedData.discountState || { applied: false, timerId: null });
        return true;
      } catch (error) {
        console.error('Error loading session:', error);
        localStorage.removeItem(SESSION_KEY);
      }
    }
    return false;
  }, []);

  useEffect(() => {
    if (serviceType || Object.keys(cart).length > 0 || userData.name) {
      saveSession();
    }
  }, [saveSession, serviceType, cart, userData.name]);

  return {
    cart,
    serviceType,
    selectedCategories,
    userData,
    discountState,
    setServiceType,
    setSelectedCategories,
    setUserData,
    setDiscountState,
    updateCart,
    clearSession,
    loadSession,
    totals: calculateTotals(),
    formatCurrency,
    calculateProgressiveDiscount,
    findServiceById,
    calculateItemSubtotal
  };
};