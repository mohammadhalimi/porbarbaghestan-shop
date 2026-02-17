'use client';

import { Search, Filter } from 'lucide-react';
import { Brand, ProductType } from '@/app/services/product.service';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedBrand: string;
  onBrandChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  brands: Brand[];
  types: ProductType[];
  totalCount: number;
}

export default function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  selectedType,
  onTypeChange,
  brands,
  types,
  totalCount
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* جستجو */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجوی محصول..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* فیلتر برند */}
        <div className="relative">
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
          >
            <option value="all">همه برندها</option>
            {brands.map(brand => (
              <option key={brand.value} value={brand.value}>{brand.label}</option>
            ))}
          </select>
        </div>

        {/* فیلتر نوع */}
        <div className="relative">
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
          >
            <option value="all">همه انواع</option>
            {types.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* تعداد کل */}
        <div className="text-sm text-gray-600 flex items-center justify-end">
          {totalCount} محصول یافت شد
        </div>
      </div>
    </div>
  );
}