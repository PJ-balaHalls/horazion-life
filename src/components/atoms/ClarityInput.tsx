// src/components/atoms/ClarityInput.tsx
import React, { useState } from 'react';
import { TextInputProps, StyleSheet } from 'react-native';
import { Box, Text, useTheme } from '@shopify/restyle';
import { Theme } from '../../theme';
import { TextInput } from 'react-native-gesture-handler';

interface ClarityInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const ClarityInput: React.FC<ClarityInputProps> = ({ label, error, ...props }) => {
  const theme = useTheme<Theme>();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box marginBottom="m" width="100%">
      {label && <Text variant="subText" marginBottom="xs" color={isFocused ? 'horazionRed' : 'gray1'}>{label}</Text>}
      
      <Box
        backgroundColor="gray3"
        borderRadius="m"
        borderWidth={isFocused ? 1 : 0}
        borderColor="horazionRed"
        paddingHorizontal="m"
        height={50}
        justifyContent="center"
      >
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholderTextColor={theme.colors.gray1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </Box>
      
      {error && <Text variant="subText" color="horazionRed" marginTop="xs">{error}</Text>}
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0, // Reset default padding
  },
});