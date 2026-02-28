import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
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

export default function IntroScreen() {
  const router = useRouter();
  
  // Valores da Animação
  const lineWidth = useSharedValue(0);
  const lineOpacity = useSharedValue(1);
  const logoOpacity = useSharedValue(0);
  const logoBlur = useSharedValue(15);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. A linha do Horizonte nasce do centro (0 a 250px)
    lineWidth.value = withTiming(250, { duration: 1500, easing: Easing.out(Easing.cubic) });
    
    // 2. A linha se dissipa enquanto a Logo aparece
    lineOpacity.value = withDelay(1200, withTiming(0, { duration: 800 }));
    logoOpacity.value = withDelay(1400, withTiming(1, { duration: 1500 }));
    logoBlur.value = withDelay(1400, withTiming(0, { duration: 1500 }));
    
    // 3. O subtítulo surge suavemente
    textOpacity.value = withDelay(2200, withTiming(1, { duration: 1000 }));

    // 4. Vai para a tela principal
    setTimeout(() => {
      router.replace('/welcome');
    }, 4500);
  }, []);

  const animatedProps = useAnimatedProps(() => ({ blurRadius: logoBlur.value }));
  
  return (
    <View className="flex-1 bg-surface-base justify-center items-center">
      {/* O Horizonte (Linha de luz) */}
      <Animated.View style={[
        styles.horizonLine,
        useAnimatedStyle(() => ({ width: lineWidth.value, opacity: lineOpacity.value }))
      ]} />

      {/* A Logo */}
      <AnimatedImage 
        source={require('../assets/images/logo/life.png')}
        style={[styles.logo, useAnimatedStyle(() => ({ opacity: logoOpacity.value }))]}
        animatedProps={animatedProps}
      />

      {/* O Subtítulo */}
      <Animated.Text style={[
        styles.subtitle, 
        useAnimatedStyle(() => ({ opacity: textOpacity.value }))
      ]}>
        Conecte. Expanda. Viva.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  horizonLine: {
    height: 1,
    backgroundColor: '#B6192E', // O vermelho "Horazion" atuando como a luz do horizonte
    position: 'absolute',
    shadowColor: '#B6192E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
  },
  subtitle: {
    position: 'absolute',
    bottom: 120,
    fontFamily: 'Inter',
    fontSize: 14,
    color: 'var(--hz-content-second)', // Usando sua variável do NativeWind
    letterSpacing: 2,
    fontWeight: '500',
    textTransform: 'uppercase',
  }
});