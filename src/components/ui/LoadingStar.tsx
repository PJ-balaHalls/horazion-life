import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, Group, Path, Skia } from "@shopify/react-native-skia";
import Animated, {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

const HZ_RED = "#B6192E";
const STAR_SVG = "M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z";
const skiaStarPath = Skia.Path.MakeFromSVGString(STAR_SVG)!;

interface LoadingStarProps {
  size?: number;
}

export const LoadingStar = ({ size = 48 }: LoadingStarProps) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Rotação contínua e suave de 360 graus
    rotation.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 3000, easing: Easing.linear }),
      -1 // -1 significa repetição infinita
    );

    // Efeito de pulsar (cresce e diminui)
    scale.value = withRepeat(
      withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true // true significa que faz o vai-e-volta (yoyo)
    );
  }, []);

  // O Skia precisa de 'useDerivedValue' para transformar os valores animados em transformações gráficas
  const transform = useDerivedValue(() => {
    return [
      { translateX: size / 2 },
      { translateY: size / 2 },
      { scale: scale.value },
      { rotate: rotation.value },
      { translateX: -12 }, // Centraliza o eixo X (metade de 24 do SVG)
      { translateY: -12 }, // Centraliza o eixo Y (metade de 24 do SVG)
    ];
  });

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Canvas style={{ width: size, height: size }}>
        <Group transform={transform}>
          <Path path={skiaStarPath} color={HZ_RED} style="fill" />
        </Group>
      </Canvas>
    </View>
  );
};