import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { Building2, Globe2, RadioTower, ArrowUpRight } from 'lucide-react-native';

const HZ_BLACK = "#09090B";
const HZ_GOLD = "#F59E0B";

export default function GovernmentScreen() {
  return (
    <View style={styles.container}>
      <SupportHeader 
        title="Institucional" 
        subtitle="Canal direto entre o Estado, Instituições e os Cidadãos." 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.goldBadge}>
          <Globe2 size={24} color={HZ_GOLD} />
          <Text style={styles.goldBadgeText}>REDE DE UTILIDADE PÚBLICA</Text>
        </View>

        <Text style={styles.mainHeadline}>
          Comunicação crítica sem filtros algorítmicos.
        </Text>
        <Text style={styles.mainDesc}>
          Entidades detentoras da Estrela Dourada têm acesso a protocolos de emergência e transmissão direta para o Life Feed dos cidadãos na sua jurisdição.
        </Text>

        <View style={styles.pillarsContainer}>
          <View style={styles.pillarItem}>
            <RadioTower size={24} color={HZ_BLACK} style={{ marginBottom: 12 }} />
            <Text style={styles.pillarTitle}>Alertas de Emergência</Text>
            <Text style={styles.pillarDesc}>Notificações push bypassando o Modo Foco para segurança pública (ex: Proteção Civil).</Text>
          </View>

          <View style={styles.pillarDivider} />

          <View style={styles.pillarItem}>
            <Building2 size={24} color={HZ_BLACK} style={{ marginBottom: 12 }} />
            <Text style={styles.pillarTitle}>Serviços Integrados</Text>
            <Text style={styles.pillarDesc}>Blocos interativos para agendamentos, impostos e literacia cívica diretamente no perfil do utilizador.</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.connectCard} activeOpacity={0.8}>
          <View style={styles.connectContent}>
            <Text style={styles.connectTitle}>Protocolo de Adesão GovTech</Text>
            <Text style={styles.connectDesc}>Exclusivo para representantes estatais e governamentais.</Text>
          </View>
          <ArrowUpRight size={24} color={HZ_BLACK} />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingBottom: 60 },
  
  goldBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 16, backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.2)', marginBottom: 24 },
  goldBadgeText: { fontSize: 11, fontWeight: '800', color: '#B45309', letterSpacing: 1 },

  mainHeadline: { fontSize: 28, fontWeight: '900', color: HZ_BLACK, letterSpacing: -0.5, lineHeight: 34, marginBottom: 16 },
  mainDesc: { fontSize: 16, color: '#71717A', lineHeight: 26, marginBottom: 48 },

  pillarsContainer: { backgroundColor: '#FFFFFF', borderRadius: 32, borderWidth: StyleSheet.hairlineWidth, borderColor: '#E4E4E7', padding: 32, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.03, shadowRadius: 16, marginBottom: 40 },
  pillarItem: { },
  pillarTitle: { fontSize: 16, fontWeight: '800', color: HZ_BLACK, marginBottom: 8 },
  pillarDesc: { fontSize: 14, color: '#71717A', lineHeight: 22 },
  pillarDivider: { height: StyleSheet.hairlineWidth, backgroundColor: '#E4E4E7', marginVertical: 24 },

  connectCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFAFA', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#F4F4F5' },
  connectContent: { flex: 1, paddingRight: 16 },
  connectTitle: { fontSize: 15, fontWeight: '800', color: HZ_BLACK, marginBottom: 4 },
  connectDesc: { fontSize: 13, color: '#71717A', lineHeight: 20 },
});