import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Apple, Chrome } from 'lucide-react-native'; // Ícones sociais
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay, 
  Easing,
  withSequence
} from 'react-native-reanimated';
import { PhoneMockupFeed } from '../src/components/ui/MockFeed';

const { height, width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  // Valores do Paralaxe de Entrada
  const phoneTranslateY = useSharedValue(height);
  const contentTranslateY = useSharedValue(height);
  const contentOpacity = useSharedValue(0);
  
  // Valor da Transição do Horizonte (Círculo expansivo)
  const horizonScale = useSharedValue(0);
  const horizonOpacity = useSharedValue(0);

  useEffect(() => {
    // Animação de entrada (Paralaxe suave)
    phoneTranslateY.value = withTiming(-60, { duration: 1400, easing: Easing.out(Easing.cubic) });
    contentTranslateY.value = withDelay(300, withTiming(0, { duration: 1200, easing: Easing.out(Easing.cubic) }));
    contentOpacity.value = withDelay(500, withTiming(1, { duration: 1000 }));
  }, []);

  // Quando clica em "Criar Conta"
  const handleCreateAccount = () => {
    // 1. Micro vibração premium
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // 2. O Horizonte se expande (Transição)
    horizonOpacity.value = 1;
    horizonScale.value = withTiming(30, { duration: 800, easing: Easing.inOut(Easing.ease) });

    // 3. Navega para a tela enquanto a tela está coberta pela cor do horizonte
    setTimeout(() => {
      // router.push('/register'); // Descomente quando a tela existir
      console.log('Atravessou o horizonte! Indo para Register');
    }, 700);
  };

  const handleSecondaryPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // router.push('/login');
  };

  return (
    <View className="flex-1 bg-surface-base overflow-hidden">
      
      {/* BACKGROUND: Partículas extremamente sutis (Simulado via CSS) */}
      <View style={StyleSheet.absoluteFillObject} className="opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* BACKGROUND PARALAXE: O Celular */}
      <Animated.View style={[
        { position: 'absolute', top: 80, alignSelf: 'center' }, 
        useAnimatedStyle(() => ({ transform: [{ translateY: phoneTranslateY.value }, { scale: 0.92 }] }))
      ]}>
        <PhoneMockupFeed />
      </Animated.View>

      {/* FOREGROUND: Painel Inferior Premium */}
      <Animated.View style={[
        styles.bottomPanel,
        useAnimatedStyle(() => ({
          transform: [{ translateY: contentTranslateY.value }],
          opacity: contentOpacity.value,
        }))
      ]}>
        
        {/* Textos (Apple / Notion style) */}
        <View className="items-center mb-10 w-full px-4">
          <Text className="text-content-primary font-inter text-[32px] font-extrabold text-center mb-3 tracking-tight">
            Descubra seu próximo horizonte.
          </Text>
          <Text className="text-content-secondary font-inter text-center text-[15px] leading-6 px-2">
            Uma nova forma de se conectar com pessoas, ideias e possibilidades.
          </Text>
        </View>

        {/* Botões Principais */}
        <View className="w-full gap-y-4 px-2">
          
          {/* Botão Primário (Criar Conta) com Gradiente e Glow */}
          <TouchableOpacity activeOpacity={0.8} onPress={handleCreateAccount} className="w-full">
            <LinearGradient
              colors={['#B6192E', '#8A1222']} // Gradiente do app (Sua cor base escurecendo)
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              className="w-full py-[18px] rounded-hz items-center justify-center shadow-lg shadow-red-900/40"
            >
              <Text className="text-white font-inter font-bold text-[17px] tracking-wide">
                Criar conta
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Botão Secundário (Entrar) */}
          <TouchableOpacity 
            activeOpacity={0.6} 
            onPress={handleSecondaryPress}
            className="w-full py-[16px] rounded-hz items-center justify-center border-[1.5px] border-content-secondary/30 bg-surface-base"
          >
            <Text className="text-content-primary font-inter font-semibold text-[17px]">
              Entrar
            </Text>
          </TouchableOpacity>

        </View>

        {/* Opções Sociais (Discretas) */}
        <View className="w-full mt-10 mb-4 items-center">
          <Text className="text-content-secondary/60 font-inter text-xs mb-5 uppercase tracking-widest font-semibold">
            Ou continue com
          </Text>
          
          <View className="flex-row gap-x-6">
            <TouchableOpacity onPress={handleSecondaryPress} className="w-14 h-14 rounded-full border border-content-secondary/20 items-center justify-center bg-surface-elevated">
              <GoogleIcon />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleSecondaryPress} className="w-14 h-14 rounded-full border border-content-secondary/20 items-center justify-center bg-surface-elevated">
              <Apple size={22} color="var(--hz-content-primary)" />
            </TouchableOpacity>
          </View>
        </View>

      </Animated.View>

      {/* TRANSIÇÃO DE TELA: O Horizonte que se expande */}
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
    </View>
  );
}

// Ícone do Google em SVG usando o Lucide (Chrome) como placeholder premium
const GoogleIcon = () => <Chrome size={22} color="var(--hz-content-primary)" />;

const styles = StyleSheet.create({
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'var(--hz-surface-base)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -15 },
    shadowOpacity: 0.04,
    shadowRadius: 25,
    elevation: 20, // Para o Android
  },
  horizonTransition: {
    position: 'absolute',
    alignSelf: 'center',
    top: height / 2, // Nasce do centro da tela
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B6192E', // A cor que vai engolir a tela para ir pro Register
    zIndex: 999,
  }
});