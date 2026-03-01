import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, StatusBar, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { HorazionGalaxy } from '../src/components/ui/HorazionGalaxy';

const { width } = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);
const PREMIUM_EASE = Easing.bezier(0.16, 1, 0.3, 1);

export default function IntroScreen() {
  const router = useRouter();
  
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.9); 
  const logoTranslateY = useSharedValue(20);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Animação Visual
    logoOpacity.value = withTiming(1, { duration: 1200, easing: PREMIUM_EASE });
    logoScale.value = withTiming(1, { duration: 1200, easing: PREMIUM_EASE });
    logoTranslateY.value = withTiming(0, { duration: 1200, easing: PREMIUM_EASE });
    textOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));

    // 2. Navegação Segura (3.5 segundos)
    const timer = setTimeout(() => {
      console.log("[Intro] Navegando para Welcome...");
      router.replace('/welcome');
    }, 3500); 

    return () => clearTimeout(timer);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }, { translateY: logoTranslateY.value }]
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Galaxy Visual Puro */}
      <HorazionGalaxy />

      <View style={styles.contentContainer}>
        <AnimatedImage 
          source={require('../assets/images/logo/life.png')}
          style={[styles.logo, animatedLogoStyle]}
          resizeMode="contain"
        />
        <Animated.View style={[styles.textContainer, animatedTextStyle]}>
          <Text style={styles.word}>CONECTE</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.word}>EXPANDA</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={[styles.word, styles.brandWord]}>VIVA</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  contentContainer: { alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  logo: { width: width * 0.6, height: 100, marginBottom: 40 },
  textContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, position: 'absolute', bottom: -80 },
  word: { fontFamily: 'SpaceMono-Regular', color: '#52525B', fontSize: 10, fontWeight: '600', letterSpacing: 2 },
  dot: { color: '#E4E4E7', fontSize: 10 },
  brandWord: { color: '#B6192E', fontWeight: '700' }
});