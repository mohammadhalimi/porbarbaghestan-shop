'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag, Eye, Search } from 'lucide-react';
import blogService, { BlogPost } from '@/app/services/blog.service';
import BlogListSkeleton from '@/app/components/ui/skeletons/BlogListSkeleton';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    loadPosts();
    loadTags();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { data } = await blogService.getPosts({ limit: 50 });
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const tags = await blogService.getPopularTags();
      setAllTags(tags);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  // فیلتر مقالات بر اساس جستجو و تگ
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const getCoverImage = (post: BlogPost) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
    if (!post.coverImage) return null;
    if (post.coverImage.startsWith('http')) return post.coverImage;
    if (post.coverImage.startsWith('/')) return `${BASE_URL}${post.coverImage}`;
    return `${BASE_URL}/uploads/blog/${post.coverImage}`;
  };

  if (loading) {
    return <BlogListSkeleton />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="h-20"></div>
      {/* هدر */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">وبلاگ پربار باغستان</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            مقالات تخصصی در زمینه کشاورزی، باغداری و محصولات ارگانیک
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* سایدبار */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* جستجو */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">جستجو</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="جستجوی مقالات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* تگ‌ها */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">برچسب‌ها</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTag === null
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    همه
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag.name}
                      onClick={() => setSelectedTag(tag.name)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTag === tag.name
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag.name} ({tag.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* لیست مقالات */}
          <main className="lg:col-span-3">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">هیچ مقاله‌ای یافت نشد</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map(post => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* تصویر */}
                    <div className="relative h-48 overflow-hidden">
                      {getCoverImage(post) ? (
                        <Image
                          src={getCoverImage(post)!}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-emerald-100 to-teal-50 flex items-center justify-center">
                          <span className="text-4xl">📄</span>
                        </div>
                      )}
                    </div>

                    {/* محتوا */}
                    <div className="p-5">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* متا اطلاعات */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.publishedAt).toLocaleDateString('fa-IR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views}</span>
                        </div>
                      </div>

                      {/* تگ‌ها */}
                      {post.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-3">
                          <Tag className="w-3 h-3 text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}