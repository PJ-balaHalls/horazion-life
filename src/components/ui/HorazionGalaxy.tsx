import React, { useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Canvas, Group, Path, Skia } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

const STAR_COUNT = 250; 
const HZ_BRAND = "#B6192E"; 
const HZ_BG = "#FFFFFF";

const NEEDLE_STAR_SVG = "M12 0 C12.5 8 16 11.5 24 12 C16 12.5 12.5 16 12 24 C11.5 16 8 12.5 0 12 C8 11.5 11.5 8 12 0 Z";
const skiaStarPath = Skia.Path.MakeFromSVGString(NEEDLE_STAR_SVG)!;

interface Star3D { id: number; x: number; y: number; z: number; size: number; rotationSpeed: number; randomOffset: number; }

const project3D = (star: Star3D, timeVal: number, width: number, height: number) => {
  "worklet";
  let currentZ = star.z - (timeVal * 8); 
  if (currentZ < 1) currentZ = 2000 + (currentZ % 2000);
  
  const perspective = 300 / (currentZ || 1);
  const projectedX = (star.x - width / 2) * perspective + width / 2;
  const projectedY = (star.y - height / 2) * perspective + height / 2;
  const scale = Math.max(0.0, perspective * star.size * 2.5); // Escala aumentada
  const opacity = interpolate(currentZ, [0, 100, 1500, 2000], [0, 1, 0.5, 0]);
  const rotation = timeVal * star.rotationSpeed + star.randomOffset;

  return { projectedX, projectedY, scale, opacity, rotation };
};

const StarComponent = ({ data, time, width, height }: { data: Star3D; time: any; width: number; height: number }) => {
  const transform = useDerivedValue(() => {
    const p = project3D(data, time.value, width, height);
    return [
      { translateX: p.projectedX }, { translateY: p.projectedY },
      { scale: p.scale }, { rotate: p.rotation },
      { translateX: -12 }, { translateY: -12 },
    ];
  });
  const opacity = useDerivedValue(() => project3D(data, time.value, width, height).opacity);
  return (
    <Group transform={transform} opacity={opacity}>
      <Path path={skiaStarPath} color={HZ_BRAND} style="fill" />
    </Group>
  );
};

export const HorazionGalaxy = () => {
  const { width, height } = useWindowDimensions();
  const time = useSharedValue(0);
  const globalOpacity = useSharedValue(0);

  const stars = useMemo<Star3D[]>(() => 
    Array.from({ length: STAR_COUNT }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * width * 10,
      y: (Math.random() - 0.5) * height * 10,
      z: Math.random() * 2000,
      size: Math.random() * 0.7 + 0.3,
      rotationSpeed: (Math.random() - 0.5) * 0.4,
      randomOffset: Math.random() * Math.PI * 2,
    })), [width, height]);

  useEffect(() => {
    globalOpacity.value = withTiming(1, { duration: 2000 });
    time.value = withRepeat(withTiming(1000, { duration: 60000, easing: Easing.linear }), -1);
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: HZ_BG }]}>
      <Canvas style={{ flex: 1 }} pointerEvents="none">
        <Group opacity={globalOpacity}>
          {stars.map((star) => <StarComponent key={star.id} data={star} time={time} width={width} height={height} />)}
        </Group>
      </Canvas>
    </View>
  );
};