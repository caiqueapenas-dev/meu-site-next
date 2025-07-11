"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Usar Link do Next.js para rotas externas
import { ArrowLeft, ArrowRight, User, Mail, Phone, Instagram, Briefcase } from 'lucide-react';
import { UserData } from '../types';

interface UserDataStepProps {
  userData: UserData;
  onUserDataChange: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const UserDataStep: React.FC<UserDataStepProps> = ({
  userData,
  onUserDataChange,
  onNext,
  onPrev
}) => {
  const [formData, setFormData] = useState<UserData>({
    ...userData,
    lgpdAccepted: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserData, string>> = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'O nome completo é obrigatório.';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'O e-mail é obrigatório.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'O e-mail informado é inválido.';
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'O celular é obrigatório.';
      isValid = false;
    }
    if (!formData.field) {
      newErrors.field = 'Sua área de atuação é obrigatória.';
      isValid = false;
    }
    if (!formData.lgpdAccepted) {
      newErrors.lgpdAccepted = 'Você deve aceitar a política de privacidade.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: keyof UserData, value: string | boolean) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUserDataChange(updatedData);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePhoneChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '').slice(0, 11);
    const { length } = onlyDigits;

    if (length >= 11) {
      const masked = onlyDigits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      handleInputChange('phone', masked);
    } else {
      let masked = onlyDigits.replace(/(\d{2})(\d*)/, '($1) $2');
      masked = masked.replace(/( \d{4})(\d*)/, '$1-$2');
      handleInputChange('phone', masked);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      // A URL da API deve ser absoluta ou configurada com proxy no next.config.js
      const apiUrl = '/api/save-lead';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Falha ao salvar o lead, mas continuando o fluxo:', errorResult.message);
      } else {
        const successResult = await response.json();
        console.log('Lead salvo com sucesso!', successResult.message);
      }
    } catch (error) {
      console.error('Erro de rede ao tentar salvar o lead. Verifique se a API está rodando.', error);
    } finally {
      onNext();
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-in fade-in duration-600">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Primeiro, vamos nos conhecer.
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-slate-600'} text-white pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-600'} text-white pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="tel"
            placeholder="Celular (com DDD)"
            value={formData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={`w-full bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-slate-600'} text-white pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="relative">
          <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Seu Instagram (@usuario)"
            value={formData.instagram}
            onChange={(e) => handleInputChange('instagram', e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 text-white pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="relative">
          <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Sua área de atuação (Ex: Nutricionista)"
            value={formData.field}
            onChange={(e) => handleInputChange('field', e.target.value)}
            className={`w-full bg-slate-800 border ${errors.field ? 'border-red-500' : 'border-slate-600'} text-white pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          />
          {errors.field && <p className="text-red-500 text-sm mt-1">{errors.field}</p>}
        </div>

        <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
                <input
                type="checkbox"
                checked={!!formData.lgpdAccepted}
                onChange={(e) => handleInputChange('lgpdAccepted', e.target.checked)}
                className="h-5 w-5 rounded border-slate-500 bg-slate-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-slate-400 text-sm">
                Ao continuar, você concorda em fornecer seus dados para contato, de acordo com a nossa{' '}
                <Link href="/politica-de-privacidade" target="_blank" className="text-blue-400 hover:underline">
                    Política de Privacidade
                </Link> e{' '}
                <Link href="/termos-de-uso" target="_blank" className="text-blue-400 hover:underline">
                    Termos de Uso
                </Link>.
                </span>
            </label>
            {errors.lgpdAccepted && <p className="text-red-500 text-sm mt-1">{errors.lgpdAccepted}</p>}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDataStep;