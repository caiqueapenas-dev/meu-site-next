// src/app/dashboard/EditLeadModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Lead } from '../types';

// Tipos para as props que o modal receberá

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onSave: (updatedLead: Lead) => Promise<void>;
}

export default function EditLeadModal({ isOpen, onClose, lead, onSave }: EditLeadModalProps) {
  const [formData, setFormData] = useState<Lead | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Quando o lead para edição mudar, atualiza o estado do formulário
    setFormData(lead);
  }, [lead]);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 animate-in fade-in-90 zoom-in-95">
        <h2 className="text-2xl font-bold text-white mb-6">Editar Lead</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Campo Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Nome</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required />
            </div>
            {/* Outros campos... */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">E-mail</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-400 mb-1">Telefone</label>
              <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" />
            </div>
             <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-slate-400 mb-1">Instagram</label>
              <input type="text" name="instagram" id="instagram" value={formData.instagram} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" />
            </div>
            <div>
              <label htmlFor="field" className="block text-sm font-medium text-slate-400 mb-1">Área de Atuação</label>
              <input type="text" name="field" id="field" value={formData.field} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white" required />
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button type="button" onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-500 font-bold py-2 px-4 rounded-md transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={isSaving} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50">
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}