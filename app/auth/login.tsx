import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight } from 'react-native-reanimated';
import { User, ShieldCheck, ArrowLeft, Building2, Lock, Mail } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Imports de Core e Design System
import { useAuthStore } from '../../src/store/useAuthStore';
import { ModernInput } from '../../src/components/auth/ModernInput';
import { supabase } from '../../src/lib/supabase';

const { width } = Dimensions.get('window');
const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";

export default function LoginScreen() {
  const router = useRouter();
  const { currentScene, setScene, setTempUser, tempUser, reset } = useAuthStore();
  
  // Estados Locais para Formulários
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Validação de Lastro Institucional
   * Chama a RPC check_institutional_access para validar pré-cadastros[cite: 1].
   */
  const handleVerifyCpf = async () => {
    if (cpf.length < 11) return;
    setLoading(true);
    
    try {
      const { data, error } = await supabase.rpc('check_institutional_access', { p_cpf: cpf });
      
      if (error) throw error;

      if (data && data[0]?.user_exists) {
        // Se o usuário já estiver ativado, redireciona para o login tradicional
        if (data[0].is_activated) {
          alert("Sua conta já está ativa. Por favor, utilize o Login Pessoal.");
          setScene('LOGIN');
        } else {
          setTempUser(data[0].user_name, cpf);
          setScene('PASSWORD_SET');
        }
      } else {
        alert("HZ-AUTH_404: Documento não localizado no ecossistema Horazion.");
      }
    } catch (err) {
      console.error("[HZ-SYSTEM] Erro na verificação institucional:", err);
      alert("Falha técnica ao conectar com o serviço de identidade.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login Tradicional (E-mail e Senha) [cite: 5]
   */
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace('/(tabs)/feed'); // Caminho sugerido para o Life Feed
    } catch (err: any) {
      alert(err.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={styles.inner}>
          
          {/* CENA 1: ESCOLHA DE ENTRADA (IDENTIDADE) */}
          {currentScene === 'CHOICE' && (
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.scene}>
              <Text style={styles.title}>Identidade Digital</Text>
              <Text style={styles.subtitle}>O portal para o seu Sistema Operativo Social.</Text>
              
              <TouchableOpacity onPress={() => setScene('LOGIN')} style={styles.optionBtnMain}>
                <User color="white" size={20} />
                <Text style={styles.optionTextMain}>Login Pessoal</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setScene('INSTITUTIONAL')} style={styles.optionBtnSec}>
                <Building2 color={HZ_RED} size={20} />
                <View style={{ marginLeft: 16 }}>
                  <Text style={styles.optionTitleSec}>Acesso Institucional</Text>
                  <Text style={styles.optionDescSec}>Ativação via CPF/Documento</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* CENA 2: LOGIN TRADICIONAL */}
          {currentScene === 'LOGIN' && (
            <Animated.View entering={SlideInRight} style={styles.scene}>
              <TouchableOpacity onPress={reset} style={styles.backBtn}><ArrowLeft color="#000" /></TouchableOpacity>
              <Text style={styles.sceneTitle}>Acesse sua conta</Text>
              <Text style={styles.sceneSubtitle}>Entre com suas credenciais do Horizion ID.</Text>
              
              <ModernInput 
                label="E-mail" 
                icon={Mail}
                placeholder="exemplo@horazion.com" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address" 
              />
              <ModernInput 
                label="Senha" 
                icon={Lock}
                isPassword 
                value={password} 
                onChangeText={setPassword} 
              />
              
              <TouchableOpacity onPress={handleLogin} disabled={loading} style={styles.actionBtn}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.actionBtnText}>Entrar</Text>}
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* CENA 3: ACESSO INSTITUCIONAL (CPF) */}
          {currentScene === 'INSTITUTIONAL' && (
            <Animated.View entering={SlideInRight} style={styles.scene}>
              <TouchableOpacity onPress={reset} style={styles.backBtn}><ArrowLeft color="#000" /></TouchableOpacity>
              <Text style={styles.sceneTitle}>Validação de Lastro</Text>
              <Text style={styles.sceneSubtitle}>Localize seu pré-cadastro corporativo ou educacional.</Text>
              
              <ModernInput 
                label="CPF" 
                placeholder="000.000.000-00" 
                value={cpf} 
                onChangeText={setCpf} 
                keyboardType="numeric" 
              />
              
              <TouchableOpacity onPress={handleVerifyCpf} disabled={loading} style={styles.actionBtn}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.actionBtnText}>Verificar Documento</Text>}
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* CENA 4: ATIVAÇÃO DE CONTA (DEFINIÇÃO DE SENHA) */}
          {currentScene === 'PASSWORD_SET' && (
            <Animated.View entering={FadeIn} style={styles.scene}>
              <ShieldCheck color={HZ_RED} size={48} style={{ marginBottom: 24 }} />
              <Text style={styles.sceneTitle}>Olá, {tempUser?.name}!</Text>
              <Text style={styles.sceneSubtitle}>Sua conta foi localizada. Defina uma senha forte para ativar seu acesso definitivo.</Text>
              
              <ModernInput label="Nova Senha" isPassword value={password} onChangeText={setPassword} />
              <ModernInput label="Confirmar Senha" isPassword />
              
              <TouchableOpacity style={styles.actionBtnRed}>
                <Text style={styles.actionBtnText}>Ativar Minha Vida Digital</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  inner: { flex: 1 },
  scene: { flex: 1, justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 40 },
  title: { fontSize: 34, fontWeight: '900', color: HZ_BLACK, marginBottom: 8, letterSpacing: -1 },
  subtitle: { fontSize: 15, color: '#71717A', marginBottom: 48, lineHeight: 22 },
  optionBtnMain: { flexDirection: 'row', alignItems: 'center', backgroundColor: HZ_BLACK, height: 68, borderRadius: 22, paddingHorizontal: 24, marginBottom: 16 },
  optionTextMain: { color: 'white', fontWeight: '700', fontSize: 15, marginLeft: 16 },
  optionBtnSec: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#F4F4F5', height: 68, borderRadius: 22, paddingHorizontal: 24, backgroundColor: '#FAFAFA' },
  optionTitleSec: { fontWeight: '700', color: HZ_BLACK, fontSize: 14 },
  optionDescSec: { fontSize: 12, color: '#A1A1AA', marginTop: 2 },
  backBtn: { marginBottom: 32, width: 40, height: 40, justifyContent: 'center' },
  sceneTitle: { fontSize: 26, fontWeight: '800', color: HZ_BLACK, marginBottom: 10, letterSpacing: -0.5 },
  sceneSubtitle: { fontSize: 14, color: '#71717A', marginBottom: 36, lineHeight: 22 },
  actionBtn: { backgroundColor: HZ_BLACK, height: 58, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginTop: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
  actionBtnRed: { backgroundColor: HZ_RED, height: 58, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  actionBtnText: { color: 'white', fontWeight: '800', fontSize: 15, textTransform: 'uppercase', letterSpacing: 0.5 }
});