// app/components/admin/blog/BlogFilters.tsx
'use client';

import { Search, Filter } from 'lucide-react';
import { Tag } from '@/app/services/blog.service';

interface BlogFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTag: string;
  onTagChange: (value: string) => void;
  tags: Tag[];
  totalCount: number;
}

export default function BlogFilters({
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagChange,
  tags,
  totalCount
}: BlogFiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* جستجو */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجوی مقاله..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* فیلتر تگ */}
        <div className="relative">
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
          >
            <option value="all">همه تگ‌ها</option>
            {tags.map(tag => (
              <option key={tag.name} value={tag.name}>
                {tag.name} ({tag.count})
              </option>
            ))}
          </select>
        </div>

        {/* تعداد کل */}
        <div className="text-sm text-gray-600 flex items-center justify-end">
          {totalCount} مقاله یافت شد
        </div>
      </div>
    </div>
  );
}