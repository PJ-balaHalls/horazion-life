import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight } from 'react-native-reanimated';
import { User, ShieldCheck, ArrowLeft, Building2, Lock, Mail } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Imports com caminhos relativos corrigidos para a pasta app/auth/
import { useAuthStore } from '../../src/store/useAuthStore';
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
        alert("HZ-AUTH_404: Acesso não localizado.");
      }
    } catch (err) {
      alert("Erro na conexão técnica.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }}>
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
          {/* ... (as demais cenas INSTITUTIONAL, LOGIN e PASSWORD_SET seguem a mesma lógica) */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scene: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  title: { fontSize: 34, fontWeight: '900', color: HZ_BLACK, marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#71717A', marginBottom: 48 },
  optionBtnMain: { flexDirection: 'row', alignItems: 'center', backgroundColor: HZ_BLACK, height: 64, borderRadius: 20, paddingHorizontal: 24, marginBottom: 16 },
  optionTextMain: { color: 'white', fontWeight: '700', marginLeft: 16 },
  optionBtnSec: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#F4F4F5', height: 64, borderRadius: 20, paddingHorizontal: 24 },
  optionTitleSec: { fontWeight: '700', color: HZ_BLACK },
  optionDescSec: { fontSize: 12, color: '#A1A1AA' },
  backBtn: { marginBottom: 32 }
});