'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardSection from '../components/dashboard/sections/DashboardSection';
import ProductsSection from '../components/dashboard/sections/ProductsSection';
import BlogSection from '../components/dashboard/sections/BlogSection';
import SettingsSection from '../components/dashboard/sections/SettingsSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AdminProfilePage from '../components/admin/profile/page';

export type AdminSection = 'dashboard' | 'products' | 'blog' | 'settings' | 'profile';

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const router = useRouter();
  const { isAuthenticated, loading, user, logout } = useAuth();

  // بررسی احراز هویت
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin');
    }
  }, [loading, isAuthenticated, router]);

  // نمایش لودینگ
  if (loading) {
    return <LoadingSpinner />;
  }

  // اگر احراز هویت نشده، چیزی نمایش نده
  if (!isAuthenticated) {
    return null;
  }

  // تابع رندر بخش فعال
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'products':
        return <ProductsSection />;
      case 'blog':
        return <BlogSection />;
      case 'settings':
        return <SettingsSection />;
        case 'profile':
          return <AdminProfilePage />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      user={user}
      onLogout={logout}
    >
      {renderSection()}
    </DashboardLayout>
  );
}