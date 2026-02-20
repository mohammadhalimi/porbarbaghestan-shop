'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Tag, Eye, ArrowRight, Package } from 'lucide-react';
import BlogPostSkeleton from '@/app/components/ui/skeletons/BlogPostSkeleton';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/blog/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'خطا در بارگذاری مقاله');
      }

      setPost(data.data);
    } catch (error: any) {
      setError(error.message || 'خطا در بارگذاری مقاله');
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCoverImage = () => {
    if (!post?.coverImage) return null;
    if (post.coverImage.startsWith('http')) return post.coverImage;
    if (post.coverImage.startsWith('/')) return `${BASE_URL}${post.coverImage}`;
    return `${BASE_URL}/uploads/blog/${post.coverImage}`;
  };

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error || 'مقاله یافت نشد'}</p>
          <button
            onClick={() => router.push('/blog')}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            بازگشت به وبلاگ
          </button>
        </div>
      </div>
    );
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* هدر با تصویر پس‌زمینه */}
      <div className="relative h-96 overflow-hidden">
        {getCoverImage() ? (
          <Image
            src={getCoverImage()!}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-linear-to-r from-emerald-600 to-teal-500" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به وبلاگ
            </button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{post.views.toLocaleString()} بازدید</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* محتوای مقاله */}
          <article className="lg:col-span-3">
            {/* خلاصه */}
            <div className="bg-emerald-50 border-r-4 border-emerald-500 p-6 mb-8 rounded-lg">
              <p className="text-gray-700 text-lg italic">{post.excerpt}</p>
            </div>

            {/* محتوای اصلی */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
            />

            {/* لینک‌های داخلی به محصولات */}
            {post.internalLinks && post.internalLinks.length > 0 && (
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  محصولات مرتبط
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.internalLinks.map((link: any, index: number) => (
                    <Link
                      key={index}
                      href={`/products/${link.productId}`}
                      className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {link.anchorText}
                      </span>
                      <ArrowRight className="w-4 h-4 text-emerald-500" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* سایدبار */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* تگ‌ها */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    برچسب‌ها
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* اطلاعات مقاله */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">اطلاعات مقاله</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📅 تاریخ انتشار: {publishDate}</p>
                  <p>✍️ نویسنده: {post.author}</p>
                  <p>👁️ تعداد بازدید: {post.views.toLocaleString()}</p>
                  <p>📝 آخرین بروزرسانی: {new Date(post.updatedAt).toLocaleDateString('fa-IR')}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}