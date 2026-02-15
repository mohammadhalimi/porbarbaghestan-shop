import { NavItemType } from "./NavItemType";

export interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItemType[];
  onClose: () => void;
}