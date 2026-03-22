import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight } from 'react-native-reanimated';
import { User, ShieldCheck, ArrowLeft, Building2, Lock, Mail } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Imports de Core e Design System
import { useAuthStore } from '../../src/store/useAuthStore'; // Certifique-se de renomear para .ts
import { ModernInput } from '../../src/components/auth/ModernInput';
import { supabase } from '../../src/lib/supabase';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";

export default function LoginScreen() {
  const router = useRouter();
  const { currentScene, setScene, setTempUser, tempUser, reset } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);

  // Lógica: Validação Institucional via RPC
  const handleVerifyCpf = async () => {
    if (cpf.length < 11) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('check_institutional_access', { p_cpf: cpf });
      if (error) throw error;

      if (data && data[0]?.user_exists) {
        setTempUser(data[0].user_name, cpf);
        setScene('PASSWORD_SET');
      } else {
        Alert.alert("HZ-AUTH_404", "Documento não localizado no ecossistema.");
      }
    } catch (err) {
      Alert.alert("Erro Técnico", "Falha ao conectar com o serviço de identidade.");
    } finally {
      setLoading(false);
    }
  };

  // Lógica: Login Tradicional
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Redirecionamento automático via Auth Guard (próximo passo)
    } catch (err: any) {
      Alert.alert("Erro de Acesso", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} bounces={false}>
        <View style={styles.scene}>
          
          {currentScene === 'CHOICE' && (
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
              <ModernInput label="CPF" placeholder="000.000.000-00" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
              <TouchableOpacity onPress={handleVerifyCpf} disabled={loading} style={styles.actionBtn}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.actionBtnText}>Verificar</Text>}
              </TouchableOpacity>
            </Animated.View>
          )}

          {currentScene === 'PASSWORD_SET' && (
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
  actionBtnText: { color: 'white', fontWeight: '800', textTransform: 'uppercase' }
});