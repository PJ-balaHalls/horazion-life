import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay, 
  Easing 
} from 'react-native-reanimated';
import { PhoneMockupFeed } from '../src/components/ui/MockFeed'; // Importando o seu Mockup!
import { LoadingStar } from '../src/components/ui/LoadingStar';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  // Valores de animação para o Paralaxe
  const phoneTranslateY = useSharedValue(height); // Começa fora da tela (embaixo)
  const contentTranslateY = useSharedValue(height); // Começa fora da tela (embaixo)
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. O celular sobe primeiro, indo um pouco além do centro (efeito de fundo)
    phoneTranslateY.value = withTiming(-40, { 
      duration: 1200, 
      easing: Easing.out(Easing.cubic) 
    });

    // 2. O painel branco com os textos e botões sobe logo depois, 
    // com uma velocidade um pouco mais rápida para criar o PARALAXE
    contentTranslateY.value = withDelay(
      400, 
      withTiming(0, { 
        duration: 1000, 
        easing: Easing.out(Easing.cubic) 
      })
    );

    // 3. Revela suavemente os botões
    contentOpacity.value = withDelay(
      600,
      withTiming(1, { duration: 800 })
    );
  }, []);

  // Estilo animado do MockFeed (Fundo)
  const phoneAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: phoneTranslateY.value }, { scale: 0.95 }],
      opacity: 0.8, // Deixa um pouco mais transparente para focar nos botões
    };
  });

  // Estilo animado do Painel (Frente)
  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: contentTranslateY.value }],
      opacity: contentOpacity.value,
    };
  });

  return (
    // Fundo limpo e branco
    <View className="flex-1 bg-white overflow-hidden">
      
      {/* BACKGROUND DE PARALAXE: O Celular com o Feed Mockado */}
      <Animated.View 
        style={[
          { position: 'absolute', top: 50, left: 0, right: 0, alignItems: 'center' }, 
          phoneAnimatedStyle
        ]}
      >
        {/* Adicionando um leve blur ou gradiente sobrepondo seria legal, 
            mas o seu componente de mockup já é bem bonito puro */}
        <PhoneMockupFeed />
      </Animated.View>

      {/* FOREGROUND: Painel inferior flutuante que sobe por cima do celular */}
      <Animated.View 
        style={[
          { 
            position: 'absolute', 
            bottom: 0, 
            width: '100%', 
            backgroundColor: 'white',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: 24,
            paddingTop: 40,
            paddingBottom: 60,
            // Sombra premium para descolar do celular no fundo
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -10 },
            shadowOpacity: 0.05,
            shadowRadius: 20,
            elevation: 10,
          },
          contentAnimatedStyle
        ]}
      >
        {/* Se quiser testar o novo Loading Global, é só descomentar a linha abaixo! */}
        {/* <View className="items-center mb-6"><LoadingStar size={36} /></View> */}

        <View className="items-center mb-10">
          <Text className="text-content-primary font-inter text-4xl font-bold mb-3 text-center">
            Descubra o Horazion
          </Text>
          <Text className="text-content-secondary font-inter text-center text-base px-4">
            Acompanhe feeds inspiradores, organize suas leituras e expanda sua mente.
          </Text>
        </View>

        <View className="w-full gap-y-4">
          <TouchableOpacity 
            className="w-full bg-status-success py-4 rounded-hz items-center"
            onPress={() => router.push('/register')} 
          >
            <Text className="text-white font-inter font-bold text-lg tracking-wide">
              Criar Conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-full py-4 rounded-hz items-center border-2 border-content-secondary"
            onPress={() => router.push('/login')} 
          >
            <Text className="text-content-primary font-inter font-bold text-lg tracking-wide">
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
    </View>
  );
}