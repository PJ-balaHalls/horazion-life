import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
  useAnimatedProps
} from 'react-native-reanimated';
import { HorazionGalaxy } from '../src/components/ui/HorazionGalaxy';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function IntroScreen() {
  const router = useRouter();
  
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.7); 
  const logoTranslateY = useSharedValue(40);
  const logoBlur = useSharedValue(25);

  const word1Opacity = useSharedValue(0);
  const word2Opacity = useSharedValue(0);
  const word3Opacity = useSharedValue(0);

  const handleAnimationFinish = () => {
    // 1. Logo emerge majestosamente do Horizonte
    logoOpacity.value = withTiming(1, { duration: 1800, easing: Easing.out(Easing.cubic) });
    logoScale.value = withTiming(1, { duration: 1800, easing: Easing.out(Easing.cubic) });
    logoTranslateY.value = withTiming(0, { duration: 1800, easing: Easing.out(Easing.cubic) });
    logoBlur.value = withTiming(0, { duration: 1500 });
    
    // 2. Cascata das Palavras
    word1Opacity.value = withDelay(1000, withTiming(1, { duration: 800 }));
    word2Opacity.value = withDelay(1400, withTiming(1, { duration: 800 }));
    word3Opacity.value = withDelay(1800, withTiming(1, { duration: 800 }));

    // 3. Transita para a Welcome de forma suave
    setTimeout(() => {
      router.replace('/welcome');
    }, 4500);
  };

  const animatedProps = useAnimatedProps(() => ({ blurRadius: logoBlur.value }));
  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }, { translateY: logoTranslateY.value }]
  }));

  return (
    <View className="flex-1 bg-white justify-center items-center">
      
      {/* O fundo estelar com as Constelações e Horizonte */}
      <HorazionGalaxy onAnimationEnd={handleAnimationFinish} />

      {/* A Logo */}
      <AnimatedImage 
        source={require('../assets/images/logo/life.png')}
        style={[styles.logo, animatedLogoStyle]}
        animatedProps={animatedProps}
      />

      {/* Texto em Cascata Seguro (sem letterSpacing via CSS var) */}
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.word, useAnimatedStyle(() => ({ opacity: word1Opacity.value }))]}>
          CONECTE. 
        </Animated.Text>
        <Animated.Text style={[styles.word, useAnimatedStyle(() => ({ opacity: word2Opacity.value }))]}>
          EXPANDA. 
        </Animated.Text>
        <Animated.Text style={[styles.word, { color: '#B6192E' }, useAnimatedStyle(() => ({ opacity: word3Opacity.value }))]}>
          VIVA.
        </Animated.Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  logo: { width: 260, height: 90, resizeMode: 'contain', position: 'absolute' },
  textContainer: { position: 'absolute', bottom: 120, flexDirection: 'row', gap: 8 },
  word: { fontFamily: 'Inter', color: '#71717A', fontSize: 12, fontWeight: '700', letterSpacing: 3 }
});