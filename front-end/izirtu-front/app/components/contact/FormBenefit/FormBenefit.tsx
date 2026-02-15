import { FormBenefitProps } from "../type/FormBenefitProps";

export function FormBenefit({ icon: Icon, title, description }: FormBenefitProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-emerald-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}