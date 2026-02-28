import React, { useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, Group, BlurMask, Line, vec, Rect, Path, Skia } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

const STAR_COUNT = 150; // Mais estrelas
const HZ_BRAND = "#B6192E";

// A SUA ESTRELA ORIGINAL RECUPERADA
const STAR_SVG = "M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z";
const skiaStarPath = Skia.Path.MakeFromSVGString(STAR_SVG)!;

interface Star3D {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  rotationSpeed: number;
}

interface Props {
  onAnimationEnd: () => void;
}

const project3D = (star: Star3D, timeVal: number, width: number, height: number) => {
  let currentZ = star.z - (timeVal * 120); // Viagem mais lenta e majestosa
  currentZ = currentZ > 0 ? currentZ : currentZ + 1200;
  
  const perspective = 400 / currentZ;
  const projectedX = (star.x - width / 2) * perspective + width / 2;
  const projectedY = (star.y - height / 2) * perspective + height / 2;
  const scale = Math.max(0.05, perspective * star.size);
  const opacity = Math.min(1, Math.max(0, (1200 - currentZ) / 800));
  
  return { projectedX, projectedY, scale, opacity, currentZ, rotation: timeVal * star.rotationSpeed };
};

const Star = ({ data, time, width, height }: { data: Star3D; time: SharedValue<number>; width: number; height: number }) => {
  const transform = useDerivedValue(() => {
    const p = project3D(data, time.value, width, height);
    return [
      { translateX: p.projectedX },
      { translateY: p.projectedY },
      { scale: p.scale },
      { rotate: p.rotation },
      { translateX: -12 }, // Centraliza o SVG
      { translateY: -12 },
    ];
  });

  const opacity = useDerivedValue(() => project3D(data, time.value, width, height).opacity);

  return (
    <Group opacity={opacity}>
      <Path path={skiaStarPath} color={HZ_BRAND} transform={transform} style="fill">
        <BlurMask blur={4} style="normal" />
      </Path>
      <Path path={skiaStarPath} color="#FFFFFF" transform={transform} style="fill" />
    </Group>
  );
};

const ConstellationLine = ({ star1, star2, time, width, height }: { star1: Star3D; star2: Star3D; time: SharedValue<number>; width: number; height: number }) => {
  const t1 = useDerivedValue(() => project3D(star1, time.value, width, height));
  const t2 = useDerivedValue(() => project3D(star2, time.value, width, height));

  const p1 = useDerivedValue(() => vec(t1.value.projectedX, t1.value.projectedY));
  const p2 = useDerivedValue(() => vec(t2.value.projectedX, t2.value.projectedY));
  
  const opacity = useDerivedValue(() => {
    const avgOpacity = (t1.value.opacity + t2.value.opacity) / 2;
    const distance = Math.abs(t1.value.currentZ - t2.value.currentZ);
    return distance < 100 ? avgOpacity * 0.15 : 0; 
  });

  return (
    <Group opacity={opacity}>
      <Line p1={p1} p2={p2} color="#FFFFFF" strokeWidth={0.5} />
    </Group>
  );
};

export const HorazionGalaxy = ({ onAnimationEnd }: Props) => {
  const { width, height } = useWindowDimensions();
  const time = useSharedValue(0);
  const globalOpacity = useSharedValue(1);
  const horizonWidth = useSharedValue(0);
  const horizonOpacity = useSharedValue(0);

  const stars = useMemo<Star3D[]>(() => {
    return Array.from({ length: STAR_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * width * 3 - width,
      y: Math.random() * height * 3 - height,
      z: Math.random() * 1200 + 100,
      size: Math.random() * 0.8 + 0.2,
      rotationSpeed: (Math.random() - 0.5) * 5,
    }));
  }, [width, height]);

  const constellations = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < STAR_COUNT - 1; i += 4) {
      pairs.push({ s1: stars[i], s2: stars[i + 1] });
    }
    return pairs;
  }, [stars]);

  useEffect(() => {
    // Loop de 80 segundos (muito mais lento e suave)
    time.value = withRepeat(withTiming(100, { duration: 80000, easing: Easing.linear }), -1);

    horizonOpacity.value = withTiming(0.8, { duration: 2500, easing: Easing.out(Easing.cubic) });
    horizonWidth.value = withTiming(width, { duration: 3000, easing: Easing.out(Easing.exp) });

    const timer = setTimeout(() => {
      globalOpacity.value = withTiming(0, { duration: 1500, easing: Easing.out(Easing.ease) });
      onAnimationEnd();
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const horizonRect = useDerivedValue(() => ({
    x: (width - horizonWidth.value) / 2,
    y: height / 2 - 2,
    w: horizonWidth.value,
    h: 4,
  }));

  return (
    <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
      <Group opacity={globalOpacity}>
        <Group opacity={horizonOpacity}>
          <Rect rect={horizonRect} color={HZ_BRAND}>
            <BlurMask blur={20} style="normal" />
          </Rect>
          <Rect rect={useDerivedValue(() => ({ ...horizonRect.value, h: 1, y: height / 2 }))} color="#FFFFFF" />
        </Group>

        {constellations.map((pair, i) => (
          <ConstellationLine key={`line-${i}`} star1={pair.s1} star2={pair.s2} time={time} width={width} height={height} />
        ))}

        {stars.map((star) => (
          <Star key={`star-${star.id}`} data={star} time={time} width={width} height={height} />
        ))}
      </Group>
    </Canvas>
  );
};