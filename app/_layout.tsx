import { Stack } from 'expo-router';
import '../src/styles/global.css';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      {/* ⚠️ MANTENHA COMENTADO ATÉ CRIAR O ARQUIVO app/login.tsx */}
      {/* <Stack.Screen name="login" /> */}
    </Stack>
  );
}