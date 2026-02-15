import { FloatingCardProps } from "./type/FloatingCardProps";

export default function FloatingCard({ position, icon, title, subtitle, rotate, colored = false }: FloatingCardProps) {
  const bgClass = colored 
    ? 'bg-gradient-to-br from-amber-400 to-orange-300' 
    : 'bg-white/90 backdrop-blur-sm';
  const textClass = colored ? 'text-white' : 'text-gray-800';

  return (
    <div className={`absolute ${position} w-24 h-24 ${bgClass} rounded-2xl p-4 shadow-2xl ${rotate}`}>
      <div className={`w-12 h-12 ${colored ? 'bg-white/20 backdrop-blur-sm' : 'bg-linear-to-r from-emerald-400 to-teal-300'} rounded-xl flex items-center justify-center mx-auto mb-2`}>
        {icon}
      </div>
      <div className={`text-center ${textClass}`}>
        <div className="font-bold">{title}</div>
        <div className={`text-xs ${colored ? 'opacity-90' : 'text-gray-500'}`}>{subtitle}</div>
      </div>
    </div>
  );
}

