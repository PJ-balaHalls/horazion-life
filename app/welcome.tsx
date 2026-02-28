import React, { useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { HeroSection, VisionSection, AccessibilitySection, ContactSection } from '../src/components/welcome/WelcomeSections';

const { height } = Dimensions.get('window');
const HZ_BRAND_COLOR = '#B6192E';

export default function WelcomeScreen() {
  const router = useRouter();
  const scrollY = useSharedValue(0);
  
  const screenOpacity = useSharedValue(0);
  const horizonScale = useSharedValue(0);
  const horizonOpacity = useSharedValue(0);

  useEffect(() => {
    screenOpacity.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.cubic) });
  }, []);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const handleAction = (actionType: 'register' | 'login') => {
    horizonOpacity.value = 1;
    horizonScale.value = withTiming(60, { duration: 900, easing: Easing.inOut(Easing.ease) });
    
    setTimeout(() => {
      // router.push(`/${actionType}`); 
      console.log(`Iniciando transição para: ${actionType}`);
    }, 800);
  };

  return (
    <Animated.View style={[{ flex: 1, backgroundColor: '#FFFFFF' }, useAnimatedStyle(() => ({ opacity: screenOpacity.value }))]}>
      
      <Animated.ScrollView 
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}
        className="flex-1"
      >
        <HeroSection scrollY={scrollY} onAction={handleAction} />
        <VisionSection />
        <AccessibilitySection />
        <ContactSection />
      </Animated.ScrollView>

      {/* OVERLAY DE TRANSIÇÃO (Atravessar o Horizonte Vermelho) */}
      <Animated.View 
        pointerEvents="none"
        style={[
          styles.horizonTransition, 
          useAnimatedStyle(() => ({ 
            opacity: horizonOpacity.value, 
            transform: [{ scale: horizonScale.value }] 
          }))
        ]} 
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  horizonTransition: {
    position: 'absolute',
    alignSelf: 'center',
    top: height / 2,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: HZ_BRAND_COLOR,
    zIndex: 9999,
  }
});