import { MapPin } from "lucide-react";

export function AddressInfo() {
  return (
    <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
      <div className="flex items-center gap-3">
        <MapPin className="w-5 h-5 text-emerald-600" />
        <div>
          <p className="font-medium text-gray-900">تهران، خیابان ولیعصر، پلاک ۱۲۳۴</p>
          <p className="text-sm text-gray-600">طبقه سوم، واحد ۵ - دفتر مرکزی</p>
        </div>
      </div>
    </div>
  );
}