import { Canvas, Group, Path, Skia } from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  Easing,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { usePerceptionStore } from "../../store/usePerceptionStore";

const HZ_RED = "#B6192E";
const STAR_COUNT = 150;

const STAR_SVG =
  "M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z";
const skiaStarPath = Skia.Path.MakeFromSVGString(STAR_SVG)!;

interface StarData {
  x: number;
  y: number;
  scale: number;
  speed: number;
  initialOpacity: number;
  rotationSpeed: number;
}

interface HorazionGalaxyProps {
  onAnimationEnd: () => void;
}

// Passamos o screenHeight para a Estrela saber o limite da tela dinamicamente
const Star = ({
  data,
  clock,
  screenHeight,
}: {
  data: StarData;
  clock: SharedValue<number>;
  screenHeight: number;
}) => {
  const transform = useDerivedValue(() => {
    const time = clock.value;
    const newY = (data.y - time * data.speed * 50) % screenHeight;
    const finalY = newY < 0 ? newY + screenHeight : newY;
    const rotation = time * data.rotationSpeed;

    return [
      { translateX: data.x },
      { translateY: finalY },
      { scale: data.scale },
      { rotate: rotation },
      { translateX: -12 },
      { translateY: -12 },
    ];
  }, [clock, screenHeight]);

  return (
    <Path
      path={skiaStarPath}
      color={HZ_RED}
      opacity={data.initialOpacity}
      transform={transform}
      style="fill"
    />
  );
};

export const HorazionGalaxy = ({ onAnimationEnd }: HorazionGalaxyProps) => {
  const { state: perceptionState } = usePerceptionStore();
  const { width, height } = useWindowDimensions(); // Pega o tamanho real e atualizado da tela
  
  const opacity = useSharedValue(1);
  const clock = useSharedValue(0);
  const animationDuration = perceptionState.motionReduction ? 2000 : 4000;

  const stars = useMemo<StarData[]>(() => {
    return Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      scale: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.4 + 0.05,
      initialOpacity: Math.random() * 0.6 + 0.2,
      rotationSpeed: (Math.random() - 0.5) * 2,
    }));
  }, [width, height]); // Recalcula se a tela mudar

  useEffect(() => {
    clock.value = withRepeat(
      withTiming(1000, { duration: 100000, easing: Easing.linear }),
      -1,
    );
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 1200 });
      onAnimationEnd();
    }, animationDuration);
    return () => clearTimeout(timer);
  }, [animationDuration]);

  return (
    <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
      <Group opacity={opacity}>
        {stars.map((star, index) => (
          <Star key={index} data={star} clock={clock} screenHeight={height} />
        ))}
      </Group>
    </Canvas>
  );
};