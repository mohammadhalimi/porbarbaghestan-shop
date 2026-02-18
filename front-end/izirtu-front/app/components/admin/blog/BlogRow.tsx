// app/components/admin/blog/BlogRow.tsx
'use client';

import { useState } from 'react';
import { FileText, Edit, Trash2, Eye, Tag, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { BlogPost } from '@/app/services/blog.service';

interface BlogRowProps {
  post: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BlogRow({ post, onEdit, onDelete }: BlogRowProps) {
  const [imageError, setImageError] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  const getCoverImage = () => {
    if (!post.coverImage || imageError) return null;

    if (post.coverImage.startsWith('http')) return post.coverImage;
    if (post.coverImage.startsWith('/')) return `${BASE_URL}${post.coverImage}`;
    return `${BASE_URL}/uploads/blog/${post.coverImage}`;
  };

  const coverImageUrl = getCoverImage();
  const publishDate = new Date(post.publishedAt).toLocaleDateString('fa-IR');

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {/* تصویر شاخص */}
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shrink-0">
            {coverImageUrl ? (
              <Image
                src={coverImageUrl}
                alt={post.title}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            )}
          </div>

          {/* اطلاعات مقاله */}
          <div>
            <span className="font-medium text-gray-900">{post.title}</span>
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{post.excerpt}</p>
          </div>
        </div>
      </td>

      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-gray-400" />
          <span className="text-sm text-gray-900">{publishDate}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <User className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">{post.author}</span>
        </div>
      </td>

      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1 max-w-xs">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{post.tags.length - 3}</span>
          )}
        </div>
      </td>

      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-900">{post.views.toLocaleString()}</span>
        </div>
      </td>

      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors cursor-pointer"
            title="ویرایش"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}