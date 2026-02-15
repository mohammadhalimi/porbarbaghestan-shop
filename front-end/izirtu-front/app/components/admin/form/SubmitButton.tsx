import { LogIn } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
}

export default function SubmitButton({ isLoading }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden cursor-pointer ${
        isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-linear-to-r from-emerald-500 to-teal-400 hover:shadow-lg hover:shadow-emerald-200 hover:scale-[1.02] text-white'
      }`}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            در حال ورود...
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            ورود به پنل
          </>
        )}
      </span>
      {!isLoading && (
        <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </button>
  );
}