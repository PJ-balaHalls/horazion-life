import React, { useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, Group, BlurMask, Rect, Path, Skia } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

// CONFIGURAÇÃO DE SEGURANÇA E PERFORMANCE
const STAR_COUNT = 80; 
const HZ_BRAND = "#B6192E";
const HZ_WHITE = "#FFFFFF";

// SVG Otimizado
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
  onAnimationEnd?: () => void;
}

const project3D = (star: Star3D, timeVal: number, width: number, height: number) => {
  "worklet";
  let currentZ = star.z - (timeVal * 150); 
  if (currentZ < 1) currentZ = 1200 + (currentZ % 1200);
  
  const perspective = 300 / (currentZ || 1);
  const projectedX = (star.x - width / 2) * perspective + width / 2;
  const projectedY = (star.y - height / 2) * perspective + height / 2;
  const scale = Math.max(0.0, perspective * star.size);
  const opacity = interpolate(currentZ, [0, 100, 800, 1200], [0, 1, 0.6, 0]);
  
  return { projectedX, projectedY, scale, opacity, rotation: timeVal * star.rotationSpeed };
};

const StarComponent = ({ data, time, width, height }: { data: Star3D; time: any; width: number; height: number }) => {
  const transform = useDerivedValue(() => {
    const p = project3D(data, time.value, width, height);
    return [
      { translateX: p.projectedX },
      { translateY: p.projectedY },
      { scale: p.scale },
      { rotate: p.rotation },
      { translateX: -12 },
      { translateY: -12 },
    ];
  });

  const opacity = useDerivedValue(() => project3D(data, time.value, width, height).opacity);

  return (
    <Group transform={transform} opacity={opacity}>
      <Path path={skiaStarPath} color={HZ_WHITE} style="fill" />
    </Group>
  );
};

export const HorazionGalaxy = ({ onAnimationEnd }: Props) => {
  const { width, height } = useWindowDimensions();
  const time = useSharedValue(0);
  const globalOpacity = useSharedValue(0);
  const horizonWidth = useSharedValue(0);

  const stars = useMemo<Star3D[]>(() => {
    return Array.from({ length: STAR_COUNT }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * width * 5, 
      y: (Math.random() - 0.5) * height * 5,
      z: Math.random() * 1200,
      size: Math.random() * 0.6 + 0.2,
      rotationSpeed: (Math.random() - 0.5) * 3,
    }));
  }, [width, height]);

  useEffect(() => {
    globalOpacity.value = withTiming(1, { duration: 1500 });
    
    // Easing Linear para loop infinito (seguro)
    time.value = withRepeat(
      withTiming(100, { duration: 40000, easing: Easing.linear }), 
      -1
    );

    // Easing Bezier para o horizonte (seguro)
    horizonWidth.value = withTiming(width * 0.9, { 
      duration: 3000, 
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
    });

    if (onAnimationEnd) {
      const timer = setTimeout(onAnimationEnd, 5000); 
      return () => clearTimeout(timer);
    }
  }, []);

  // --- SOLUÇÃO DEFINITIVA: Decomposição de Valores ---
  // Em vez de passar um objeto {x,y,w,h} que o Skia pode não entender,
  // passamos valores primitivos derivados. É à prova de falhas.
  
  const rX = useDerivedValue(() => (width - horizonWidth.value) / 2);
  const rY = useDerivedValue(() => height / 2);
  const rWidth = useDerivedValue(() => horizonWidth.value);
  // Altura fixa não precisa de derived value se não animar, mas para compatibilidade mantemos simples
  const rHeight = 2; 

  return (
    <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
      <Group opacity={globalOpacity}>
        {stars.map((star) => (
          <StarComponent 
            key={star.id} 
            data={star} 
            time={time} 
            width={width} 
            height={height} 
          />
        ))}

        {/* HORIZONTE BLINDADO */}
        <Group>
          {/* Passando props individuais: x, y, width, height. Zero ambiguidade. */}
          <Rect 
            x={rX} 
            y={rY} 
            width={rWidth} 
            height={rHeight} 
            color={HZ_BRAND} 
            opacity={0.8}
          >
             <BlurMask blur={20} style="normal" />
          </Rect>
          
          <Rect 
            x={rX} 
            y={rY} 
            width={rWidth} 
            height={rHeight} 
            color={HZ_WHITE} 
            opacity={0.6} 
          />
        </Group>
      </Group>
    </Canvas>
  );
};