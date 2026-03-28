// src/components/molecules/SceneContainer.tsx
import React, { useEffect } from 'react';
import { Box } from '@shopify/restyle';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface SceneContainerProps {
  children: React.ReactNode;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({ children }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = 0; // Reset
    opacity.value = withTiming(1, { duration: 500 }); // Fade In suave
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    flex: 1,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Box flex={1} backgroundColor="bg" paddingHorizontal="l" paddingTop="xl">
        {children}
      </Box>
    </Animated.View>
  );
};