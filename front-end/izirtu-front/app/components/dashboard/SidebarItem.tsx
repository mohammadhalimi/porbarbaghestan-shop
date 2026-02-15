'use client';

import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export default function SidebarItem({ label, icon: Icon, isActive, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-right ${
        isActive
          ? 'bg-emerald-50 text-emerald-600 border-r-4 border-emerald-500'
          : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}