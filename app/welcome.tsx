import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { 
  Apple, Chrome, Newspaper, Shield, Activity, 
  ArrowRight, Eye, Type, Layout, Mail, Globe, ChevronRight 
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay, 
  Easing,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';

import { PhoneMockupFeed } from '../src/components/ui/MockFeed'; 

const { height } = Dimensions.get('window');

// 🔒 THEME FALLBACK: O React Native exige HEX puro via JS para props como 'color'
const THEME = {
  brand: '#B6192E',
  primary: '#18181B', // Usado nos ícones (Dark/Neutral)
  secondary: '#71717A', // Usado em placeholders de input e ícones secundários
  surfaceBase: '#FFFFFF', // Fundo estático
};

export default function WelcomeScreen() {
  const router = useRouter();

  // Controles de Entrada e Parallax
  const phoneEntranceY = useSharedValue(height);
  const contentEntranceY = useSharedValue(height);
  const scrollY = useSharedValue(0);
  
  // Controle da Transição (Atravessar o Horizonte)
  const horizonScale = useSharedValue(0);
  const horizonOpacity = useSharedValue(0);

  useEffect(() => {
    // Efeito Paralaxe de entrada (Apple Style)
    phoneEntranceY.value = withTiming(-40, { duration: 1600, easing: Easing.out(Easing.cubic) });
    contentEntranceY.value = withDelay(400, withTiming(0, { duration: 1200, easing: Easing.out(Easing.cubic) }));
  }, []);

  // Monitora o scroll na UI Thread (Alta performance, 60fps)
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const handleCreateAccount = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    // O horizonte engole a tela
    horizonOpacity.value = 1;
    horizonScale.value = withTiming(50, { duration: 800, easing: Easing.inOut(Easing.ease) });

    setTimeout(() => {
      // router.push('/register'); // Descomente quando criar a rota register
      console.log('Navegou para Register');
    }, 700);
  };

  const handleSecondaryPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // router.push('/login'); // Descomente quando criar a rota login
  };

  // Parallax Dinâmico: Celular sobe e some conforme o usuário rola a página
  const phoneAnimatedStyle = useAnimatedStyle(() => {
    const dynamicTranslateY = interpolate(scrollY.value, [0, height], [phoneEntranceY.value, -250], Extrapolation.CLAMP);
    const dynamicScale = interpolate(scrollY.value, [0, height], [0.9, 0.75], Extrapolation.CLAMP);
    const dynamicOpacity = interpolate(scrollY.value, [0, height * 0.6], [0.95, 0], Extrapolation.CLAMP);
    
    return {
      transform: [{ translateY: dynamicTranslateY }, { scale: dynamicScale }],
      opacity: dynamicOpacity
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentEntranceY.value }]
  }));

  return (
    <View className="flex-1 bg-surface-base">
      
      {/* LAYER 1: Parallax Mockup Fixo ao Fundo */}
      <Animated.View style={[
        { position: 'absolute', top: 60, alignSelf: 'center', zIndex: 0 },
        phoneAnimatedStyle
      ]}>
        <PhoneMockupFeed />
      </Animated.View>

      {/* LAYER 2: Scroll Principal (Painel Branco) */}
      <Animated.ScrollView 
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        className="flex-1 z-10"
      >
        {/* Espaçador invisível que empurra o painel para baixo revelando o celular */}
        <View style={{ height: height * 0.55 }} />

        <Animated.View style={[styles.mainContentSheet, contentAnimatedStyle]}>
          
          {/* ====== 1. HERO ====== */}
          <View className="items-center mb-10 w-full">
            <Text className="text-content-primary font-inter text-3xl font-extrabold text-center mb-3">
              Descubra seu próximo horizonte.
            </Text>
            <Text className="text-content-secondary font-inter text-center text-[15px] leading-6 px-4">
              Uma nova forma de se conectar com pessoas, ideias e possibilidades reais.
            </Text>
          </View>

          <View className="w-full gap-y-4 px-component-p mb-10">
            <TouchableOpacity activeOpacity={0.8} onPress={handleCreateAccount}>
              <LinearGradient
                colors={[THEME.brand, '#8A1222']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                className="w-full py-[18px] rounded-hz items-center justify-center shadow-lg shadow-red-900/30"
              >
                <Text className="text-white font-inter font-bold text-lg" style={{ letterSpacing: 0.5 }}>
                  Criar conta
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.6} onPress={handleSecondaryPress}
              className="w-full py-[16px] rounded-hz items-center justify-center border border-content-secondary/20 bg-surface-base"
            >
              <Text className="text-content-primary font-inter font-semibold text-lg">
                Entrar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Logins */}
          <View className="w-full mb-24 items-center">
            <Text 
              className="text-content-secondary/50 font-inter text-xs mb-5 uppercase font-semibold"
              style={{ letterSpacing: 2 }} // 🔒 FIX: Propriedade nativa segura
            >
              Ou continue com
            </Text>
            <View className="flex-row gap-x-6">
              <TouchableOpacity onPress={handleSecondaryPress} className="w-14 h-14 rounded-full border border-content-secondary/10 items-center justify-center bg-surface-elevated shadow-sm">
                <Chrome size={22} color={THEME.primary} strokeWidth={1.5} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSecondaryPress} className="w-14 h-14 rounded-full border border-content-secondary/10 items-center justify-center bg-surface-elevated shadow-sm">
                <Apple size={22} color={THEME.primary} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>

          {/* ====== 2. ÚLTIMAS NOTÍCIAS ====== */}
          <View className="w-full px-component-p py-16">
            <Text className="text-content-primary font-inter text-2xl font-bold text-center mb-12">
              Atualizações e Visão
            </Text>
            <View className="gap-y-6">
              <NewsBlock icon={<Shield size={20} color={THEME.brand} strokeWidth={1.5} />} title="Transparência de Dados" desc="Nossa nova política de privacidade." date="HOJE" />
              <NewsBlock icon={<Activity size={20} color={THEME.brand} strokeWidth={1.5} />} title="Desempenho Elevado" desc="Otimizações no Horazion Feed." date="26 FEV" />
              <NewsBlock icon={<Newspaper size={20} color={THEME.brand} strokeWidth={1.5} />} title="O Design do Silêncio" desc="Como construímos clareza mental." date="20 FEV" />
            </View>
          </View>

          {/* ====== 3. EDITORIAL ====== */}
          <View className="w-full py-20 px-component-p border-t border-content-secondary/10 mt-8">
            <View className="w-full h-56 bg-surface-sunken rounded-2xl mb-8 items-center justify-center overflow-hidden border border-content-secondary/10">
              <Globe size={48} color={THEME.secondary} strokeWidth={1} opacity={0.3} />
            </View>
            <Text className="text-content-primary font-inter text-2xl font-bold mb-4">O futuro da conexão.</Text>
            <Text className="text-content-secondary font-inter text-[15px] leading-7 mb-8">
              Acreditamos que a tecnologia deve ser uma extensão da capacidade humana, não uma interrupção. O ecossistema Horazion foi desenhado para reduzir o ruído e amplificar o que importa.
            </Text>
            <View className="border-t border-content-secondary/10 pt-4">
              <EditorialLink title="Manifesto da Marca" />
              <EditorialLink title="Diretrizes de Comunidade" />
              <EditorialLink title="Roadmap 2026" />
            </View>
          </View>

          {/* ====== 4. ACESSIBILIDADE ====== */}
          <View className="w-full py-24 px-component-p bg-surface-sunken mt-12">
            <Text className="text-content-primary font-inter text-2xl font-bold text-center mb-3">Design Universal.</Text>
            <Text className="text-content-secondary font-inter text-center text-[15px] mb-14 px-4">
              Acesso não é um recurso extra, é o pilar fundamental do desenvolvimento.
            </Text>
            <View className="gap-y-8">
              <AcessibilityBlock icon={<Eye size={24} color={THEME.brand} />} title="Alto Contraste Nativo" desc="Adaptação semântica de cores para conforto visual." />
              <AcessibilityBlock icon={<Type size={24} color={THEME.brand} />} title="Tipografia Adaptável" desc="Suporte completo à fonte OpenDyslexic." />
              <AcessibilityBlock icon={<Layout size={24} color={THEME.brand} />} title="Redução de Movimento" desc="Opção nativa para desativar transições complexas." />
            </View>
          </View>

          {/* ====== 5. PARCERIAS ====== */}
          <View className="w-full py-24 px-component-p items-center bg-surface-base">
            <Text className="text-content-primary font-inter text-2xl font-bold text-center mb-4">Construa conosco.</Text>
            <Text className="text-content-secondary font-inter text-center text-[15px] leading-6 mb-10 px-4">
              Se você tem uma visão alinhada à nossa, nossos canais de parceria estratégica estão abertos.
            </Text>
            <TouchableOpacity className="px-8 py-3 rounded-full border-[1.5px] border-[#B6192E] flex-row items-center gap-x-2">
              <Text className="text-[#B6192E] font-inter font-semibold">Parcerias Horazion</Text>
              <ArrowRight size={16} color={THEME.brand} />
            </TouchableOpacity>
          </View>

          {/* ====== 6. CONTATO ====== */}
          <View className="w-full py-20 px-component-p border-t border-content-secondary/10">
            <Text className="text-content-primary font-inter text-2xl font-bold mb-8">Estamos aqui.</Text>
            <View className="bg-surface-elevated p-6 rounded-2xl border border-content-secondary/10 mb-6">
              <TextInput 
                placeholder="Seu e-mail" 
                placeholderTextColor={THEME.secondary}
                className="border-b border-content-secondary/20 pb-3 mb-6 text-content-primary font-inter text-[15px]"
              />
              <TextInput 
                placeholder="Como podemos ajudar?" 
                placeholderTextColor={THEME.secondary}
                multiline
                className="border-b border-content-secondary/20 pb-3 mb-8 text-content-primary font-inter text-[15px] h-12"
              />
              <TouchableOpacity className="bg-content-action py-4 rounded-hz items-center">
                <Text className="text-white font-inter font-bold">Enviar mensagem</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-x-3 opacity-60">
              <Mail size={16} color={THEME.primary} />
              <Text className="text-content-primary font-inter text-sm">hello@horazion.com</Text>
            </View>
          </View>

          {/* ====== 7. FOOTER ====== */}
          <View className="w-full pt-16 pb-24 px-component-p bg-surface-sunken">
            <View className="flex-row justify-between mb-12">
              <View className="gap-y-4">
                <Text className="text-content-primary font-inter font-bold text-sm uppercase mb-2" style={{ letterSpacing: 1.5 }}>
                  Produto
                </Text>
                <Text className="text-content-secondary font-inter text-[15px]">O App</Text>
                <Text className="text-content-secondary font-inter text-[15px]">Segurança</Text>
                <Text className="text-content-secondary font-inter text-[15px]">Preços</Text>
              </View>
              <View className="gap-y-4 pr-8">
                <Text className="text-content-primary font-inter font-bold text-sm uppercase mb-2" style={{ letterSpacing: 1.5 }}>
                  Legal
                </Text>
                <Text className="text-content-secondary font-inter text-[15px]">Termos</Text>
                <Text className="text-content-secondary font-inter text-[15px]">Privacidade</Text>
                <Text className="text-content-secondary font-inter text-[15px]">Cookies</Text>
              </View>
            </View>

            <View className="border-t border-content-secondary/20 pt-8 items-center">
              <Text className="text-content-secondary font-inter text-sm font-semibold uppercase mb-1" style={{ letterSpacing: 1.5 }}>
                Horazion Group
              </Text>
              <Text className="text-content-secondary/50 font-inter text-xs">
                © 2026 Horazion Life. Todos os direitos reservados.
              </Text>
            </View>
          </View>

        </Animated.View>
      </Animated.ScrollView>

      {/* LAYER 3: A Transição (Horizonte Expansivo) */}
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

