// app/auth/login.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { User, ShieldCheck, ArrowLeft, Building2, Lock, Mail, AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Imports de Core e Design System
import { useAuthStore } from '../../src/store/useAuthStore'; 
import { ModernInput } from '../../src/components/auth/ModernInput';
import { supabase } from '../../src/lib/supabase';
import { AuthErrors, HorizionError } from '../../src/utils/errors';
import { isValidCPF, formatCPF } from '../../src/utils/validators';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";

export default function LoginScreen() {
  const router = useRouter();
  const { currentScene, setScene, setTempUser, tempUser, reset } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estado para o nosso Popup de Erro Customizado
  const [activeError, setActiveError] = useState<HorizionError | null>(null);

  const showError = (error: HorizionError) => {
    setActiveError(error);
    setTimeout(() => setActiveError(null), 5000); // Auto-dismiss após 5s
  };

  const handleVerifyCpf = async () => {
    const cleanCpf = cpf.replace(/\D/g, '');
    
    // 1. Validação Local (UX)
    if (!isValidCPF(cleanCpf)) {
      showError(AuthErrors.INVALID_CPF);
      return;
    }

    setLoading(true);
    try {
      // 2. Validação no Servidor (Zero Trust)
      const { data, error } = await supabase.rpc('check_institutional_access', { p_cpf: cleanCpf });
      
      if (error) throw error;

      if (data && data[0]?.user_exists) {
        setTempUser(data[0].user_name, cleanCpf);
        setScene('PASSWORD_SET');
      } else {
        showError(AuthErrors.USER_NOT_FOUND);
      }
    } catch (err) {
      showError(AuthErrors.NETWORK_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        showError(AuthErrors.INVALID_CREDENTIALS);
        return;
      }
      // Aqui entrará o roteamento para o ecossistema (próxima etapa)
    } catch (err) {
      showError(AuthErrors.NETWORK_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      
      {/* Sistema de Notificação Integrado (Horizon Clarity) */}
      {activeError && (
        <Animated.View entering={SlideInUp} exiting={SlideOutUp} style={styles.errorToast}>
          <AlertCircle color={HZ_RED} size={24} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.errorTitle}>{activeError.user_message}</Text>
            <Text style={styles.errorDesc}>{activeError.explanation}</Text>
            <Text style={styles.errorSol}>{activeError.solution} ({activeError.error_code})</Text>
          </View>
        </Animated.View>
      )}

      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} bounces={false}>
        <View style={styles.scene}>
          
          {currentScene === 'CHOICE' && (
             // ... [Seu código anterior do CHOICE mantido exatamente igual]
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Text style={styles.title}>Portal de Identidade</Text>
              <Text style={styles.subtitle}>Conecte-se ao seu ecossistema Horazion.</Text>
              
              <TouchableOpacity onPress={() => setScene('LOGIN')} style={styles.optionBtnMain}>
                <User color="white" size={20} />
                <Text style={styles.optionTextMain}>Login Pessoal</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setScene('INSTITUTIONAL')} style={styles.optionBtnSec}>
                <Building2 color={HZ_RED} size={20} />
                <View style={{ marginLeft: 16 }}>
                  <Text style={styles.optionTitleSec}>Acesso Institucional</Text>
                  <Text style={styles.optionDescSec}>Ativação via CPF</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          {currentScene === 'LOGIN' && (
            <Animated.View entering={SlideInRight}>
              <TouchableOpacity onPress={reset} style={styles.backBtn}><ArrowLeft color="#000" /></TouchableOpacity>
              <Text style={styles.sceneTitle}>Acesse sua conta</Text>
              <ModernInput label="E-mail" icon={Mail} value={email} onChangeText={setEmail} keyboardType="email-address" />
              <ModernInput label="Senha" icon={Lock} isPassword value={password} onChangeText={setPassword} />
              <TouchableOpacity onPress={handleLogin} disabled={loading} style={styles.actionBtn}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.actionBtnText}>Entrar</Text>}
              </TouchableOpacity>
            </Animated.View>
          )}

          {currentScene === 'INSTITUTIONAL' && (
            <Animated.View entering={SlideInRight}>
              <TouchableOpacity onPress={reset} style={styles.backBtn}><ArrowLeft color="#000" /></TouchableOpacity>
              <Text style={styles.sceneTitle}>Validação de Lastro</Text>
              <Text style={styles.sceneSubtitle}>Insira seu documento para localizar o pré-cadastro corporativo.</Text>
              
              {/* Note a máscara de CPF sendo aplicada no onChangeText */}
              <ModernInput 
                label="CPF" 
                placeholder="000.000.000-00" 
                value={cpf} 
                onChangeText={(text) => setCpf(formatCPF(text))} 
                keyboardType="numeric" 
                maxLength={14}
              />
              
              <TouchableOpacity onPress={handleVerifyCpf} disabled={loading} style={styles.actionBtn}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.actionBtnText}>Verificar</Text>}
              </TouchableOpacity>
            </Animated.View>
          )}

          {currentScene === 'PASSWORD_SET' && (
             // ... [Seu código anterior do PASSWORD_SET mantido]
            <Animated.View entering={FadeIn}>
              <ShieldCheck color={HZ_RED} size={48} style={{ marginBottom: 24 }} />
              <Text style={styles.sceneTitle}>Olá, {tempUser?.name}!</Text>
              <Text style={styles.sceneSubtitle}>Conta localizada. Defina a sua senha para ativar o acesso.</Text>
              <ModernInput label="Nova Senha" isPassword value={password} onChangeText={setPassword} />
              <ModernInput label="Confirmar Senha" isPassword />
              <TouchableOpacity style={styles.actionBtnRed}>
                <Text style={styles.actionBtnText}>Ativar Acesso</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scene: { flex: 1, justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 40 },
  title: { fontSize: 34, fontWeight: '900', color: HZ_BLACK, marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#71717A', marginBottom: 48 },
  optionBtnMain: { flexDirection: 'row', alignItems: 'center', backgroundColor: HZ_BLACK, height: 64, borderRadius: 20, paddingHorizontal: 24, marginBottom: 16 },
  optionTextMain: { color: 'white', fontWeight: '700', marginLeft: 16 },
  optionBtnSec: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#F4F4F5', height: 64, borderRadius: 20, paddingHorizontal: 24, backgroundColor: '#FAFAFA' },
  optionTitleSec: { fontWeight: '700', color: HZ_BLACK },
  optionDescSec: { fontSize: 12, color: '#A1A1AA' },
  backBtn: { marginBottom: 32 },
  sceneTitle: { fontSize: 26, fontWeight: '800', color: HZ_BLACK, marginBottom: 8 },
  sceneSubtitle: { fontSize: 14, color: '#71717A', marginBottom: 32, lineHeight: 22 },
  actionBtn: { backgroundColor: HZ_BLACK, height: 58, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  actionBtnRed: { backgroundColor: HZ_RED, height: 58, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  actionBtnText: { color: 'white', fontWeight: '800', textTransform: 'uppercase' },
  
  // Estilos do novo Toast de Erro
  errorToast: {
    position: 'absolute', top: 60, left: 20, right: 20, zIndex: 100,
    backgroundColor: '#FFF', padding: 16, borderRadius: 16,
    flexDirection: 'row', alignItems: 'flex-start',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5,
    borderLeftWidth: 4, borderLeftColor: HZ_RED
  },
  errorTitle: { fontWeight: '700', color: HZ_BLACK, fontSize: 14, marginBottom: 2 },
  errorDesc: { color: '#52525B', fontSize: 13, marginBottom: 4 },
  errorSol: { color: '#A1A1AA', fontSize: 11, fontWeight: '600' }
});