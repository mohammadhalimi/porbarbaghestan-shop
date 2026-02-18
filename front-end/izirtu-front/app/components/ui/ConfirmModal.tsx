'use client';

import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'بله، حذف شود',
  cancelText = 'انصراف',
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* اوورلی */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onCancel}
      />
      
      {/* مودال */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-slide-down">
          {/* دکمه بستن */}
          <button
            onClick={onCancel}
            className="absolute left-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* آیکون */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          {/* عنوان */}
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h3>

          {/* پیام */}
          <p className="text-gray-600 text-center mb-6">
            {message}
          </p>

          {/* دکمه‌ها */}
          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
            >
              {confirmText}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}