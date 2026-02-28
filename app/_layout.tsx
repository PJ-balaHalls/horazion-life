import { Stack } from 'expo-router';
import '../src/styles/global.css'; // Essencial para o Tailwind funcionar

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
    </Stack>
  );
}