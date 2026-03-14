import React from 'react';
// CORREÇÃO: Platform adicionado ao import
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { Blocks, Rocket, TerminalSquare } from 'lucide-react-native';

const HZ_BLACK = "#09090B";

export default function PartnerScreen() {
  return (
    <View style={styles.container}>
      <SupportHeader 
        title="Startups & API" 
        subtitle="Construa ferramentas para a próxima geração da internet." 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.devBox}>
          <View style={styles.terminalHeader}>
            <View style={styles.termDotRed} />
            <View style={styles.termDotYellow} />
            <View style={styles.termDotGreen} />
            <Text style={styles.termTitle}>horazion-cli</Text>
          </View>
          <View style={styles.terminalBody}>
            <Text style={styles.codeText}>$ npm install @horazion/core</Text>
            <Text style={styles.codeText}>$ hz init my-integration</Text>
            <Text style={styles.codeSuccess}>{'>'} Universo conectado com sucesso.</Text>
          </View>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.headline}>Extenda o Sistema Operativo.</Text>
          <Text style={styles.paragraph}>
            A API Horazion permite que startups conectem os seus serviços diretamente aos Blocos Vivos dos nossos utilizadores.
          </Text>
        </View>

        <View style={styles.gridFeatures}>
          <View style={styles.featureBox}>
            <Blocks size={24} color={HZ_BLACK} style={{ marginBottom: 16 }} />
            <Text style={styles.featureTitle}>Widgets Nativos</Text>
            <Text style={styles.featureDesc}>Renderização nativa na interface Clean White.</Text>
          </View>

          <View style={styles.featureBox}>
            <Rocket size={24} color={HZ_BLACK} style={{ marginBottom: 16 }} />
            <Text style={styles.featureTitle}>Zero Trust Auth</Text>
            <Text style={styles.featureDesc}>Segurança militar via Horizion ID.</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.docsBtn} activeOpacity={0.8}>
          <TerminalSquare size={18} color="#FFF" />
          <Text style={styles.docsBtnText}>Ler Documentação B2B</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  devBox: { backgroundColor: '#18181B', borderRadius: 24, overflow: 'hidden', marginBottom: 40 },
  terminalHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#27272A', paddingVertical: 12, paddingHorizontal: 16, gap: 8 },
  termDotRed: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444' },
  termDotYellow: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#F59E0B' },
  termDotGreen: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981' },
  termTitle: { color: '#A1A1AA', fontSize: 12, fontWeight: '600', marginLeft: 8, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  terminalBody: { padding: 24, gap: 12 },
  codeText: { color: '#E4E4E7', fontSize: 13, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  codeSuccess: { color: '#10B981', fontSize: 13, marginTop: 8, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  textSection: { marginBottom: 40 },
  headline: { fontSize: 24, fontWeight: '900', color: HZ_BLACK, marginBottom: 12 },
  paragraph: { fontSize: 15, color: '#71717A', lineHeight: 24 },
  gridFeatures: { flexDirection: 'row', gap: 16 },
  featureBox: { flex: 1, padding: 24, backgroundColor: '#FFFFFF', borderRadius: 32, borderWidth: StyleSheet.hairlineWidth, borderColor: '#E4E4E7' },
  featureTitle: { fontSize: 15, fontWeight: '800', color: HZ_BLACK, marginBottom: 8 },
  featureDesc: { fontSize: 13, color: '#71717A', lineHeight: 20 },
  footer: { padding: 24, paddingBottom: 40, backgroundColor: '#FFFFFF' },
  docsBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: HZ_BLACK, paddingVertical: 20, borderRadius: 32 },
  docsBtnText: { color: '#FFF', fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
});