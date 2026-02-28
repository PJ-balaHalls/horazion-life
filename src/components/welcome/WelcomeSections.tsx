import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Apple, Chrome, Eye, Type, Layout, ArrowRight, Shield, Activity, Globe, X, Fingerprint, Sparkles, Moon } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, interpolate, Extrapolation, SharedValue, 
  useSharedValue, withTiming, withRepeat, Easing, withSequence 
} from 'react-native-reanimated';
import { PhoneMockupFeed } from '../ui/MockFeed';

const { height, width } = Dimensions.get('window');

const THEME = { brand: '#B6192E', primary: '#18181B', secondary: '#71717A' };

interface SectionProps {
  scrollY: SharedValue<number>;
  onAction?: (actionType: 'register' | 'login') => void;
}

// ==========================================
// 1. POPUP NATIVO (Glassmorphism e Blur)
// ==========================================
const FloatingPopup = ({ visible, onClose, data }: any) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) });
      translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.back(1.2)) });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(30, { duration: 200 });
    }
  }, [visible]);

  if (!visible || !data) return null;

  return (
    <Animated.View style={[styles.popupOverlay, useAnimatedStyle(() => ({ opacity: opacity.value }))]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      <Animated.View style={[styles.popupCard, useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }))]}>
        <TouchableOpacity onPress={onClose} style={styles.popupClose}>
          <X size={20} color={THEME.primary} />
        </TouchableOpacity>
        <View style={styles.popupIconArea}>
          <data.icon size={28} color={THEME.brand} strokeWidth={1.5} />
        </View>
        <Text className="font-inter font-extrabold text-[22px] text-[#18181B] mb-3 text-center tracking-tight">{data.title}</Text>
        <Text className="font-inter text-[15px] text-[#71717A] leading-7 text-center mb-8 px-2">{data.text}</Text>
      </Animated.View>
    </Animated.View>
  );
};

