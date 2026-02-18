// app/components/admin/dashboard/sections/BlogSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import blogService, { BlogPost, Tag } from '@/app/services/blog.service';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import Notification from '@/app/components/ui/Notification';
import ConfirmModal from '@/app/components/ui/ConfirmModal';
import BlogFilters from '@/app/components/admin/blog/BlogFilters';
import BlogTable from '@/app/components/admin/blog/BlogTable';
import BlogForm from '@/app/components/admin/blog/BlogForm';


export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [tags, setTags] = useState<Tag[]>([]);
  
  // مودال حذف
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    postId: string | null;
    postTitle: string;
  }>({
    isOpen: false,
    postId: null,
    postTitle: ''
  });

  // نوتیفیکیشن
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ show: false, type: 'success', message: '' });

  // بارگذاری اولیه
  useEffect(() => {
    loadPosts();
    loadTags();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { data } = await blogService.getPosts();
      setPosts(data);
    } catch (err: any) {
      showNotification('error', err.message || 'خطا در بارگذاری مقالات');
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const data = await blogService.getPopularTags();
      setTags(data);
    } catch (err) {
      console.error('Error loading tags:', err);
    }
  };

  // فیلتر مقالات
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.includes(searchTerm) ||
      post.excerpt.includes(searchTerm) ||
      post.tags.some(tag => tag.includes(searchTerm));
    
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // باز کردن مودال حذف
  const openDeleteModal = (post: BlogPost) => {
    setDeleteModal({
      isOpen: true,
      postId: post._id,
      postTitle: post.title
    });
  };

  // اجرای حذف
  const handleDeleteConfirm = async () => {
    if (!deleteModal.postId) return;

    try {
      await blogService.deletePost(deleteModal.postId);
      setPosts(posts.filter(p => p._id !== deleteModal.postId));
      showNotification('success', `مقاله "${deleteModal.postTitle}" با موفقیت حذف شد`);
    } catch (err: any) {
      showNotification('error', err.message || 'خطا در حذف مقاله');
    } finally {
      setDeleteModal({ isOpen: false, postId: null, postTitle: '' });
    }
  };

  // بستن مودال حذف
  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, postId: null, postTitle: '' });
  };

  const handlePostSuccess = (post: BlogPost) => {
    if (editingPost) {
      setPosts(posts.map(p => p._id === post._id ? post : p));
      showNotification('success', 'مقاله با موفقیت ویرایش شد');
    } else {
      setPosts([post, ...posts]);
      showNotification('success', 'مقاله با موفقیت منتشر شد');
    }
    setShowAddForm(false);
    setEditingPost(null);
    loadTags(); // بروزرسانی تگ‌ها
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* نوتیفیکیشن */}
      <Notification
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />

      {/* مودال تایید حذف */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="حذف مقاله"
        message={`آیا از حذف مقاله "${deleteModal.postTitle}" اطمینان دارید؟ این عملیات قابل بازگشت نیست.`}
        confirmText="بله، حذف کن"
        cancelText="انصراف"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* هدر */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت وبلاگ</h1>
          <p className="text-gray-600">مدیریت مقالات و محتوای سایت</p>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setShowAddForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          نوشتن مقاله جدید
        </button>
      </div>

      {/* فیلتر و جستجو */}
      <BlogFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        tags={tags}
        totalCount={filteredPosts.length}
      />

      {/* فرم نوشتن/ویرایش مقاله */}
      {showAddForm && (
        <BlogForm
          post={editingPost}
          onClose={() => {
            setShowAddForm(false);
            setEditingPost(null);
          }}
          onSuccess={handlePostSuccess}
          onError={(message) => showNotification('error', message)}
        />
      )}

      {/* لیست مقالات */}
      <BlogTable
        posts={filteredPosts}
        onEdit={(post) => {
          setEditingPost(post);
          setShowAddForm(true);
        }}
        onDelete={openDeleteModal}
      />
    </div>
  );
}