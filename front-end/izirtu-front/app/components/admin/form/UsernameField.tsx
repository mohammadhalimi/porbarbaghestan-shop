// app/components/admin/form/UsernameField.tsx
'use client';

import { User } from 'lucide-react';
import { useState } from 'react';

interface UsernameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export default function UsernameField({ value, onChange, disabled }: UsernameFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
        <User className="w-4 h-4" />
        نام کاربری
      </label>
      <div className={`relative transition-all duration-300 ${focused ? 'scale-[1.02]' : ''}`}>
        <input
          type="text"
          name="username"
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 py-3 pr-12 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 ${
            focused
              ? 'border-emerald-300 bg-white shadow-sm'
              : 'border-gray-200 hover:border-emerald-200'
          }`}
          placeholder="admin"
          required
          disabled={disabled}
          dir="rtl"
        />
        <User className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
          focused ? 'text-emerald-500' : 'text-gray-400'
        }`} />
      </div>
    </div>
  );
}