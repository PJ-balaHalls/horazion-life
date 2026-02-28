// src/store/usePerceptionStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface PerceptionState {
  // Luminosidade e Base
  luminance: "light" | "dark" | "black"; // Black = OLED/Minimalismo total [cite: 910]

  // Acessibilidade Visual [cite: 211, 1035]
  contrast: "normal" | "high" | "ultra";
  colorBlindness: "none" | "protanopia" | "deuteranopia" | "tritanopia";
  dyslexiaMode: boolean; // Ativa tipografia OpenDyslexic [cite: 214]

  // Resposta Motora e Sensorial
  motionReduction: boolean; // Reduz animações para evitar fadiga [cite: 706]
  fontSizeScale: 0.8 | 1.0 | 1.2 | 1.4 | 1.6; // Escala tipográfica adaptativa [cite: 933]

  // Estilo de Notificação [cite: 622]
  notificationStyle: "minimal" | "detailed" | "intrusive";
}

interface PerceptionStore {
  state: PerceptionState;
  updatePerception: (updates: Partial<PerceptionState>) => void;
  resetToDefaults: () => void;
}

export const usePerceptionStore = create<PerceptionStore>()(
  persist(
    (set) => ({
      state: {
        luminance: "light",
        contrast: "normal",
        colorBlindness: "none",
        dyslexiaMode: false,
        motionReduction: false,
        fontSizeScale: 1.0,
        notificationStyle: "detailed",
      },
      updatePerception: (updates) =>
        set((prev) => ({ state: { ...prev.state, ...updates } })),
      resetToDefaults: () =>
        set({
          state: {
            luminance: "light",
            contrast: "normal",
            colorBlindness: "none",
            dyslexiaMode: false,
            motionReduction: false,
            fontSizeScale: 1.0,
            notificationStyle: "detailed",
          },
        }),
    }),
    {
      name: "hz-perception-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
