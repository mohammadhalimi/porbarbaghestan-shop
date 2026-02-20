// app/components/products/ProductSizes.tsx
'use client';

import { Product } from '@/app/services/product.service';

interface ProductSizesProps {
  sizes: Product['sizes'];
  getSizeLabel: (size: string) => string;
}

export default function ProductSizes({ sizes, getSizeLabel }: ProductSizesProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">سایزها و موجودی</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {sizes.map((size, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border-2 transition-all ${
              size.stock > 0
                ? 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400'
                : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
          >
            <div className="text-center">
              <div className="font-bold text-gray-900 mb-2">
                {getSizeLabel(size.size)}
              </div>
              {size.stock > 0 ? (
                <>
                  <div className="text-emerald-600 font-semibold text-sm mb-1">
                    {size.stock} عدد
                  </div>
                  <div className="text-xs text-emerald-500">موجود</div>
                </>
              ) : (
                <div className="text-red-500 text-sm">ناموجود</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}