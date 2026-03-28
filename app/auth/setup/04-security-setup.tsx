// app/auth/setup/04-security-setup.tsx
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Box, Text } from '@shopify/restyle';
import { SceneContainer } from '../../../src/components/molecules/SceneContainer';
import { ClarityInput } from '../../../src/components/atoms/ClarityInput';
import { ClarityButton } from '../../../src/components/atoms/ClarityButton';
import { useSetupStore } from '../../../src/store/useSetupStore';

export default function SecuritySetupScene() {
  const router = useRouter();
  const { tempData, nextScene, prevScene } = useSetupStore();
  const securityType = tempData.securityType || 'password';

  const [credential, setCredential] = useState('');
  const [confirmCredential, setConfirmCredential] = useState('');
  const [error, setError] = useState('');

  const isPin = securityType === 'pin';

  const handleNext = () => {
    if (credential !== confirmCredential) {
      setError('As credenciais não coincidem.');
      return;
    }
    if (isPin && credential.length !== 8) {
      setError('O PIN deve ter exatamente 8 números.');
      return;
    }
    if (!isPin && credential.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    // Como o backend salva strings, o frontend apenas mapeia a UI.
    // Salvamos a string final na store antes de enviar ao banco.
    nextScene();
    router.push('/auth/setup/05-universes'); // Rumo aos Blocos Vivos
  };

  return (
    <SceneContainer>
      <Box marginBottom="xl">
        <Text variant="subText" color="gray1" onPress={() => { prevScene(); router.back(); }}>← Voltar</Text>
        <Text variant="h1" marginTop="m">Sua Chave Mestra</Text>
        <Text variant="body" color="gray1" marginTop="s">
          {isPin ? 'Defina seu PIN de 8 dígitos.' : 'Defina sua senha forte.'}
        </Text>
      </Box>

      {securityType === 'pattern' ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text variant="body" color="horazionRed">A implementação do Padrão Geométrico visual requer uma lib externa (ex: react-native-pattern-lock). Recomendo focar no PIN/Password primeiro.</Text>
        </Box>
      ) : (
        <>
          <ClarityInput
            label={isPin ? "Novo PIN (8 números)" : "Nova Senha"}
            placeholder={isPin ? "00000000" : "••••••••"}
            value={credential}
            onChangeText={setCredential}
            secureTextEntry
            keyboardType={isPin ? "numeric" : "default"}
            maxLength={isPin ? 8 : 32}
            error={error}
          />

          <ClarityInput
            label="Confirme a Credencial"
            placeholder={isPin ? "00000000" : "••••••••"}
            value={confirmCredential}
            onChangeText={(text) => { setConfirmCredential(text); setError(''); }}
            secureTextEntry
            keyboardType={isPin ? "numeric" : "default"}
            maxLength={isPin ? 8 : 32}
          />

          <Box marginTop="xl">
            <ClarityButton 
              label="Gravar Credencial" 
              onPress={handleNext} 
              disabled={!credential || !confirmCredential}
            />
          </Box>
        </>
      )}
    </SceneContainer>
  );
}