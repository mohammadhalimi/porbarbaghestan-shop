import { Fertilizer } from "./Fertilizer";

export interface TabButtonProps {
  fertilizer: Fertilizer;
  isActive: boolean;
  onClick: (id: string) => void;
}