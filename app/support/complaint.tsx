import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { AlertTriangle, UploadCloud, CheckCircle2 } from 'lucide-react-native';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";
const HZ_GRAY = "#71717A";
const HZ_BORDER = "#E4E4E7";

export default function ComplaintScreen() {
  return (
    <View style={styles.container}>
      <SupportHeader title="Reportar Problema" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Infográfico de Status do Sistema */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Status do Sistema</Text>
            <View style={styles.statusBadge}><View style={styles.dotGreen}/><Text style={styles.statusBadgeText}>Operacional</Text></View>
          </View>
          <View style={styles.statusBars}>
            <View style={styles.barItem}><Text style={styles.barLabel}>Horizion ID</Text><View style={styles.barTrack}><View style={[styles.barFill, { width: '100%' }]} /></View></View>
            <View style={styles.barItem}><Text style={styles.barLabel}>API & Feed</Text><View style={styles.barTrack}><View style={[styles.barFill, { width: '100%' }]} /></View></View>
            <View style={styles.barItem}><Text style={styles.barLabel}>Storage</Text><View style={styles.barTrack}><View style={[styles.barFill, { width: '80%', backgroundColor: '#F59E0B' }]} /></View></View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Descreva o erro</Text>
          
          <Text style={styles.label}>Onde ocorreu?</Text>
          <View style={styles.selector}>
            <Text style={styles.selectorText}>Selecione um módulo...</Text>
          </View>

          <Text style={styles.label}>Descrição detalhada</Text>
          <TextInput 
            style={styles.textArea} 
            placeholder="O que você estava tentando fazer quando o erro ocorreu?" 
            placeholderTextColor="#A1A1AA"
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.uploadArea}>
            <UploadCloud size={24} color={HZ_GRAY} />
            <Text style={styles.uploadTitle}>Anexar Print ou Vídeo</Text>
            <Text style={styles.uploadSub}>Tamanho máximo: 10MB</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn}>
          <AlertTriangle size={16} color="#FFF" />
          <Text style={styles.submitText}>Gerar Protocolo Técnico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  statusCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: HZ_BORDER, marginBottom: 24 },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  statusTitle: { fontSize: 13, fontWeight: '700', color: HZ_BLACK },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#ECFDF5', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  dotGreen: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' },
  statusBadgeText: { fontSize: 10, fontWeight: '700', color: '#10B981' },
  statusBars: { gap: 12 },
  barItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  barLabel: { width: 80, fontSize: 11, color: HZ_GRAY },
  barTrack: { flex: 1, height: 6, backgroundColor: '#F4F4F5', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 3 },
  
  formContainer: { gap: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: HZ_BLACK, marginBottom: 8 },
  label: { fontSize: 12, fontWeight: '600', color: HZ_BLACK },
  selector: { backgroundColor: '#FFF', borderWidth: 1, borderColor: HZ_BORDER, padding: 16, borderRadius: 12 },
  selectorText: { color: HZ_GRAY, fontSize: 13 },
  textArea: { backgroundColor: '#FFF', borderWidth: 1, borderColor: HZ_BORDER, padding: 16, borderRadius: 12, height: 120, fontSize: 13, color: HZ_BLACK },
  uploadArea: { backgroundColor: '#FFF', borderWidth: 1, borderColor: HZ_BORDER, borderStyle: 'dashed', padding: 24, borderRadius: 12, alignItems: 'center', gap: 8, marginTop: 8 },
  uploadTitle: { fontSize: 13, fontWeight: '600', color: HZ_BLACK },
  uploadSub: { fontSize: 11, color: HZ_GRAY },

  footer: { padding: 24, paddingBottom: 40, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: HZ_BORDER },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: HZ_BLACK, paddingVertical: 16, borderRadius: 30, gap: 10 },
  submitText: { color: '#FFF', fontSize: 13, fontWeight: '700' }
});