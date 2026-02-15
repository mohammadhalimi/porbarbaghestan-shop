import { Shield } from 'lucide-react';

export default function LoginHeader() {
  return (
    <div className="text-center mb-10">
      <div className="relative inline-block mb-6">
        <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -inset-4 border-2 border-emerald-200 rounded-3xl animate-ping opacity-30"></div>
        <div className="absolute -inset-2 border border-emerald-100 rounded-2xl"></div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          پنل مدیریت
        </span>
      </h1>
      <p className="text-gray-600">ورود به سیستم مدیریت پربار باغستان</p>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
        دسترسی محدود به مدیران سیستم
      </div>
    </div>
  );
}