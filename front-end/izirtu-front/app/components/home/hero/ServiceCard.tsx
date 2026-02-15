import { Droplets } from "lucide-react";

export default function ServiceCard() {
  return (
    <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl w-64">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
          <Droplets className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">آنالیز خاک رایگان</h3>
          <p className="text-sm text-gray-500">اولین جلسه مشاوره</p>
        </div>
      </div>
    </div>
  );
}