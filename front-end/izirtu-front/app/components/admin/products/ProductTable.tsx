// app/components/admin/products/ProductTable.tsx
'use client';

import { Package } from 'lucide-react';
import { Product } from '@/app/services/product.service';
import ProductRow from './ProductRow';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;  // تغییر: حالا کل product رو می‌گیره
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">محصولی یافت نشد</h3>
        <p className="text-gray-500">هنوز محصولی اضافه نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">لیست محصولات</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">تصویر</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">نام محصول</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">برند</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">نوع</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">سایزها</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <ProductRow
                key={product._id}
                product={product}
                onEdit={() => onEdit(product)}
                onDelete={() => onDelete(product)}  // تغییر: کل product رو پاس میده
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}