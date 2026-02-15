// components/FAQSection.tsx
import { FAQItem } from "./FAQItem/FAQItem";
import { FAQSectionProps } from "./type/FAQSectionProps";

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              سوالات
            </span>
            متداول
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            پاسخ سوالات پرتکرار شما درباره خدمات ما
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}