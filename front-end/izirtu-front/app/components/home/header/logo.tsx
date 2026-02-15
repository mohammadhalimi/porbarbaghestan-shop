import Image from "next/image";
import porbar from '../../../../public/porbar.webp';

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <Image 
            src={porbar}
            alt='logo porbar baghestan'
            width={7}
            height={7}
            className='w-11 h-11 rounded-xl'
          />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white"></div>
      </div>
      <div>
        <h1 className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          پربار باغستان
        </h1>
        <p className="text-xs text-gray-500 font-medium">متخصص کودهای کشاورزی</p>
      </div>
    </div>
  );
}