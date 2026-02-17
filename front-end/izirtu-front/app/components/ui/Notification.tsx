// app/components/ui/Notification.tsx
'use client';

import { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface NotificationProps {
  show: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export default function Notification({ show, type, message, onClose }: NotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgColor = type === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200';
  const textColor = type === 'success' ? 'text-emerald-700' : 'text-red-700';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down`}>
      <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border ${bgColor} min-w-75`}>
        <Icon className={`w-5 h-5 ${textColor} shrink-0`} />
        <p className={`text-sm ${textColor} flex-1`}>{message}</p>
        <button
          onClick={onClose}
          className={`p-1 hover:bg-white/50 rounded-full transition-colors ${textColor}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}