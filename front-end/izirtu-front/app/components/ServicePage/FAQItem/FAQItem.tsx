import { FAQItemProps } from "../type/FAQItemProps";

export function FAQItem({ faq }: FAQItemProps) {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}