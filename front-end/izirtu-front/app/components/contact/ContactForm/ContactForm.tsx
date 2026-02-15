import { FormInput } from "../FormInput/FormInput";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { ContactFormProps } from "../type/ContactFormProps";

export function ContactForm({ onSubmit }: ContactFormProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">فرم تماس</h3>
        <p className="text-gray-600">لطفاً اطلاعات خود را وارد کنید</p>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            label="نام و نام خانوادگی"
            type="text"
            placeholder="نام خود را وارد کنید"
          />
          <FormInput
            label="شماره تماس"
            type="tel"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          />
        </div>

        <FormInput
          label="ایمیل"
          type="email"
          placeholder="email@example.com"
        />

        <FormInput
          label="موضوع"
          type="text"
          placeholder="مشاوره کود دهی"
        />

        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-2">پیام شما</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 group-hover:border-emerald-300 resize-none"
            placeholder="پیام خود را اینجا بنویسید..."
          ></textarea>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}