// app/admin/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import ProfileHeader from '@/app/components/admin/profile/ProfileHeader';
import ProfileTabs from '@/app/components/admin/profile/ProfileTabs';
import GeneralInfoTab from '@/app/components/admin/profile/tabs/GeneralInfoTab';
import SecurityTab from '@/app/components/admin/profile/tabs/SecurityTab';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import profileService from '@/app/services/profile.service';
import { AdminUser } from '@/app/services/auth.service';

export default function AdminProfilePage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [profile, setProfile] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !profile) {
    return null;
  }

  const tabs = [
    { id: 'general', label: 'اطلاعات عمومی', icon: '👤' },
    { id: 'security', label: 'امنیت', icon: '🔒' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* خطا */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* هدر پروفایل */}
        <ProfileHeader profile={profile} />

        {/* تب‌ها */}
        <ProfileTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* محتوای تب‌ها */}
        <div className="mt-6">
          {activeTab === 'general' ? (
            <GeneralInfoTab 
              profile={profile} 
              onUpdate={setProfile} 
            />
          ) : (
            <SecurityTab />
          )}
        </div>
      </div>
    </div>
  );
}