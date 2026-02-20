// app/components/products/ProductsGrid.tsx
'use client';

import { Package } from 'lucide-react';
import { Product } from '@/app/services/product.service';
import ProductCard from './ProductCard';
import { JSX } from 'react';

interface ProductsGridProps {
  products: Product[];
  getProductImage: (product: Product) => string | null;
  getBrandLabel: (brand: string) => string;
  getTypeIcon: (type: string) => JSX.Element;
  getSizeLabel: (size: string) => string;
}

export default function ProductsGrid({
  products,
  getProductImage,
  getBrandLabel,
  getTypeIcon,
  getSizeLabel
}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">محصولی یافت نشد</h3>
        <p className="text-gray-500">با معیارهای انتخاب شده محصولی وجود ندارد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          getProductImage={getProductImage}
          getBrandLabel={getBrandLabel}
          getTypeIcon={getTypeIcon}
          getSizeLabel={getSizeLabel}
        />
      ))}
    </div>
  );
}