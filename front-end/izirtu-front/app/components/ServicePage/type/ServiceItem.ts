export interface ServiceItem {
  id: number;
  Icon: any;
  title: string;
  description: string;
  gradient: string;
  details: string[];
  features: string[];
  imageUrl: string; // اضافه کردن فیلد تصویر
  imageAlt: string; // توضیح تصویر
}