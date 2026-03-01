import React, { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Image, StatusBar } from 'react-native';
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

// Easing Premium
const PREMIUM_EASE = Easing.bezier(0.16, 1, 0.3, 1);

export default function IntroScreen() {
  const router = useRouter();
  
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.9); 
  const logoTranslateY = useSharedValue(15);
  
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(10);

  const handleAnimationFinish = useCallback(() => {
    // 1. Logo emerge
    logoOpacity.value = withTiming(1, { duration: 1500, easing: PREMIUM_EASE });
    logoScale.value = withTiming(1, { duration: 1500, easing: PREMIUM_EASE });
    logoTranslateY.value = withTiming(0, { duration: 1500, easing: PREMIUM_EASE });
    
    // 2. Texto
    textOpacity.value = withDelay(600, withTiming(1, { duration: 1000 }));
    textTranslateY.value = withDelay(600, withTiming(0, { duration: 1000, easing: PREMIUM_EASE }));

    // 3. Navegação
    setTimeout(() => {
      runOnJS(router.replace)('/welcome');
    }, 4500);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value }, 
      { translateY: logoTranslateY.value }
    ]
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }]
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* BACKGROUND BRANCO E ESTRELAS VERMELHAS */}
      <HorazionGalaxy onAnimationEnd={handleAnimationFinish} />

      <View style={styles.contentContainer}>
        {/* LOGO */}
        <AnimatedImage 
          source={require('../assets/images/logo/life.png')}
          style={[styles.logo, animatedLogoStyle]}
          resizeMode="contain"
        />

        {/* MANIFESTO */}
        <Animated.View style={[styles.textContainer, animatedTextStyle]}>
          <Animated.Text style={styles.word}>CONECTE.</Animated.Text>
          <Animated.Text style={styles.dot}>•</Animated.Text>
          <Animated.Text style={styles.word}>EXPANDA.</Animated.Text>
          <Animated.Text style={styles.dot}>•</Animated.Text>
          <Animated.Text style={[styles.word, styles.brandWord]}>VIVA.</Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Garantia de fundo branco
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logo: { 
    width: width * 0.6, 
    height: 100, 
    marginBottom: 40 
  },
  textContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    bottom: -80,
  },
  word: { 
    fontFamily: 'SpaceMono-Regular', 
    color: '#52525B', // Cinza Zinco (Elegante)
    fontSize: 10, 
    fontWeight: '600', 
    letterSpacing: 2 
  },
  dot: {
    color: '#E4E4E7',
    fontSize: 10,
  },
  brandWord: {
    color: '#B6192E', // Vermelho Horazion
    fontWeight: '700'
  }
});