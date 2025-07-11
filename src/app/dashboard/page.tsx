// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditLeadModal from './EditLeadModal';
import { Lead } from '../types';
import { useToast } from '../hooks/useToast'; // [!code ++]
import ToastContainer from '../Toast/ToastContainer'; // [!code ++]

export default function DashboardPage() {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast(); // [!code ++]
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Falha ao buscar os dados.');
      }
      const data = await response.json();
      setLeads(data);
    } catch (err) { // [!code ++]
    const message = err instanceof Error ? err.message : String(err); // [!code ++]
    setError(message); // [!code ++]
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este lead? Isso também removerá TODOS os orçamentos associados a este e-mail.')) {
        return;
    }

    try {
        const response = await fetch(`/api/leads/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Falha ao deletar o lead.');
        }
        
        setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
        showToast('Lead excluído com sucesso!', 'success'); // [!code ++]

    } catch (err: any) {
        showToast(`Erro: ${err.message}`, 'error'); // [!code ++]
    }
  };

  const handleOpenEditModal = (lead: Lead) => {
    setCurrentLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentLead(null);
  };

  const handleSaveLead = async (updatedLead: Lead) => {
    try {
        const response = await fetch(`/api/leads/${updatedLead.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedLead),
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Falha ao salvar o lead.');
        }

        setLeads(prevLeads => prevLeads.map(lead => 
            lead.id === updatedLead.id ? updatedLead : lead
        ));
        
        showToast('Lead atualizado com sucesso!', 'success'); // [!code ++]
        handleCloseModal();

    } catch (err: any) {
        showToast(`Erro: ${err.message}`, 'error'); // [!code ++]
    }
  };

  if (isLoading) {
    return <div className="text-center text-white p-10">Carregando leads...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">Erro: {error}</div>;
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="bg-slate-900 min-h-screen p-8 text-slate-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard de Leads</h1>
            <button
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors"
            >
                Sair
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="text-center bg-slate-800 p-10 rounded-lg">
              <p>Nenhum lead encontrado.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {leads.map((lead) => {
                const budgets = lead.all_budgets ? lead.all_budgets.split('|||') : [];
                const dates = lead.all_dates ? lead.all_dates.split('|||') : [];

                return (
                  <div key={lead.id} className="bg-slate-800 p-6 rounded-lg shadow-md transition-all hover:ring-2 hover:ring-blue-500">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-4 mb-4">
                      <h2 className="text-xl font-semibold text-white">{lead.name}</h2>
                      <span className="text-sm text-slate-400">{lead.email}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-slate-400 mb-4">
                      <p><strong className="font-semibold text-slate-500">Telefone:</strong> {lead.phone}</p>
                      <p><strong className="font-semibold text-slate-500">Instagram:</strong> {lead.instagram || 'N/A'}</p>
                      <p><strong className="font-semibold text-slate-500">Área:</strong> {lead.field}</p>
                    </div>

                    {budgets.length > 0 ? (
                      <details className="mt-4">
                        <summary className="cursor-pointer font-semibold text-blue-400 hover:text-blue-300">
                          Ver Histórico de Orçamentos ({budgets.length})
                        </summary>
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-slate-700">
                          {budgets.map((budget, index) => (
                            <div key={index} className="bg-slate-900 p-4 rounded-md">
                              <p className="text-xs text-slate-500 font-semibold mb-2">
                                Enviado em: {new Date(dates[index]).toLocaleString('pt-BR')}
                              </p>
                              <pre className="whitespace-pre-wrap text-sm font-mono text-slate-300">{budget}</pre>
                            </div>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <p className="mt-4 text-sm text-slate-500 italic">Este lead ainda não finalizou um orçamento.</p>
                    )}
                    
                    <div className="flex gap-4 justify-end mt-6">
                        <button 
                          onClick={() => handleOpenEditModal(lead)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors"
                        >
                          Excluir
                        </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <EditLeadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          lead={currentLead}
          onSave={handleSaveLead}
        />
      </div>
    </>
  );
}