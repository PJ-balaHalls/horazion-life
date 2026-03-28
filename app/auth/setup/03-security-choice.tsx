// app/auth/setup/03-security-choice.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Box, Text } from '@shopify/restyle';
import { SceneContainer } from '../../../src/components/molecules/SceneContainer';
import { useSetupStore } from '../../../src/store/useSetupStore';

export default function SecurityChoiceScene() {
  const router = useRouter();
  const { setTempData, nextScene, prevScene } = useSetupStore();

  const handleSelectMethod = (method: 'password' | 'pin' | 'pattern') => {
    setTempData({ securityType: method });
    nextScene();
    router.push('/auth/setup/04-security-setup');
  };

  const SecurityOption = ({ title, desc, method }: { title: string, desc: string, method: 'password' | 'pin' | 'pattern' }) => (
    <TouchableOpacity onPress={() => handleSelectMethod(method)} activeOpacity={0.7}>
      <Box 
        padding="m" 
        backgroundColor="gray3" 
        borderRadius="m" 
        marginBottom="m"
        borderWidth={1}
        borderColor="gray2"
      >
        <Text variant="h2" fontSize={18} marginBottom="xs">{title}</Text>
        <Text variant="subText">{desc}</Text>
      </Box>
    </TouchableOpacity>
  );

  return (
    <SceneContainer>
      <Box marginBottom="xl">
        <Text variant="subText" color="gray1" onPress={() => { prevScene(); router.back(); }}>← Voltar</Text>
        <Text variant="h1" marginTop="m">Arquitetura de Segurança</Text>
        <Text variant="body" color="gray1" marginTop="s">
          Como você prefere proteger sua entrada no ecossistema?
        </Text>
      </Box>

      <SecurityOption 
        title="Senha Alfanumérica" 
        desc="A clássica combinação de letras, números e símbolos." 
        method="password" 
      />
      <SecurityOption 
        title="PIN Numérico (8 dígitos)" 
        desc="Mais rápido para dispositivos móveis, sem perder a força." 
        method="pin" 
      />
      <SecurityOption 
        title="Padrão Geométrico" 
        desc="Desenhe um padrão complexo em uma matriz. (Em breve)" 
        method="pattern" 
      />
    </SceneContainer>
  );
}