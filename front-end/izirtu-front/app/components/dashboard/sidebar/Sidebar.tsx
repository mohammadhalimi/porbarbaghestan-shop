'use client';

import { BarChart3, Package, FileText, Settings, User } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { AdminSection } from '../type/admin';

interface SidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as AdminSection, label: 'داشبورد', icon: BarChart3 },
    { id: 'products' as AdminSection, label: 'محصولات', icon: Package },
    { id: 'blog' as AdminSection, label: 'وبلاگ', icon: FileText },
    { id: 'profile' as AdminSection, label: 'پروفایل', icon: User },
    { id: 'settings' as AdminSection, label: 'تنظیمات', icon: Settings },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white border-l border-gray-200 min-h-[calc(100vh-64px)] sticky top-16">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">منو مدیریت</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              isActive={activeSection === item.id}
              onClick={() => onSectionChange(item.id)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}