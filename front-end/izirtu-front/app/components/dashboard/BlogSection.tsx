// app/components/admin/dashboard/sections/BlogSection.tsx
'use client';

import { useState } from 'react';
import { 
  FileText, Plus, Edit, Trash2, Eye, 
  Tag, Calendar, User, Image as ImageIcon,
  Search, Filter, X, Save, CheckCircle
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  status: 'منتشر شده' | 'پیش‌نویس';
  tags: string[];
  author: string;
  views: number;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([
    { 
      id: 1, 
      title: 'راهنمای کشاورزی مدرن در ایران', 
      content: 'محتوا...', 
      excerpt: 'در این مقاله به بررسی روش‌های مدرن کشاورزی...',
      date: '۱۴۰۲/۱۱/۲۰', 
      status: 'منتشر شده',
      tags: ['کشاورزی', 'مدرن'],
      author: 'ادمین',
      views: 245
    },
    { 
      id: 2, 
      title: '۱۰ کود طبیعی برای باغ‌های ارگانیک', 
      content: 'محتوا...', 
      excerpt: 'بهترین کودهای طبیعی برای باغ شما...',
      date: '۱۴۰۲/۱۱/۱۸', 
      status: 'منتشر شده',
      tags: ['کود', 'ارگانیک'],
      author: 'ادمین',
      views: 189
    },
    { 
      id: 3, 
      title: 'مقابله با آفات گیاهی به روش سنتی', 
      content: 'محتوا...', 
      excerpt: 'روش‌های سنتی مقابله با آفات...',
      date: '۱۴۰۲/۱۱/۱۵', 
      status: 'پیش‌نویس',
      tags: ['آفات', 'گیاهی'],
      author: 'ادمین',
      views: 0
    },
    { 
      id: 4, 
      title: 'بهترین زمان کاشت محصولات پاییزی', 
      content: 'محتوا...', 
      excerpt: 'زمان مناسب کاشت محصولات پاییزی...',
      date: '۱۴۰۲/۱۱/۱۲', 
      status: 'منتشر شده',
      tags: ['کاشت', 'پاییز'],
      author: 'ادمین',
      views: 312
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('همه');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
  });

  const statuses = ['همه', 'منتشر شده', 'پیش‌نویس'];

  // فیلتر پست‌ها
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.includes(searchTerm) || 
                         post.excerpt.includes(searchTerm) ||
                         post.tags.some(tag => tag.includes(searchTerm));
    const matchesStatus = selectedStatus === 'همه' || post.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const post: BlogPost = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt || newPost.title,
        date: new Date().toLocaleDateString('fa-IR'),
        status: 'پیش‌نویس',
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        author: 'ادمین',
        views: 0,
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', excerpt: '', tags: '' });
      setShowAddForm(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags.join(', '),
    });
    setShowAddForm(true);
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost && newPost.title && newPost.content) {
      const updatedPosts = posts.map(p => 
        p.id === editingPost.id 
          ? { 
              ...p, 
              title: newPost.title,
              content: newPost.content,
              excerpt: newPost.excerpt || newPost.title,
              tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            }
          : p
      );
      setPosts(updatedPosts);
      setEditingPost(null);
      setNewPost({ title: '', content: '', excerpt: '', tags: '' });
      setShowAddForm(false);
    }
  };

  const handleDeletePost = (id: number) => {
    if (confirm('آیا از حذف این مقاله اطمینان دارید؟')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handlePublishPost = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, status: 'منتشر شده' as const }
        : post
    ));
  };

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت وبلاگ</h1>
          <p className="text-gray-600">نوشتن و مدیریت مقالات وبلاگ</p>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setNewPost({ title: '', content: '', excerpt: '', tags: '' });
            setShowAddForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          نوشتن مقاله جدید
        </button>
      </div>

      {/* فیلتر و جستجو */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی مقاله..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-600 flex items-center justify-end">
            {filteredPosts.length} مقاله یافت شد
          </div>
        </div>
      </div>

      {/* فرم نوشتن مقاله */}
      {showAddForm && (
        <PostForm
          post={newPost}
          setPost={setNewPost}
          onSubmit={editingPost ? handleUpdatePost : handleAddPost}
          onCancel={() => {
            setShowAddForm(false);
            setEditingPost(null);
            setNewPost({ title: '', content: '', excerpt: '', tags: '' });
          }}
          isEditing={!!editingPost}
        />
      )}

      {/* لیست مقالات */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">مقالات وبلاگ</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">عنوان مقاله</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">تاریخ</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">وضعیت</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">بازدید</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map(post => (
                <PostRow
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  onPublish={handlePublishPost}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// کامپوننت فرم مقاله
interface PostFormProps {
  post: any;
  setPost: (post: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

function PostForm({ post, setPost, onSubmit, onCancel, isEditing }: PostFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        {isEditing ? 'ویرایش مقاله' : 'نوشتن مقاله جدید'}
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عنوان مقاله
          </label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="عنوان مقاله را وارد کنید"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            خلاصه مقاله
          </label>
          <textarea
            value={post.excerpt}
            onChange={(e) => setPost({...post, excerpt: e.target.value})}
            rows={2}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            placeholder="خلاصه‌ای از مقاله (حداکثر ۲۰۰ کاراکتر)"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            محتوای مقاله
          </label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({...post, content: e.target.value})}
            rows={8}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            placeholder="متن مقاله را اینجا بنویسید..."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            برچسب‌ها
          </label>
          <input
            type="text"
            value={post.tags}
            onChange={(e) => setPost({...post, tags: e.target.value})}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="کشاورزی, کود, باغداری"
          />
          <p className="text-xs text-gray-500 mt-1">برچسب‌ها را با کاما از هم جدا کنید</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تصویر شاخص
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-300 transition-colors">
            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">برای آپلود تصویر کلیک کنید</p>
            <p className="text-xs text-gray-500">توصیه می‌شود تصویر با ابعاد 1200x630 پیکسل</p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>
        
        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'بروزرسانی مقاله' : 'ذخیره به عنوان پیش‌نویس'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}

// کامپوننت ردیف مقاله
interface PostRowProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
}

function PostRow({ post, onEdit, onDelete, onPublish }: PostRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <span className="font-medium text-gray-900">{post.title}</span>
            <p className="text-xs text-gray-500 mt-1">{post.excerpt}</p>
            <div className="flex items-center gap-2 mt-1">
              <Tag className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{post.tags.join(', ')}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-gray-400" />
          <span className="text-sm text-gray-900">{post.date}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <User className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">{post.author}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          post.status === 'منتشر شده' 
            ? 'bg-emerald-100 text-emerald-600' 
            : 'bg-amber-100 text-amber-600'
        }`}>
          {post.status}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm text-gray-900">{post.views.toLocaleString()}</span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(post)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
            title="ویرایش"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          {post.status === 'پیش‌نویس' && (
            <button
              onClick={() => onPublish(post.id)}
              className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"
              title="انتشار"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={() => onDelete(post.id)}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}