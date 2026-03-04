import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay, 
  Easing, 
  runOnJS, 
  useAnimatedScrollHandler, 
  interpolate, 
  useAnimatedRef, 
  scrollTo 
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { Eye } from 'lucide-react-native';
import { PhoneMockupFeed } from '../src/components/ui/MockFeed'; 
import { HeroContent, SupportContent, EcosystemContent, StatusContent } from '../src/components/welcome/WelcomeSections';

const { width, height } = Dimensions.get('window');
const HZ_RED = "#B6192E";
const HZ_GRAY = "#D4D4D8";
const MAX_SCALE = Math.max(width, height) / 15;
const IS_TABLET = width >= 768;

const HorazionStar = ({ size = 28, color = HZ_RED }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 0 C12.5 8 16 11.5 24 12 C16 12.5 12.5 16 12 24 C11.5 16 8 12.5 0 12 C8 11.5 11.5 8 12 0 Z" />
  </Svg>
);

const DiscreetNavBar = ({ activeIndex, onJump, total = 4 }: { activeIndex: number, onJump: (idx: number) => void, total?: number }) => {
  return (
    <View style={styles.navBarContainer}>
      <View style={styles.navBarPill}>
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity 
              key={index} 
              onPress={() => onJump(index)} 
              activeOpacity={0.7}
              style={[styles.navDot, isActive && styles.navDotActive]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default function WelcomeScreen() {
  const router = useRouter();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const portalScale = useSharedValue(0);
  const portalOpacity = useSharedValue(0);
  
  const [activeIndex, setActiveIndex] = useState(0);
  // FE-HZ-006: Interface oculta por padrão
  const [isHeroHidden, setIsHeroHidden] = useState(true);
  
  const mockupOpacity = useSharedValue(0);
  const mockupScaleAnim = useSharedValue(0.9);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(30);
  // FE-HZ-006: Valor inicial 1 (Oculto)
  const hideHeroAnim = useSharedValue(1); 

  useEffect(() => {
    const timer = setTimeout(() => {
      mockupOpacity.value = withTiming(1, { duration: 1000 });
      mockupScaleAnim.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.back(1.2)) });
      contentOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
      contentTranslateY.value = withDelay(800, withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) }));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    runOnJS(setActiveIndex)(Math.round(event.contentOffset.y / height));
  });

  const jumpToSection = (index: number) => { runOnJS(scrollTo)(scrollRef, 0, index * height, true); };
  
  const handleNavigation = (path: string) => {
    portalOpacity.value = 1;
    portalScale.value = withTiming(MAX_SCALE, { duration: 900, easing: Easing.bezier(0.7, 0, 0.3, 1) }, (finished) => {
      if (finished) runOnJS(router.push)(path as any);
    });
  };

  const toggleHeroVisibility = () => {
    const nextState = !isHeroHidden;
    setIsHeroHidden(nextState);
    hideHeroAnim.value = withTiming(nextState ? 1 : 0, { duration: 500, easing: Easing.bezier(0.25, 1, 0.5, 1) });
  };

  const mockupStyle = useAnimatedStyle(() => ({
    opacity: mockupOpacity.value * interpolate(scrollY.value, [0, height * 0.6], [1, 0]),
    transform: [
      { translateY: interpolate(scrollY.value, [0, height], [0, -height * 0.3]) }, 
      { scale: mockupScaleAnim.value * interpolate(scrollY.value, [0, height], [1, 0.85]) }
    ]
  }));

  const heroContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value * (1 - hideHeroAnim.value) * interpolate(scrollY.value, [0, height * 0.2], [1, 0]),
    transform: [
      { translateY: contentTranslateY.value + interpolate(scrollY.value, [0, height], [0, -50]) + (hideHeroAnim.value * 100) },
      { scale: 1 - (hideHeroAnim.value * 0.05) }
    ]
  }));

  const restoreBtnStyle = useAnimatedStyle(() => ({
    opacity: hideHeroAnim.value,
    transform: [{ translateY: interpolate(hideHeroAnim.value, [0, 1], [20, 0]) }]
  }));

  const portalStyle = useAnimatedStyle(() => ({ 
    opacity: portalOpacity.value, 
    transform: [{ scale: portalScale.value }] 
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={styles.topStarContainer}>
        <HorazionStar size={32} />
      </View>
      
      {/* FE-HZ-006: Centralizado em Tablets, alinhado ao topo com offset em Mobiles */}
      <View style={styles.fixedBackground} pointerEvents="none">
        <Animated.View style={[styles.mockupWrapper, mockupStyle]}>
          <PhoneMockupFeed />
        </Animated.View>
      </View>

      <Animated.ScrollView 
        ref={scrollRef} 
        onScroll={scrollHandler} 
        scrollEventThrottle={16} 
        showsVerticalScrollIndicator={false} 
        pagingEnabled 
        decelerationRate="fast" 
        style={styles.scrollView} 
        contentContainerStyle={{ height: height * 4 }}
      >
        <View style={styles.fullScreenSection}>
          <View style={{ flex: 1 }} />
          
          <View pointerEvents={isHeroHidden ? 'none' : 'auto'} style={styles.heroWrapper}>
            <Animated.View style={[styles.heroGlassCard, heroContentStyle]}>
              <HeroContent onAction={handleNavigation} onHide={toggleHeroVisibility} />
            </Animated.View>
          </View>

        </View>
        <View style={styles.fullScreenSectionWhite}><SupportContent onNavigate={handleNavigation} /></View>
        <View style={styles.fullScreenSectionWhite}><EcosystemContent onNavigate={handleNavigation} /></View>
        <View style={styles.fullScreenSectionWhite}><StatusContent onNavigate={handleNavigation} /></View>
      </Animated.ScrollView>

      {/* Botão de Restaurar Interface */}
      {isHeroHidden && (
        <Animated.View style={[styles.restoreBtnContainer, restoreBtnStyle]}>
          <TouchableOpacity style={styles.restoreBtn} onPress={toggleHeroVisibility} activeOpacity={0.8}>
            <Eye size={18} color="#FFF" />
            <Text style={styles.restoreBtnText}>Acessar Plataforma</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Esconde a navbar se o usuário ocultar a UI para máxima imersão */}
      {!isHeroHidden && <DiscreetNavBar activeIndex={activeIndex} onJump={jumpToSection} total={4} />}

      <View style={styles.portalContainer} pointerEvents="none">
        <Animated.View style={[styles.portal, portalStyle]}>
          <HorazionStar size={100} color={HZ_RED} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1 },
  topStarContainer: { position: 'absolute', top: 60, width: '100%', alignItems: 'center', zIndex: 50 },
  
  // FE-HZ-006: Dinamismo para Tablets vs Mobile
  fixedBackground: { 
    ...StyleSheet.absoluteFillObject, 
    alignItems: 'center', 
    justifyContent: IS_TABLET ? 'center' : 'flex-start', 
    paddingTop: IS_TABLET ? 0 : height * 0.12, 
    zIndex: 0 
  },
  mockupWrapper: { marginTop: IS_TABLET ? 0 : -40 }, 
  
  fullScreenSection: { width, height, justifyContent: 'flex-end', paddingBottom: 110 },
  
  heroWrapper: { width: '100%', alignItems: 'center' },
  heroGlassCard: {
    width: '100%',
    maxWidth: 420, 
    marginHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#FFFFFF', 
    alignItems: 'center',
    overflow: 'hidden',
  },

  fullScreenSectionWhite: { width, height, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  
  navBarContainer: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center', zIndex: 100 },
  navBarPill: { flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 16, shadowColor: "#000", shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.05, shadowRadius: 10, borderWidth: 1, borderColor: '#F4F4F5', gap: 10 },
  navDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: HZ_GRAY },
  navDotActive: { width: 18, backgroundColor: HZ_RED },

  restoreBtnContainer: { position: 'absolute', bottom: 60, width: '100%', alignItems: 'center', zIndex: 200 },
  restoreBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: HZ_RED, paddingVertical: 14, paddingHorizontal: 28, borderRadius: 30, gap: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10 },
  restoreBtnText: { color: '#FFF', fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  
  portalContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  portal: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }
});