import { Eye, EyeOff, LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: LucideIcon;
  isPassword?: boolean;
}

const HZ_RED = "#B6192E";
const GRAY_BORDER = "#E5E7EB";

export const ModernInput = ({
  label,
  icon: Icon,
  isPassword,
  ...props
}: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const focusProgress = useSharedValue(0);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focusProgress.value = withTiming(1);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    focusProgress.value = withTiming(0);
    if (props.onBlur) props.onBlur(e);
  };

  const containerStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focusProgress.value,
      [0, 1],
      [GRAY_BORDER, HZ_RED],
    ),
    backgroundColor: interpolateColor(
      focusProgress.value,
      [0, 1],
      ["#FAFAFA", "#FFFFFF"],
    ),
  }));

  return (
    <View className="mb-4">
      <Text className="text-[10px] font-semibold text-gray-400 mb-1.5 ml-1 uppercase tracking-widest">
        {label}
      </Text>

      <Animated.View
        style={containerStyle}
        className="flex-row items-center h-12 rounded-xl px-3 border border-gray-200"
      >
        {Icon && (
          <Icon
            size={18}
            color={isFocused ? HZ_RED : "#9CA3AF"}
            strokeWidth={1.5}
          />
        )}

        <TextInput
          className="flex-1 ml-3 text-sm text-gray-800 font-medium"
          placeholderTextColor="#D1D5DB"
          cursorColor={HZ_RED}
          autoCapitalize="none"
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !showPassword}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="p-2"
          >
            {showPassword ? (
              <EyeOff size={16} color="#9CA3AF" />
            ) : (
              <Eye size={16} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};
