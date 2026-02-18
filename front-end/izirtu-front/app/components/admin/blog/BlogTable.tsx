// app/components/admin/blog/BlogTable.tsx
'use client';

import { FileText } from 'lucide-react';
import { BlogPost } from '@/app/services/blog.service';
import BlogRow from './BlogRow';

interface BlogTableProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
}

export default function BlogTable({ posts, onEdit, onDelete }: BlogTableProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">مقاله‌ای یافت نشد</h3>
        <p className="text-gray-500">هنوز مقاله‌ای منتشر نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">مقالات وبلاگ</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">عنوان مقاله</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">تاریخ انتشار</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">تگ‌ها</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">بازدید</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map(post => (
              <BlogRow
                key={post._id}
                post={post}
                onEdit={() => onEdit(post)}
                onDelete={() => onDelete(post)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}