// ==========================================
// 2. HERO SECTION COM HOTSPOTS NO MOCKUP
// ==========================================
export const HeroSection = ({ scrollY, onAction }: SectionProps) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');
  const [popupData, setPopupData] = useState<any>(null);
  
  const activeTabIndex = useSharedValue(0);
  const levitationY = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    levitationY.value = withRepeat(
      withSequence(withTiming(-12, { duration: 3000, easing: Easing.inOut(Easing.ease) }), withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })), -1, true
    );
    pulseScale.value = withRepeat(withTiming(1.3, { duration: 1500, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, []);

  const handleTabSwitch = (tab: 'register' | 'login', index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
    activeTabIndex.value = withTiming(index, { duration: 400, easing: Easing.out(Easing.cubic) });
  };

  const openPopup = (type: string) => {
    Haptics.selectionAsync();
    if (type === 'feed') setPopupData({ title: 'O Fim do Ruído', text: 'Sem publicidade invasiva. Sem algoritmos viciantes. O Horazion Feed mostra o que importa, cronologicamente.', icon: Sparkles });
    if (type === 'privacy') setPopupData({ title: 'Cofre Pessoal', text: 'A sua biometria e as suas interações são encriptadas de ponta a ponta. Você controla a sua sombra digital.', icon: Fingerprint });
  };

  const phoneStyle = useAnimatedStyle(() => {
    const scrollTranslate = interpolate(scrollY.value, [0, height], [0, height * 0.4], Extrapolation.CLAMP);
    const scale = interpolate(scrollY.value, [0, height * 0.8], [0.95, 0.75], Extrapolation.CLAMP);
    return { transform: [{ translateY: scrollTranslate + levitationY.value }, { scale }] };
  });

  const tabIndicatorStyle = useAnimatedStyle(() => ({ transform: [{ translateX: activeTabIndex.value * ((width - 64) / 2) }] }));
  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulseScale.value }], opacity: interpolate(pulseScale.value, [1, 1.3], [0.5, 0]) }));

  return (
    <View style={styles.sectionContainer}>
      <View style={[styles.aura, { top: -100, right: -100, backgroundColor: 'rgba(182, 25, 46, 0.04)' }]} />

      <Animated.View style={[{ position: 'absolute', top: 50, zIndex: 0 }, phoneStyle]}>
        <PhoneMockupFeed />
        
        {/* HOTSPOT 1 (Esquerda) */}
        <TouchableOpacity onPress={() => openPopup('feed')} style={[styles.hotspot, { top: 180, left: -30 }]}>
          <Animated.View style={[styles.hotspotPulse, pulseStyle]} />
          <View style={styles.hotspotCore}><Sparkles size={14} color="#FFF" /></View>
        </TouchableOpacity>

        {/* HOTSPOT 2 (Direita) */}
        <TouchableOpacity onPress={() => openPopup('privacy')} style={[styles.hotspot, { top: 320, right: -30 }]}>
          <Animated.View style={[styles.hotspotPulse, pulseStyle]} />
          <View style={styles.hotspotCore}><Fingerprint size={14} color="#FFF" /></View>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.heroOverlay}>
        <View className="items-center mb-8 w-full px-4">
          <Text className="font-inter text-[40px] font-extrabold text-[#18181B] text-center mb-2 tracking-tighter leading-[44px]">
            Expanda o seu Horizonte.
          </Text>
          <Text className="font-inter text-center text-[16px] leading-6 px-6 text-[#71717A]">
            Toque nos pontos da tela para descobrir um ecossistema focado na clareza mental.
          </Text>
        </View>

        <View className="w-full px-8 mb-6">
          <View className="flex-row bg-[#F4F4F5] p-1.5 rounded-[20px] w-full relative">
            <Animated.View style={[{ position: 'absolute', top: 6, bottom: 6, left: 6, width: (width - 64 - 12) / 2, backgroundColor: '#FFFFFF', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }, tabIndicatorStyle]} />
            <Pressable onPress={() => handleTabSwitch('register', 0)} className="flex-1 py-4 items-center z-10"><Text className="font-inter font-bold text-[#18181B] text-[15px]">Nova Conta</Text></Pressable>
            <Pressable onPress={() => handleTabSwitch('login', 1)} className="flex-1 py-4 items-center z-10"><Text className="font-inter font-bold text-[#18181B] text-[15px]">Já sou membro</Text></Pressable>
          </View>
        </View>

        <View className="w-full px-8 mb-10 mt-4">
          <TouchableOpacity activeOpacity={0.8} onPress={() => onAction && onAction(activeTab)}>
            {activeTab === 'register' ? (
              <LinearGradient colors={[THEME.brand, '#8A1222']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="w-full py-[20px] rounded-[20px] items-center shadow-lg shadow-red-900/25">
                <Text className="text-white font-inter font-extrabold text-[17px] tracking-wide">Criar o meu Espaço</Text>
              </LinearGradient>
            ) : (
              <View className="w-full py-[20px] rounded-[20px] items-center bg-[#18181B] shadow-lg shadow-black/25">
                <Text className="text-white font-inter font-extrabold text-[17px] tracking-wide">Aceder à Conta</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <FloatingPopup visible={!!popupData} onClose={() => setPopupData(null)} data={popupData} />
    </View>
  );
};

// ==========================================
// 3. VISION SECTION (Tipografia Gigante)
// ==========================================
export const VisionSection = () => {
  return (
    <View style={[styles.sectionContainer, { justifyContent: 'center', backgroundColor: '#FAFAFA', paddingVertical: 100, overflow: 'hidden' }]}>
      {/* Marca de Água Tipográfica (Super Premium) */}
      <Text style={styles.watermark}>01</Text>
      
      <View className="w-full px-8 z-10">
        <Globe size={48} color={THEME.brand} strokeWidth={1.5} style={{ marginBottom: 24 }} />
        <Text className="font-inter text-[38px] font-extrabold text-[#18181B] mb-5 tracking-tighter leading-[42px]">
          Redesenhámos a rede social.
        </Text>
        <Text className="font-inter text-[16px] leading-7 text-[#71717A] mb-12">
          Construímos uma fundação em que você não é o produto. Sem algoritmos a ditar o seu comportamento.
        </Text>

        <View className="flex-row flex-wrap justify-between gap-y-4">
          <View className="w-[48%] bg-white p-6 rounded-[24px] shadow-sm shadow-black/[0.03]">
            <Shield size={24} color={THEME.primary} className="mb-4" />
            <Text className="font-inter font-bold text-[#18181B] text-[16px] mb-2">Segurança</Text>
            <Text className="font-inter text-[#71717A] text-[13px] leading-5">Encriptação em cada interação.</Text>
          </View>
          <View className="w-[48%] bg-white p-6 rounded-[24px] shadow-sm shadow-black/[0.03]">
            <Activity size={24} color={THEME.primary} className="mb-4" />
            <Text className="font-inter font-bold text-[#18181B] text-[16px] mb-2">Velocidade</Text>
            <Text className="font-inter text-[#71717A] text-[13px] leading-5">Interface nativa e responsiva.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ==========================================
// 4. ACCESSIBILITY SECTION (Interativo)
// ==========================================
export const AccessibilitySection = () => {
  const [isDark, setIsDark] = useState(false); // Apenas visual para demonstração

  return (
    <View style={[styles.sectionContainer, { justifyContent: 'center', backgroundColor: isDark ? '#18181B' : '#FFFFFF', paddingVertical: 100, transition: 'background-color 0.5s ease' }]}>
      <Text style={[styles.watermark, { right: -20, left: undefined, color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }]}>02</Text>

      <View className="w-full px-8 z-10">
        <Text className={`font-inter text-[38px] font-extrabold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4 tracking-tighter`}>
          Acesso é Estrutura.
        </Text>
        <Text className={`font-inter text-[16px] leading-7 ${isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'} mb-12`}>
          Acessibilidade visual e cognitiva integrada nativamente no motor de renderização.
        </Text>

        {/* Componente Interativo Demonstrativo */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => { Haptics.impactAsync(); setIsDark(!isDark); }}
          className={`flex-row items-center justify-between p-6 rounded-[24px] mb-4 border ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-[#FAFAFA] border-black/[0.04]'}`}
        >
          <View className="flex-row items-center flex-1">
            <Moon size={24} color={isDark ? '#FFF' : THEME.primary} style={{ marginRight: 16 }} />
            <View>
              <Text className={`font-inter font-bold text-[16px] ${isDark ? 'text-white' : 'text-[#18181B]'}`}>Contraste Dinâmico</Text>
              <Text className={`font-inter text-[13px] ${isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'}`}>Toque para testar o ambiente de leitura.</Text>
            </View>
          </View>
          <View className={`w-12 h-6 rounded-full p-1 ${isDark ? 'bg-[#B6192E] items-end' : 'bg-[#E4E4E7] items-start'}`}>
            <View className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </View>
        </TouchableOpacity>

        <View className={`flex-row items-center p-6 rounded-[24px] mb-4 border ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-[#FAFAFA] border-black/[0.04]'}`}>
          <Type size={24} color={isDark ? '#FFF' : THEME.primary} style={{ marginRight: 16 }} />
          <View>
            <Text className={`font-inter font-bold text-[16px] ${isDark ? 'text-white' : 'text-[#18181B]'}`}>OpenDyslexic Engine</Text>
            <Text className={`font-inter text-[13px] ${isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'}`}>Tipografia moldada para conforto visual.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ==========================================
// 5. CONTACT & FOOTER
// ==========================================
export const ContactSection = () => {
  return (
    <View style={[styles.sectionContainer, { justifyContent: 'space-between', paddingTop: 120, backgroundColor: '#FAFAFA' }]}>
      <Text style={styles.watermark}>03</Text>

      <View className="px-10 w-full z-10">
        <Text className="font-inter text-[38px] font-extrabold text-[#18181B] mb-2 tracking-tighter">Conecte-se.</Text>
        <Text className="font-inter text-[16px] text-[#71717A] mb-12">Estamos abertos a parcerias estratégicas.</Text>

        <View className="bg-white p-6 rounded-[32px] shadow-sm shadow-black/[0.03] border border-black/[0.02]">
          <TextInput placeholder="O seu e-mail corporativo" placeholderTextColor={THEME.secondary} className="border-b border-black/[0.06] pb-4 mb-6 text-[#18181B] font-inter text-[16px]" />
          <TextInput placeholder="Como podemos expandir juntos?" placeholderTextColor={THEME.secondary} multiline className="border-b border-black/[0.06] pb-4 mb-8 text-[#18181B] font-inter text-[16px] h-12" />
          <TouchableOpacity className="flex-row items-center justify-center bg-[#18181B] py-5 rounded-[20px] shadow-md shadow-black/10">
            <Text className="font-inter font-extrabold text-white text-[16px] mr-2">Iniciar Conversa</Text>
            <ArrowRight size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-full pb-16 px-10 mt-20 z-10">
        <View className="border-t border-black/[0.05] pt-10 flex-row justify-between items-end">
          <View>
            <Text className="font-inter font-bold text-[#18181B] text-lg mb-1 tracking-tight">Horazion Group</Text>
            <Text className="font-inter text-[#A1A1AA] text-xs">© 2026 Todos os direitos reservados.</Text>
          </View>
          <View className="flex-row gap-x-5">
            <Chrome size={22} color={THEME.primary} strokeWidth={1.5} />
            <Apple size={22} color={THEME.primary} strokeWidth={1.5} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: { minHeight: height, width: width, backgroundColor: '#FFFFFF', alignItems: 'center' },
  heroOverlay: { position: 'absolute', bottom: 0, width: '100%', paddingTop: 140, paddingBottom: 40, backgroundColor: '#FFFFFF', shadowColor: '#FFFFFF', shadowOffset: { width: 0, height: -140 }, shadowOpacity: 1, shadowRadius: 80, elevation: 20 },
  aura: { position: 'absolute', width: 500, height: 500, borderRadius: 250, filter: 'blur(50px)' },
  watermark: { position: 'absolute', left: -20, top: 40, fontSize: 240, fontWeight: '900', color: 'rgba(0,0,0,0.02)', letterSpacing: -10, zIndex: 0 },
  
  // Estilos dos Hotspots no MockFeed
  hotspot: { position: 'absolute', width: 44, height: 44, alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  hotspotPulse: { position: 'absolute', width: 44, height: 44, borderRadius: 22, backgroundColor: THEME.brand },
  hotspotCore: { width: 28, height: 28, borderRadius: 14, backgroundColor: THEME.brand, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  
  // Estilos do Modal Floating Popup
  popupOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.85)', zIndex: 9999, justifyContent: 'center', alignItems: 'center', padding: 24 },
  popupCard: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 40, padding: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 24 }, shadowOpacity: 0.1, shadowRadius: 50, elevation: 30, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)' },
  popupIconArea: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(182, 25, 46, 0.05)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  popupClose: { position: 'absolute', top: 24, right: 24, padding: 10, backgroundColor: '#F4F4F5', borderRadius: 24 }
});