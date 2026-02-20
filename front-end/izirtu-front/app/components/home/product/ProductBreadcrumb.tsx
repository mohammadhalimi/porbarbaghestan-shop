// app/components/products/ProductBreadcrumb.tsx
'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface ProductBreadcrumbProps {
  productName: string;
}

export default function ProductBreadcrumb({ productName }: ProductBreadcrumbProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            خانه
          </Link>
          <ChevronLeft className="w-4 h-4" />
          <Link href="/products" className="hover:text-emerald-600 transition-colors">
            محصولات
          </Link>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{productName}</span>
        </div>
      </div>
    </div>
  );
}