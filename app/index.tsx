import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  useAnimatedProps,
  Easing
} from 'react-native-reanimated';
import { HorazionGalaxy } from '../src/components/ui/HorazionGalaxy';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function IntroScreen() {
  const router = useRouter();
  
  // Começa invisível, minúscula (escala 0.01 = ponto) e bem borrada
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.01); 
  const logoRotation = useSharedValue(180); // Começa girada 180 graus
  const logoBlur = useSharedValue(15);

  const handleAnimationFinish = () => {
    // A galáxia avisa que vai sumir. É a hora do show da logo!
    
    // Revela a imagem rapidamente
    logoOpacity.value = withTiming(1, { duration: 1000 });
    // Tira o desfoque aos poucos
    logoBlur.value = withTiming(0, { duration: 1500 });
    
    // EFEITO ESTRELA: Cresce da escala 0.01 até 1 (tamanho real) com uma curva exponencial bonita
    logoScale.value = withTiming(1, { 
      duration: 1800, 
      easing: Easing.out(Easing.exp) 
    });
    
    // EFEITO ESTRELA: Desfaz o giro enquanto cresce
    logoRotation.value = withTiming(0, { 
      duration: 1800, 
      easing: Easing.out(Easing.exp) 
    });

    // Aguarda a logo ficar majestosa por 1.5s antes de ir para a tela de Welcome
    setTimeout(() => {
      router.replace('/welcome');
    }, 3500);
  };

  const animatedProps = useAnimatedProps(() => {
    return {
      blurRadius: logoBlur.value,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [
        { scale: logoScale.value },
        // Concatena a rotação com "deg" (graus)
        { rotate: `${logoRotation.value}deg` } 
      ]
    };
  });

  return (
    <View className="flex-1 bg-white justify-center items-center">
      
      <HorazionGalaxy onAnimationEnd={handleAnimationFinish} />

      {/* A logo fica com 'position: absolute' para garantir que cresça exatamente no centro por cima do Canvas */}
      <AnimatedImage 
        source={require('../assets/images/logo/life.png')}
        style={[
          { width: 250, height: 250, resizeMode: 'contain', position: 'absolute' }, 
          animatedStyle
        ]}
        animatedProps={animatedProps}
      />
      
    </View>
  );
}