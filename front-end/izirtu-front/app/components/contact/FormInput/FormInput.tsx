import { FormInputProps } from "../type/FormInputProps";

export function FormInput({ label, type, placeholder }: FormInputProps) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 group-hover:border-emerald-300"
        placeholder={placeholder}
      />
    </div>
  );
}