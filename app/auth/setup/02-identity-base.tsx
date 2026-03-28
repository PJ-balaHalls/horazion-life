// app/auth/setup/02-identity-base.tsx
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Box, Text } from '@shopify/restyle';
import { SceneContainer } from '../../../src/components/molecules/SceneContainer';
import { ClarityInput } from '../../../src/components/atoms/ClarityInput';
import { ClarityButton } from '../../../src/components/atoms/ClarityButton';
import { useSetupStore } from '../../../src/store/useSetupStore';

export default function IdentityBaseScene() {
  const router = useRouter();
  const { setTempData, nextScene, prevScene } = useSetupStore();
  
  const [horizionId, setHorizionId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    // Validação de formato obrigatória: deve começar com @ e não ter espaços
    if (!horizionId.startsWith('@') || horizionId.includes(' ')) {
      setError('O HorizionID deve começar com @ e não conter espaços.');
      return;
    }

    // Futuro: Chamada RPC para garantir que o ID não existe no BD
    
    setTempData({ horizionId, firstName: displayName });
    nextScene();
    router.push('/auth/setup/03-security-choice');
  };

  return (
    <SceneContainer>
      <Box marginBottom="xl">
        <Text variant="subText" color="gray1" onPress={() => { prevScene(); router.back(); }}>← Voltar</Text>
        <Text variant="h1" marginTop="m">Sua Identidade Digital</Text>
        <Text variant="body" color="gray1" marginTop="s">
          O HorizionID é único, permanente e universal para todo o ecossistema.
        </Text>
      </Box>

      <ClarityInput
        label="HorizionID"
        placeholder="@nome_sobrenome"
        value={horizionId}
        onChangeText={(text) => {
          setError('');
          // Força o @ no início e lowercase
          let formatted = text.toLowerCase().replace(/\s/g, '');
          if (!formatted.startsWith('@') && formatted.length > 0) formatted = '@' + formatted;
          setHorizionId(formatted);
        }}
        error={error}
        autoCapitalize="none"
      />

      <ClarityInput
        label="Nome de Exibição"
        placeholder="Como quer ser chamado?"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <Box marginTop="xl">
        <ClarityButton 
          label="Definir Identidade" 
          onPress={handleNext} 
          disabled={horizionId.length < 3 || !displayName}
        />
      </Box>
    </SceneContainer>
  );
}