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
import { LifeBuoy, Layers, Activity, Home, Sparkles } from 'lucide-react-native';
import { PhoneMockupFeed } from '../src/components/ui/MockFeed'; 
import { HeroContent, SupportContent, EcosystemContent, StatusContent } from '../src/components/welcome/WelcomeSections';

const { width, height } = Dimensions.get('window');
const HZ_RED = "#B6192E";
const HZ_GRAY = "#A1A1AA";
const MAX_SCALE = Math.max(width, height) / 20;

const FloatingNavBar = ({ activeIndex, onJump }: { activeIndex: number, onJump: (idx: number) => void }) => {
  const tabs = [{ icon: Home, label: "Início" }, { icon: LifeBuoy, label: "Suporte" }, { icon: Layers, label: "Eco" }, { icon: Activity, label: "Status" }];
  return (
    <View style={styles.navBarContainer}>
      <View style={styles.navBarPill}>
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity key={index} style={styles.navItem} onPress={() => onJump(index)} activeOpacity={0.7}>
              <tab.icon size={20} color={isActive ? HZ_RED : HZ_GRAY} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <Text style={styles.navLabel}>{tab.label}</Text>}
            </TouchableOpacity>
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
  const mockupOpacity = useSharedValue(0);
  const mockupScaleAnim = useSharedValue(0.9);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(20);

  useEffect(() => {
    mockupOpacity.value = withTiming(1, { duration: 1000 });
    mockupScaleAnim.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.back(1.2)) });
    contentOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    contentTranslateY.value = withDelay(800, withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) }));
  }, []);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    runOnJS(setActiveIndex)(Math.round(event.contentOffset.y / height));
  });

  const jumpToSection = (index: number) => { runOnJS(scrollTo)(scrollRef, 0, index * height, true); };
  const handleNavigation = (path: string) => {
    portalOpacity.value = 1;
    portalScale.value = withTiming(MAX_SCALE, { duration: 800, easing: Easing.bezier(0.65, 0, 0.35, 1) }, (finished) => {
      if (finished) runOnJS(router.push)(path as any);
    });
  };

  const mockupStyle = useAnimatedStyle(() => ({
    opacity: mockupOpacity.value * interpolate(scrollY.value, [0, height * 0.6], [1, 0]),
    transform: [{ translateY: interpolate(scrollY.value, [0, height], [0, -height * 0.3]) }, { scale: mockupScaleAnim.value * interpolate(scrollY.value, [0, height], [1, 0.85]) }]
  }));

  const heroContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value * interpolate(scrollY.value, [0, height * 0.2], [1, 0]),
    transform: [{ translateY: contentTranslateY.value + interpolate(scrollY.value, [0, height], [0, -50]) }]
  }));

  const portalStyle = useAnimatedStyle(() => ({ opacity: portalOpacity.value, transform: [{ scale: portalScale.value }] }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={styles.topStarContainer}><Sparkles size={28} color={HZ_RED} fill={HZ_RED} /></View>
      <View style={styles.fixedBackground} pointerEvents="none"><Animated.View style={[styles.mockupWrapper, mockupStyle]}><PhoneMockupFeed /></Animated.View></View>
      <Animated.ScrollView ref={scrollRef} onScroll={scrollHandler} scrollEventThrottle={16} showsVerticalScrollIndicator={false} pagingEnabled decelerationRate="fast" style={styles.scrollView} contentContainerStyle={{ height: height * 4 }}>
        <View style={styles.fullScreenSection}><View style={{ flex: 1 }} /><Animated.View style={[styles.bottomHero, heroContentStyle]}><HeroContent onAction={handleNavigation} /></Animated.View></View>
        <View style={styles.fullScreenSectionWhite}><SupportContent onNavigate={handleNavigation} /></View>
        <View style={styles.fullScreenSectionWhite}><EcosystemContent onNavigate={handleNavigation} /></View>
        <View style={styles.fullScreenSectionWhite}><StatusContent onNavigate={handleNavigation} /></View>
      </Animated.ScrollView>
      <FloatingNavBar activeIndex={activeIndex} onJump={jumpToSection} />
      <View style={styles.portalContainer} pointerEvents="none"><Animated.View style={[styles.portal, portalStyle]} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1 },
  topStarContainer: { position: 'absolute', top: 60, width: '100%', alignItems: 'center', zIndex: 50, opacity: 0.9 },
  fixedBackground: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
  mockupWrapper: { marginTop: -80 },
  fullScreenSection: { width, height, justifyContent: 'flex-end', paddingBottom: 110 },
  fullScreenSectionWhite: { width, height, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  bottomHero: { paddingBottom: 20, width: '100%' },
  navBarContainer: { position: 'absolute', bottom: 34, width: '100%', alignItems: 'center', zIndex: 100 },
  navBarPill: { flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 40, paddingVertical: 6, paddingHorizontal: 16, shadowColor: "#000", shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.05, shadowRadius: 10, borderWidth: 1, borderColor: '#F4F4F5', gap: 8 },
  navItem: { flexDirection: 'row', alignItems: 'center', padding: 8, gap: 6 },
  navLabel: { color: HZ_RED, fontSize: 11, fontWeight: '700' },
  portalContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  portal: { width: 40, height: 40, borderRadius: 20, backgroundColor: HZ_RED }
});