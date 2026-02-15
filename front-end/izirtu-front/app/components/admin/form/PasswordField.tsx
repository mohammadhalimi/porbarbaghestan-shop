// app/components/admin/form/PasswordField.tsx
'use client';

import { Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export default function PasswordField({ 
  value, 
  onChange, 
  disabled, 
  showPassword, 
  onTogglePassword 
}: PasswordFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700 items-center gap-2">
          <Lock className="w-4 h-4" />
          رمز عبور
        </label>
        <button
          type="button"
          className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
          disabled={disabled}
        >
          فراموشی رمز؟
        </button>
      </div>

      <div className={`relative transition-all duration-300 ${focused ? 'scale-[1.02]' : ''}`}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 py-3 pr-12 pl-12 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 ${
            focused
              ? 'border-emerald-300 bg-white shadow-sm'
              : 'border-gray-200 hover:border-emerald-200'
          }`}
          placeholder="••••••••"
          required
          disabled={disabled}
          dir="ltr"
        />
        <Lock className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
          focused ? 'text-emerald-500' : 'text-gray-400'
        }`} />
        
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={disabled}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}