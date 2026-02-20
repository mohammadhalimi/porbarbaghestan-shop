// app/components/products/ProductShare.tsx
'use client';

import { Copy, Check } from 'lucide-react';

interface ProductShareProps {
  onCopyLink: () => void;
  copied: boolean;
  productName: string;
}

export default function ProductShare({ onCopyLink, copied, productName }: ProductShareProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">اشتراک‌گذاری:</span>
        <button
          onClick={onCopyLink}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          title="کپی لینک"
        >
          {copied ? (
            <Check className="w-5 h-5 text-emerald-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(productName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className="text-xl">📱</span>
        </a>
      </div>
    </div>
  );
}