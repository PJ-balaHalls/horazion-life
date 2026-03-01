import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  runOnJS,
  useAnimatedScrollHandler
} from 'react-native-reanimated';

import { PhoneMockupFeed } from '../src/components/ui/MockFeed'; 
import { HeroSection, VisionSection, AccessibilitySection, ContactSection } from '../src/components/welcome/WelcomeSections';

const { width, height } = Dimensions.get('window');
const HZ_BRAND = "#B6192E";
const MAX_SCALE = Math.max(width, height) / 20;

export default function WelcomeScreen() {
  const router = useRouter();
  
  const screenOpacity = useSharedValue(0);
  const screenTranslateY = useSharedValue(20);
  const scrollY = useSharedValue(0);

  const portalScale = useSharedValue(0);
  const portalOpacity = useSharedValue(0);

  useEffect(() => {
    screenOpacity.value = withTiming(1, { duration: 800 });
    screenTranslateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) });
  }, []);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const handleAction = (route: string) => {
    portalOpacity.value = 1;
    portalScale.value = withTiming(MAX_SCALE, { 
      duration: 800, 
      easing: Easing.bezier(0.65, 0, 0.35, 1) 
    }, (finished) => {
      if (finished) {
        runOnJS(router.push)(`/${route}` as any);
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
    transform: [{ translateY: screenTranslateY.value }]
  }));

  const portalStyle = useAnimatedStyle(() => ({
    opacity: portalOpacity.value,
    transform: [{ scale: portalScale.value }]
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Animated.ScrollView 
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={[styles.scroll, animatedStyle]}
      >
        <View style={styles.mockupWrapper}>
          <View style={{ transform: [{ scale: 0.9 }] }}>
            <PhoneMockupFeed />
          </View>
        </View>

        <HeroSection scrollY={scrollY} onAction={(t: any) => handleAction(t || 'login')} />
        <VisionSection />
        <AccessibilitySection />
        <ContactSection /> 
      </Animated.ScrollView>

      <View style={styles.portalContainer} pointerEvents="none">
        <Animated.View style={[styles.portal, portalStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  mockupWrapper: {
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: -40,
    zIndex: 1,
  },
  portalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  portal: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HZ_BRAND,
  }
});