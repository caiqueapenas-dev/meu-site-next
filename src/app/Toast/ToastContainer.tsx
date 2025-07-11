"use client";

import React from 'react';
import { Toast } from '../hooks/useToast';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
    }
  };

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-600 text-white';
      case 'info':
        return 'bg-blue-600 text-white';
      case 'error':
        return 'bg-red-600 text-white';
    }
  };

  return (
    <div className="fixed top-5 right-5 z-[1000] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg font-semibold transform transition-transform duration-300 ease-out ${getToastStyles(toast.type)}`}
          style={{
            animation: 'toast-in 0.5s ease forwards'
          }}
        >
          {getToastIcon(toast.type)}
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => onRemove(toast.id)}
            className="ml-2 hover:opacity-80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      
      <style>{`
        @keyframes toast-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes toast-out {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ToastContainer;