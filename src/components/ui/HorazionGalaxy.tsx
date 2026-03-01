import React, { useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Canvas, Group, BlurMask, Rect, Path, Skia } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

// ARCH-HZ: Design System "Horizon Clarity" - WHITE MODE
const PARTICLE_COUNT = 50; // Quantidade refinada para elegância
const HZ_BRAND = "#B6192E"; // Vermelho Puro
const HZ_BG = "#FFFFFF";    // Branco Puro

// Geometria: Losango Minimalista (Diamante)
const PARTICLE_SVG = "M10 0L20 10L10 20L0 10Z";
const skiaParticlePath = Skia.Path.MakeFromSVGString(PARTICLE_SVG)!;

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
  // Movimento Z: As estrelas vêm do fundo para a tela (positivo)
  let currentZ = star.z - (timeVal * 80); 
  
  // Loop infinito suave
  if (currentZ < 1) currentZ = 1200 + (currentZ % 1200);
  
  const perspective = 350 / (currentZ || 1);
  const projectedX = (star.x - width / 2) * perspective + width / 2;
  const projectedY = (star.y - height / 2) * perspective + height / 2;
  
  const scale = Math.max(0.0, perspective * star.size * 0.5);
  
  // Opacidade: Transparência calculada para não "estourar" na tela
  // Longe (1200) -> 0
  // Médio (600) -> 0.8
  // Perto (100) -> 0 (desaparece antes de bater na lente)
  const opacity = interpolate(currentZ, [0, 150, 600, 1200], [0, 1, 0.6, 0]);
  
  return { projectedX, projectedY, scale, opacity, rotation: timeVal * star.rotationSpeed };
};

const ParticleComponent = ({ data, time, width, height }: { data: Star3D; time: any; width: number; height: number }) => {
  const transform = useDerivedValue(() => {
    const p = project3D(data, time.value, width, height);
    return [
      { translateX: p.projectedX },
      { translateY: p.projectedY },
      { scale: p.scale },
      { rotate: p.rotation },
      { translateX: -10 }, // Ajuste de centro do SVG 20x20
      { translateY: -10 },
    ];
  });

  const opacity = useDerivedValue(() => project3D(data, time.value, width, height).opacity);

  return (
    <Group transform={transform} opacity={opacity}>
      {/* COR VERMELHA DA MARCA NAS ESTRELAS */}
      <Path path={skiaParticlePath} color={HZ_BRAND} style="fill" />
    </Group>
  );
};

export const HorazionGalaxy = ({ onAnimationEnd }: Props) => {
  const { width, height } = useWindowDimensions();
  const time = useSharedValue(0);
  const globalOpacity = useSharedValue(0);
  const horizonWidth = useSharedValue(0);

  const particles = useMemo<Star3D[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * width * 4, // Espalhar bem
      y: (Math.random() - 0.5) * height * 4,
      z: Math.random() * 1200,
      size: Math.random() * 0.8 + 0.3, 
      rotationSpeed: (Math.random() - 0.5) * 1.5,
    }));
  }, [width, height]);

  useEffect(() => {
    globalOpacity.value = withTiming(1, { duration: 1500 });
    
    // Animação Contínua
    time.value = withRepeat(
      withTiming(100, { duration: 50000, easing: Easing.linear }), 
      -1
    );

    // Horizonte Expandindo
    horizonWidth.value = withTiming(width * 0.85, { 
      duration: 2500, 
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
    });

    if (onAnimationEnd) {
      const timer = setTimeout(onAnimationEnd, 5000); 
      return () => clearTimeout(timer);
    }
  }, []);

  // Decomposição segura para o Skia (Evita crash no Android)
  const rX = useDerivedValue(() => (width - horizonWidth.value) / 2);
  const rY = useDerivedValue(() => height / 2);
  const rWidth = useDerivedValue(() => horizonWidth.value);
  const rHeight = 1; // Linha ultra-fina

  return (
    // FORÇANDO FUNDO BRANCO NA VIEW CONTAINER
    <View style={[StyleSheet.absoluteFill, { backgroundColor: HZ_BG }]}>
      <Canvas style={{ flex: 1 }} pointerEvents="none">
        <Group opacity={globalOpacity}>
          {particles.map((p) => (
            <ParticleComponent 
              key={p.id} 
              data={p} 
              time={time} 
              width={width} 
              height={height} 
            />
          ))}

          {/* Horizonte Vermelho */}
          <Group>
            {/* Glow Sutil */}
            <Rect 
              x={rX} y={rY} width={rWidth} height={4} 
              color={HZ_BRAND} 
              opacity={0.3}
            >
              <BlurMask blur={8} style="normal" />
            </Rect>
            
            {/* Linha Sólida */}
            <Rect 
              x={rX} y={rY} width={rWidth} height={rHeight} 
              color={HZ_BRAND} 
              opacity={1} 
            />
          </Group>
        </Group>
      </Canvas>
    </View>
  );
};