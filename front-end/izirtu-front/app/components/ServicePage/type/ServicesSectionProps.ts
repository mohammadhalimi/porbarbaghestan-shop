import { ServiceItem } from "./ServiceItem";

export interface ServicesSectionProps {
  services: ServiceItem[];
  activeService: number;
  onServiceChange: (id: number) => void;
}