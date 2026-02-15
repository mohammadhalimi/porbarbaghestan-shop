import { Send } from "lucide-react";

export function SubmitButton() {
  return (
    <button
      type="submit"
      className="group relative w-full px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-400 text-white rounded-2xl font-semibold overflow-hidden hover:shadow-lg hover:shadow-emerald-200 transition-all"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Send className="w-5 h-5" />
        ارسال پیام
      </span>
      <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
}