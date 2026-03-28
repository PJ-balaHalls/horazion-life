// src/store/useSetupStore.ts
import { create } from 'zustand';

interface SetupState {
  currentScene: number;
  totalScenes: number;
  
  // Dados do Cidadão (efêmero até a finalização)
  tempData: {
    cpf?: string;
    firstName?: string; // Do Admin
    horizionId?: string;
    securityType?: 'password' | 'pin' | 'pattern';
    universes?: string[];
  };

  // Ações
  nextScene: () => void;
  prevScene: () => void;
  setTempData: (data: Partial<SetupState['tempData']>) => void;
}

export const useSetupStore = create<SetupState>((set) => ({
  currentScene: 1,
  totalScenes: 7, // Conforme o novo fluxograma
  tempData: {},

  nextScene: () => set((state) => ({ 
    currentScene: Math.min(state.currentScene + 1, state.totalScenes) 
  })),
  prevScene: () => set((state) => ({ 
    currentScene: Math.max(state.currentScene - 1, 1) 
  })),
  setTempData: (data) => set((state) => ({
    tempData: { ...state.tempData, ...data }
  })),
}));