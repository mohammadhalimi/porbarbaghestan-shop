import { CheckCircle } from "lucide-react";

export default function Benefits() {
  const benefits: string[] = [
    'مشاوره کاملاً رایگان',
    'پاسخگویی ۲۴ ساعته',
    'تضمین افزایش عملکرد'
  ];

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
      {benefits.map((benefit: string, index: number) => (
        <div key={index} className="flex items-center justify-center gap-3 text-gray-600">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span>{benefit}</span>
        </div>
      ))}
    </div>
  );
}