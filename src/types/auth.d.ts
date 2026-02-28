import { LucideIcon } from "lucide-react-native";
import { TextInputProps } from "react-native";

// Estendemos TextInputProps para herdar tudo (keyboardType, maxLength, etc)
export interface AuthInputProps extends TextInputProps {
  label: string;
  icon: LucideIcon;
  isPassword?: boolean;
  // placeholder, value e onChangeText já existem em TextInputProps
}

export interface SecurityBadgeProps {
  icon: LucideIcon;
  label: string;
}
