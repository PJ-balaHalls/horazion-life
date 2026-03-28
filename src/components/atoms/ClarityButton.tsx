// src/components/atoms/ClarityButton.tsx
import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box, Text } from '@shopify/restyle';

interface ClarityButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ClarityButton: React.FC<ClarityButtonProps> = ({ label, onPress, isLoading, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || isLoading} activeOpacity={0.8}>
      <Box
        backgroundColor={disabled ? 'gray2' : 'horazionRed'}
        borderRadius="m"
        height={50}
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="l"
        width="100%"
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text variant="button" color={disabled ? 'gray1' : 'bg'}>
            {label}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};