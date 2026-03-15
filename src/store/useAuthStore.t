import { create } from 'zustand';

type AuthScene = 'CHOICE' | 'LOGIN' | 'INSTITUTIONAL' | 'PASSWORD_SET';

interface AuthState {
  currentScene: AuthScene;
  isLoading: boolean;
  tempUser: { name: string; cpf: string } | null;
  setScene: (scene: AuthScene) => void;
  setTempUser: (name: string, cpf: string) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentScene: 'CHOICE',
  isLoading: false,
  tempUser: null,
  setScene: (scene) => set({ currentScene: scene }),
  setTempUser: (name, cpf) => set({ tempUser: { name, cpf } }),
  reset: () => set({ currentScene: 'CHOICE', tempUser: null, isLoading: false }),
}));