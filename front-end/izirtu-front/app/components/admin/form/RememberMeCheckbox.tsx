import { Key, CheckCircle } from 'lucide-react';

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled: boolean;
}

export default function RememberMeCheckbox({ checked, onChange, disabled }: RememberMeCheckboxProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
            disabled={disabled}
          />
          <div className={`w-5 h-5 rounded-md border-2 transition-all duration-300 group-hover:border-emerald-300 ${
            checked
              ? 'bg-emerald-500 border-emerald-500'
              : 'bg-white border-gray-300'
          }`}>
            {checked && (
              <CheckCircle className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
        <span className="text-sm text-gray-700 select-none">مرا به خاطر بسپار</span>
      </label>

      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Key className="w-3 h-3" />
        امنیت بالا
      </div>
    </div>
  );
}