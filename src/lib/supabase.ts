import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import "react-native-url-polyfill/auto";

// 1. Prevenção de Crash: Se não houver chaves, usa placeholders para não travar o app
const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL || "https://sua-url.supabase.co";
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "sua-anon-key";

// 2. Log de Aviso para você saber se está conectado ou não
if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
  console.warn(
    "⚠️ AVISO: Variáveis de ambiente do Supabase não encontradas. O Auth não funcionará.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
