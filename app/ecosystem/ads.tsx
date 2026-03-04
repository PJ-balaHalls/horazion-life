import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { Target, TrendingUp, Sparkles, ArrowRight } from 'lucide-react-native';

const HZ_BLACK = "#09090B";

export default function AdsScreen() {
  return (
    <View style={styles.container}>
      <SupportHeader 
        title="Horazion Ads" 
        subtitle="A atenção humana é sagrada. Anuncie com contexto, não com ruído." 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.manifestoBlock}>
          <Text style={styles.manifestoTitle}>O Fim da Intrusão</Text>
          <Text style={styles.manifestoText}>
            No nosso SOS (Sistema Operativo Social), os blocos patrocinados não interrompem a jornada. Eles existem como módulos nativos que o utilizador escolhe explorar quando procura relevância.
          </Text>
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}><Target size={20} color={HZ_BLACK} /></View>
            <Text style={styles.metricValue}>100%</Text>
            <Text style={styles.metricLabel}>Integração Nativa</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}><TrendingUp size={20} color={HZ_BLACK} /></View>
            <Text style={styles.metricValue}>Zero</Text>
            <Text style={styles.metricLabel}>Banners Pop-up</Text>
          </View>
        </View>

        <View style={styles.featureBlock}>
          <Sparkles size={24} color={HZ_BLACK} style={{ marginBottom: 16 }} />
          <Text style={styles.featureTitle}>Formatos de Blocos Patrocinados</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureItemText}>Blocos de Leitura (Recomendações Editoriais)</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureItemText}>Ferramentas Integradas (Startups & Utilities)</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureItemText}>Universos de Marca (Espaços corporativos imersivos)</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.partnerBtn} activeOpacity={0.9}>
          <Text style={styles.partnerBtnText}>Tornar-se Parceiro Verified</Text>
          <ArrowRight size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  
  manifestoBlock: { marginBottom: 40 },
  manifestoTitle: { fontSize: 22, fontWeight: '900', color: HZ_BLACK, letterSpacing: -0.5, marginBottom: 16 },
  manifestoText: { fontSize: 16, color: '#71717A', lineHeight: 28 },

  metricsContainer: { flexDirection: 'row', gap: 16, marginBottom: 48 },
  metricCard: { flex: 1, backgroundColor: '#FFFFFF', padding: 24, borderRadius: 32, borderWidth: StyleSheet.hairlineWidth, borderColor: '#E4E4E7', shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10 },
  metricIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F4F4F5', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  metricValue: { fontSize: 24, fontWeight: '900', color: HZ_BLACK, marginBottom: 4 },
  metricLabel: { fontSize: 12, fontWeight: '600', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: 0.5 },

  featureBlock: { backgroundColor: '#FAFAFA', padding: 32, borderRadius: 32, borderWidth: StyleSheet.hairlineWidth, borderColor: '#E4E4E7' },
  featureTitle: { fontSize: 18, fontWeight: '800', color: HZ_BLACK, marginBottom: 24 },
  featureList: { gap: 16 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: HZ_BLACK },
  featureItemText: { fontSize: 15, color: '#3F3F46', fontWeight: '500' },

  footer: { padding: 24, paddingBottom: 40, backgroundColor: '#FFFFFF' },
  partnerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: HZ_BLACK, paddingVertical: 20, borderRadius: 32 },
  partnerBtnText: { color: '#FFF', fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
});