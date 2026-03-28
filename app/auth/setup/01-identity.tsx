// app/auth/setup/01-identity.tsx
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Box, Text } from '@shopify/restyle';
import { SceneContainer } from '../../../src/components/molecules/SceneContainer';
import { ClarityInput } from '../../../src/components/atoms/ClarityInput';
import { ClarityButton } from '../../../src/components/atoms/ClarityButton';
import { useSetupStore } from '../../../src/store/useSetupStore';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

// Código provisório de validação (simulando server-side)
const MASTER_CLAIM_CODE = '123456';

export default function IdentityScene() {
  const router = useRouter();
  const { setTempData, nextScene } = useSetupStore();

  const [cpf, setCpf] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Controle de sub-fase (UX)
  const [step, setStep] = useState<'cpf' | 'code'>('cpf');

  const handleValidateCpf = () => {
    setError('');
    // Validação básica de formato de CPF (pode usar utils/validatorsfuturamente)
    if (cpf.length < 11) {
      setError('CPF inválido.');
      return;
    }
    
    // Simula verificação se o CPF existe no banco (no Horazion Admin)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Suponhamos que o CPF existe
      setStep('code'); 
    }, 1000);
  };

  const handleValidateCode = () => {
    setError('');
    setIsLoading(true);
    
    // Validação lógica Provisória
    setTimeout(() => {
      if (code === MASTER_CLAIM_CODE) {
        // Sucesso: Salva o CPF validado e avança
        setTempData({ cpf });
        setIsLoading(false);
        nextScene();
        // router.push('/auth/setup/02-identity'); // Próxima rota
        alert('Código Aceito. Avançando para criação de ID (Implementar rota)');
      } else {
        setIsLoading(false);
        setError('Código de verificação incorreto.');
      }
    }, 1500);
  };

  return (
    <SceneContainer>
      <Box marginBottom="xl">
        <Text variant="subText" color="horazionRed" fontWeight="bold">REIVINDICAR IDENTIDADE</Text>
        <Text variant="h1" marginTop="xs">Gateway</Text>
        <Text variant="body" color="gray1" marginTop="s">
          Para acessar sua infraestrutura digital pré-criada, confirme sua identidade.
        </Text>
      </Box>

      {step === 'cpf' && (
        <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
          <ClarityInput
            label="Seu CPF"
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            maxLength={11} // Sem máscara por enquanto
          />
          <Box marginTop="l">
            <ClarityButton 
              label="Verificar CPF" 
              onPress={handleValidateCpf} 
              isLoading={isLoading}
              disabled={!cpf}
            />
          </Box>
        </Animated.View>
      )}

      {step === 'code' && (
        <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
          <Text variant="body" color="dark2" marginBottom="m">
            Um código de verificação provisório foi gerado. Use <Text fontWeight="bold">{MASTER_CLAIM_CODE}</Text>.
          </Text>
          <ClarityInput
            label="Código de Verificação"
            placeholder="000000"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
            error={error}
          />
          <Box marginTop="l">
            <ClarityButton 
              label="Confirmar Código" 
              onPress={handleValidateCode} 
              isLoading={isLoading}
              disabled={code.length < 6}
            />
          </Box>
        </Animated.View>
      )}
    </SceneContainer>
  );
}