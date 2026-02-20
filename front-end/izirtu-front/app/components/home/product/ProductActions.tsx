// app/components/products/ProductActions.tsx
'use client';

import { Phone, MessageCircle, Info } from 'lucide-react';

interface ProductActionsProps {
  productName: string;
}

export default function ProductActions({ productName }: ProductActionsProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-500" />
          <span className="text-sm text-gray-700">برای استعلام قیمت و سفارش:</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="tel:09107838556"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium"
        >
          <Phone className="w-5 h-5" />
          تماس با فروشنده
        </a>

        <a
          href={`https://wa.me/989107838556?text=${encodeURIComponent(`سلام، درباره محصول ${productName} سوال دارم`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
        >
          <MessageCircle className="w-5 h-5" />
          واتساپ
        </a>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        پاسخگویی ۲۴ ساعته، ۷ روز هفته
      </p>
    </div>
  );
}