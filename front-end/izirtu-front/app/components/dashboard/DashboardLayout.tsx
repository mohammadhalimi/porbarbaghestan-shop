'use client';

import { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import { AdminSection } from './type/admin';
import { AdminUser } from '@/app/services/auth.service';

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  user: AdminUser | null;
  onLogout: () => Promise<void>;
}

export default function DashboardLayout({
  children,
  activeSection,
  onSectionChange,
  user,
  onLogout
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر */}
      <Header 
        user={user}
        onLogout={onLogout}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex">
        {/* سایدبار موبایل */}
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          user={user}
        />

        {/* سایدبار دسکتاپ */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />

        {/* محتوای اصلی */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}