// ---- COMPONENTES AUXILIARES ----

const NewsBlock = ({ icon, title, desc, date }: any) => (
  <View className="bg-surface-elevated p-5 rounded-2xl border border-content-secondary/10 flex-row items-start shadow-sm shadow-black/5">
    <View className="p-3 bg-surface-base rounded-full border border-content-secondary/10 mr-4">
      {icon}
    </View>
    <View className="flex-1">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-content-primary font-inter font-bold text-[15px]">{title}</Text>
        <Text className="text-[#B6192E] font-inter text-[10px] font-bold" style={{ letterSpacing: 1 }}>{date}</Text>
      </View>
      <Text className="text-content-secondary font-inter text-[13px] leading-5">{desc}</Text>
    </View>
  </View>
);

const EditorialLink = ({ title }: { title: string }) => (
  <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-content-secondary/10 group">
    <Text className="text-content-primary font-inter text-[15px] font-medium">{title}</Text>
    <ChevronRight size={16} color={THEME.secondary} />
  </TouchableOpacity>
);

const AcessibilityBlock = ({ icon, title, desc }: any) => (
  <View className="items-center text-center">
    <View className="mb-4">{icon}</View>
    <Text className="text-content-primary font-inter font-bold text-[16px] mb-2">{title}</Text>
    <Text className="text-content-secondary font-inter text-[14px] text-center px-4 leading-6">{desc}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContentSheet: {
    backgroundColor: THEME.surfaceBase, // 🔒 FIX: Hex puro garantido no StyleSheet.
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 30, 
    overflow: 'hidden',
  },
  horizonTransition: {
    position: 'absolute',
    alignSelf: 'center',
    top: height / 2,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.brand,
    zIndex: 9999,
  }
});