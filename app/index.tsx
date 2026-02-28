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

const AnimatedImage = Animated.createAnimatedComponent(Image);

// 🔒 THEME FALLBACK: Cor hexadecimal pura para o motor nativo
const HZ_BRAND_COLOR = '#B6192E'; 

export default function IntroScreen() {
  const router = useRouter();
  
  // Controles de Animação
  const lineWidth = useSharedValue(0);
  const lineOpacity = useSharedValue(1);
  const logoOpacity = useSharedValue(0);
  const logoBlur = useSharedValue(10);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    let isMounted = true; // Previne vazamento de memória se a tela for fechada antes

    // 1. A linha do horizonte rasga a tela no centro
    lineWidth.value = withTiming(300, { duration: 1600, easing: Easing.out(Easing.exp) });
    
    // 2. A linha some, a logo e o blur se resolvem
    lineOpacity.value = withDelay(1400, withTiming(0, { duration: 800 }));
    logoOpacity.value = withDelay(1600, withTiming(1, { duration: 1500 }));
    logoBlur.value = withDelay(1600, withTiming(0, { duration: 1500 }));
    
    // 3. Subtítulo Apple-style aparece
    textOpacity.value = withDelay(2400, withTiming(1, { duration: 1200 }));

    // 4. Transição sutil para a Welcome
    const timer = setTimeout(() => {
      if (isMounted) {
        router.replace('/welcome');
      }
    }, 4800);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [router]);

  const animatedProps = useAnimatedProps(() => ({ blurRadius: logoBlur.value }));
  
  return (
    <View className="flex-1 bg-surface-base justify-center items-center">
      
      {/* A Linha de Luz (Horizonte) */}
      <Animated.View style={[
        styles.horizonLine,
        useAnimatedStyle(() => ({ 
          width: lineWidth.value, 
          opacity: lineOpacity.value 
        }))
      ]} />

      {/* A Logo com Blur nativo */}
      <AnimatedImage 
        source={require('../assets/images/logo/life.png')}
        style={[
          styles.logo, 
          useAnimatedStyle(() => ({ opacity: logoOpacity.value }))
        ]}
        animatedProps={animatedProps}
      />

      {/* Subtítulo Premium */}
      <Animated.Text 
        className="absolute bottom-32 font-inter text-content-secondary uppercase text-xs font-medium"
        style={[
          useAnimatedStyle(() => ({ opacity: textOpacity.value })),
          { letterSpacing: 3 } // 🔒 FIX: Usando número inteiro para RCTText, nada de 'em' ou 'px'
        ]}
      >
        Conecte. Expanda. Viva.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  horizonLine: {
    height: 1.5,
    backgroundColor: HZ_BRAND_COLOR,
    position: 'absolute',
    shadowColor: HZ_BRAND_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 10,
  },
  logo: {
    width: 220,
    height: 70,
    resizeMode: 'contain',
    position: 'absolute',
  }
});