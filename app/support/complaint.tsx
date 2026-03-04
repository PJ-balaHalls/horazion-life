import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { LayoutGrid, UserCircle, ShieldCheck, Zap, Paperclip, CheckCircle2, Copy, MessageSquare } from 'lucide-react-native';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";

const MODULES = [
  { id: 'feed', icon: LayoutGrid, label: 'Feed & UI' },
  { id: 'account', icon: UserCircle, label: 'Conta' },
  { id: 'perf', icon: Zap, label: 'Performance' },
  { id: 'sec', icon: ShieldCheck, label: 'Segurança' },
];

export default function ComplaintScreen() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'low' | 'high'>('low');
  const [description, setDescription] = useState('');
  
  // Estados de Interatividade
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [protocolGenerated, setProtocolGenerated] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedModule || !description.trim()) return;
    
    setIsSubmitting(true);
    // Simula a ida ao servidor Supabase
    setTimeout(() => {
      setIsSubmitting(false);
      // Gera um protocolo mockado
      const mockProtocol = `HZ-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setProtocolGenerated(mockProtocol);
    }, 2000);
  };

  // Se o protocolo foi gerado, exibe a tela de Sucesso
  if (protocolGenerated) {
    return (
      <View style={styles.container}>
        <SupportHeader title="Protocolo Gerado" isAnonymous={false} />
        <View style={styles.successContainer}>
          <View style={styles.successIconCircle}>
            <CheckCircle2 size={48} color="#10B981" />
          </View>
          <Text style={styles.successTitle}>Relato Enviado com Sucesso</Text>
          <Text style={styles.successDesc}>Nossa equipe de engenharia já recebeu seus dados e iniciará a análise.</Text>
          
          <View style={styles.protocolBox}>
            <Text style={styles.protocolLabel}>SEU NÚMERO DE PROTOCOLO</Text>
            <View style={styles.protocolRow}>
              <Text style={styles.protocolNumber}>{protocolGenerated}</Text>
              <TouchableOpacity style={styles.copyBtn}>
                <Copy size={18} color={HZ_BLACK} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.successActions}>
            <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => router.push('/support/chat' as any)}>
              <MessageSquare size={18} color="#FFF" />
              <Text style={styles.actionBtnPrimaryText}>Acompanhar via Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtnSecondary} onPress={() => setProtocolGenerated(null)}>
              <Text style={styles.actionBtnSecondaryText}>Enviar novo relato</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Tela de Formulário Padrão
  return (
    <View style={styles.container}>
      <SupportHeader 
        title="Diagnóstico" 
        subtitle="Identifique falhas e ajude a refinar o ecossistema." 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.stepBlock}>
          <Text style={styles.stepTitle}>Onde está o gargalo?</Text>
          <View style={styles.moduleGrid}>
            {MODULES.map((mod) => {
              const isActive = selectedModule === mod.id;
              return (
                <TouchableOpacity 
                  key={mod.id} 
                  style={[styles.moduleBtn, isActive && styles.moduleBtnActive]} 
                  onPress={() => setSelectedModule(mod.id)}
                  activeOpacity={0.7}
                >
                  <mod.icon size={28} color={isActive ? "#FFFFFF" : HZ_BLACK} style={{ marginBottom: 12 }} />
                  <Text style={[styles.moduleLabel, isActive && styles.moduleLabelActive]}>{mod.label}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={styles.stepBlock}>
          <Text style={styles.stepTitle}>Qual a gravidade?</Text>
          <View style={styles.severityRow}>
            <TouchableOpacity 
              style={[styles.severityBtn, severity === 'low' && styles.severityBtnActive]} 
              onPress={() => setSeverity('low')}
            >
              <Text style={[styles.severityText, severity === 'low' && styles.severityTextActive]}>Comum (Não impede o uso)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.severityBtn, severity === 'high' && styles.severityBtnHigh]} 
              onPress={() => setSeverity('high')}
            >
              <Text style={[styles.severityText, severity === 'high' && styles.severityTextActive]}>Crítico (Travou tudo)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.stepBlock}>
          <Text style={styles.stepTitle}>Detalhe o que aconteceu</Text>
          <TextInput 
            style={styles.textArea} 
            placeholder="Descreva o fluxo exato que gerou a falha..." 
            placeholderTextColor="#A1A1AA"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.stepBlock}>
          <TouchableOpacity style={styles.attachBtn} activeOpacity={0.6}>
            <View style={styles.attachIconBg}>
              <Paperclip size={20} color={HZ_BLACK} />
            </View>
            <View>
              <Text style={styles.attachText}>Anexar Evidência</Text>
              <Text style={styles.attachSub}>Imagens ou vídeos até 10MB</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitBtn, (!selectedModule || !description.trim()) && styles.submitBtnDisabled]} 
          activeOpacity={0.9}
          onPress={handleSubmit}
          disabled={!selectedModule || !description.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.submitText}>Gerar Protocolo Técnico</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  
  stepBlock: { marginBottom: 32 },
  stepTitle: { fontSize: 15, fontWeight: '800', color: HZ_BLACK, marginBottom: 16 },
  
  moduleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  moduleBtn: { width: '48%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F4F4F5', borderRadius: 24, padding: 24, alignItems: 'center', justifyContent: 'center' },
  moduleBtnActive: { backgroundColor: HZ_BLACK, borderColor: HZ_BLACK, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 16 },
  moduleLabel: { fontSize: 14, fontWeight: '700', color: HZ_BLACK },
  moduleLabelActive: { color: '#FFFFFF' },

  severityRow: { flexDirection: 'row', gap: 12 },
  severityBtn: { flex: 1, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#F4F4F5', alignItems: 'center' },
  severityBtnActive: { backgroundColor: HZ_BLACK, borderColor: HZ_BLACK },
  severityBtnHigh: { backgroundColor: HZ_RED, borderColor: HZ_RED },
  severityText: { fontSize: 12, fontWeight: '700', color: '#71717A' },
  severityTextActive: { color: '#FFFFFF' },

  textArea: { backgroundColor: '#F4F4F5', borderRadius: 24, padding: 20, fontSize: 16, color: HZ_BLACK, lineHeight: 24, minHeight: 140, textAlignVertical: 'top' },

  attachBtn: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F4F4F5', borderRadius: 24 },
  attachIconBg: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F4F4F5', alignItems: 'center', justifyContent: 'center' },
  attachText: { fontSize: 15, fontWeight: '700', color: HZ_BLACK },
  attachSub: { fontSize: 12, color: '#A1A1AA', marginTop: 2 },

  footer: { padding: 24, paddingBottom: 40, backgroundColor: '#FFFFFF' },
  submitBtn: { backgroundColor: HZ_BLACK, paddingVertical: 20, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  submitBtnDisabled: { backgroundColor: '#E4E4E7' },
  submitText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },

  // Estilos da Tela de Sucesso
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  successIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  successTitle: { fontSize: 24, fontWeight: '900', color: HZ_BLACK, textAlign: 'center', marginBottom: 12 },
  successDesc: { fontSize: 15, color: '#71717A', textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  
  protocolBox: { width: '100%', backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#F4F4F5', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 40 },
  protocolLabel: { fontSize: 11, fontWeight: '800', color: '#A1A1AA', letterSpacing: 1, marginBottom: 8 },
  protocolRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  protocolNumber: { fontSize: 28, fontWeight: '900', color: HZ_BLACK, letterSpacing: 2 },
  copyBtn: { padding: 8, backgroundColor: '#E4E4E7', borderRadius: 12 },

  successActions: { width: '100%', gap: 16 },
  actionBtnPrimary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: HZ_BLACK, paddingVertical: 18, borderRadius: 32 },
  actionBtnPrimaryText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  actionBtnSecondary: { paddingVertical: 16, alignItems: 'center' },
  actionBtnSecondaryText: { color: HZ_BLACK, fontSize: 14, fontWeight: '700' }
});