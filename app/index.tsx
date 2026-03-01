import React, { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
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

// Criação segura do componente animado
const AnimatedImage = Animated.createAnimatedComponent(Image);

// Bezier Curve segura (Apple Style)
const PREMIUM_EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

export default function IntroScreen() {
  const router = useRouter();
  
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.85); 
  const logoTranslateY = useSharedValue(20);
  const textOpacity = useSharedValue(0);

  const handleAnimationFinish = useCallback(() => {
    logoOpacity.value = withTiming(1, { duration: 1200, easing: PREMIUM_EASE });
    logoScale.value = withTiming(1, { duration: 1200, easing: PREMIUM_EASE });
    logoTranslateY.value = withTiming(0, { duration: 1200, easing: PREMIUM_EASE });
    
    textOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));

    setTimeout(() => {
      runOnJS(router.replace)('/welcome');
    }, 4000);
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
  }));

  return (
    <View style={styles.container}>
      <HorazionGalaxy onAnimationEnd={handleAnimationFinish} />

      <View style={styles.contentContainer}>
        {/* Logo Seguro: Sem blurRadius animado */}
        <AnimatedImage 
          source={require('../assets/images/logo/life.png')}
          style={[styles.logo, animatedLogoStyle]}
          resizeMode="contain"
        />

        <Animated.View style={[styles.textContainer, animatedTextStyle]}>
          <Animated.Text style={styles.word}>CONECTE.</Animated.Text>
          <Animated.Text style={styles.word}>EXPANDA.</Animated.Text>
          <Animated.Text style={[styles.word, styles.brandWord]}>VIVA.</Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logo: { 
    width: width * 0.55, 
    height: 90, 
    marginBottom: 50 
  },
  textContainer: { 
    flexDirection: 'row', 
    gap: 12,
    position: 'absolute',
    bottom: -60,
  },
  word: { 
    // Se a fonte Inter não estiver carregada, o app não quebra, usa a padrão do sistema
    fontFamily: 'SpaceMono-Regular', 
    color: '#71717A', 
    fontSize: 11, 
    fontWeight: '600', 
    letterSpacing: 3 
  },
  brandWord: {
    color: '#B6192E',
    fontWeight: '700'
  }
});