import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  runOnJS,
  useAnimatedScrollHandler
} from 'react-native-reanimated';

// Importa o MockFeed (NÃO FOI REFATORADO, APENAS USADO)
import { PhoneMockupFeed } from '../src/components/ui/MockFeed'; 

// Importa as novas seções separadas
import { 
  HeroTextSection, 
  FeaturesSection, 
  AccessibilityNote, 
  FooterSection 
} from '../src/components/welcome/WelcomeSections';

const { width, height } = Dimensions.get('window');
const HZ_RED = "#B6192E";
const MAX_SCALE = Math.max(width, height) / 20;

export default function WelcomeScreen() {
  const router = useRouter();
  
  const scrollY = useSharedValue(0);
  const screenOpacity = useSharedValue(0);
  const portalScale = useSharedValue(0);
  const portalOpacity = useSharedValue(0);

  useEffect(() => {
    screenOpacity.value = withTiming(1, { duration: 800 });
  }, []);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const handleAction = (route: string) => {
    portalOpacity.value = 1;
    portalScale.value = withTiming(MAX_SCALE, { 
      duration: 800, 
      easing: Easing.bezier(0.65, 0, 0.35, 1) 
    }, (finished) => {
      if (finished) {
        runOnJS(router.push)(`/${route}` as any);
      }
    });
  };

  const containerStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const portalStyle = useAnimatedStyle(() => ({
    opacity: portalOpacity.value,
    transform: [{ scale: portalScale.value }]
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Animated.ScrollView 
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        style={[styles.scrollView, containerStyle]}
      >
        {/* 1. TEXTO HERO & AÇÕES */}
        <HeroTextSection onAction={handleAction} />

        {/* 2. MOCKUP FEED (Visual Anchor - ÚNICA INSTÂNCIA) */}
        <View style={styles.mockupContainer}>
          <View style={{ transform: [{ scale: 0.95 }] }}>
            <PhoneMockupFeed />
          </View>
        </View>

        {/* 3. FUNCIONALIDADES & CONCEITO */}
        <FeaturesSection />
        
        {/* 4. RODAPÉ */}
        <AccessibilityNote />
        <FooterSection /> 

      </Animated.ScrollView>

      {/* PORTAL DE TRANSIÇÃO */}
      <View style={styles.portalContainer} pointerEvents="none">
        <Animated.View style={[styles.portal, portalStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  mockupContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: -20, // Leve sobreposição visual
    zIndex: 1,
  },
  portalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  portal: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HZ_RED,
  }
});