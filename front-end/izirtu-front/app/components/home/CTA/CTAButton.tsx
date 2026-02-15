import { CTAButtonProps } from "./types/CTAButtonProps";

export default function CTAButton({ icon, text, primary = false }: CTAButtonProps) {
  if (primary) {
    return (
      <button className="group relative px-10 py-5 bg-linear-to-r from-emerald-500 to-teal-400 text-white text-lg font-semibold rounded-2xl overflow-hidden">
        <span className="relative z-10 flex items-center justify-center gap-3">
          {icon}
          {text}
        </span>
        <div className="absolute inset-0 bg-linear-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    );
  }

  return (
    <button className="px-10 py-5 border-2 border-emerald-200 text-emerald-700 text-lg font-semibold rounded-2xl hover:bg-emerald-50 transition-colors">
      <span className="flex items-center justify-center gap-3">
        {icon}
        {text}
      </span>
    </button>
  );
}


