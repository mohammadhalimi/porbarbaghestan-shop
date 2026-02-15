// app/admin/login/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import LoginForm from '@/app/components/admin/LoginForm';
import LoginBackground from '@/app/components/admin/LoginBackground';
import LoginHeader from '@/app/components/admin/LoginHeader';
import LoginFooter from '@/app/components/admin/form/LoginFooter';
import BackToSite from '@/app/components/admin/BackToSite';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // ریدایرکت به داشبورد در صورت احراز هویت
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // اگر در حال ریدایرکت هستیم، چیزی نمایش نده
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-emerald-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      <LoginBackground />
      <BackToSite />
      
      <div className="relative w-full max-w-md z-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
          <LoginHeader />
          <LoginForm onLogin={login} />
          <LoginFooter />
        </div>
      </div>
    </div>
  );
}