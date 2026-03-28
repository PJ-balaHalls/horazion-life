// app/auth/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Box, Text } from '@shopify/restyle';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ClarityInput } from '../../src/components/atoms/ClarityInput';
import { ClarityButton } from '../../src/components/atoms/ClarityButton';

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState(''); // Pode ser HorizionID ou Email
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    
    // CORE-HZ: Simulação de chamada ao backend (Supabase)
    setTimeout(() => {
      setIsLoading(false);
      
      // Cenário 1: Usuário criado pelo Admin, conta "pending_completion"
      // Aqui interceptamos e mandamos para a Cena 1 de reivindicação.
      if (password === 'temp123') { 
        router.replace('/auth/setup/01-identity');
        return;
      }

      // Cenário 2: Usuário ativo (Login normal)
      if (identifier === '@admin' && password === 'admin') {
        router.replace('/(tabs)'); // Rota principal do app
      } else {
        alert('Credenciais inválidas. (Use senha "temp123" para testar o setup)');
      }
    }, 1500);
  };

  return (
    <Box flex={1} backgroundColor="bg" paddingHorizontal="xl" justifyContent="center">
      <Animated.View entering={FadeInDown.duration(800)}>
        {/* Logo/Marca Institucional */}
        <Box marginBottom="xxl" alignItems="center">
          <Text variant="h1" letterSpacing={-1}>HORAZION</Text>
          <Text variant="subText" color="gray1" letterSpacing={4}>LIFE</Text>
        </Box>

        <Box marginBottom="l">
          <Text variant="h2" marginBottom="s">Acesso ao Ecossistema</Text>
          <Text variant="body" color="gray1">Insira sua identidade para continuar.</Text>
        </Box>

        <ClarityInput
          label="HorizionID ou E-mail"
          placeholder="@seu_id ou e-mail"
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
        />

        <ClarityInput
          label="Credencial de Segurança"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Box marginTop="l">
          <ClarityButton 
            label="Entrar" 
            onPress={handleLogin} 
            isLoading={isLoading}
            disabled={!identifier || !password}
          />
        </Box>

        <Box marginTop="xl" alignItems="center">
          <Text variant="subText">Ainda não possui uma identidade digital?</Text>
          <Text 
            variant="subText" 
            color="horazionRed" 
            fontWeight="bold" 
            marginTop="xs"
            onPress={() => router.push('/welcome')}
          >
            Conheça o Horazion Life
          </Text>
        </Box>
      </Animated.View>
    </Box>
  );
}