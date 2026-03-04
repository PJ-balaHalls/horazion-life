import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { ShieldAlert, FileSearch, ArrowRight, Lock } from 'lucide-react-native';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";
const HZ_GRAY = "#71717A";
const HZ_BORDER = "#E4E4E7";

export default function OmbudsmanScreen() {
  return (
    <View style={styles.container}>
      <SupportHeader title="Ouvidoria" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.introBox}>
          <ShieldAlert size={32} color={HZ_BLACK} style={{ marginBottom: 16 }} />
          <Text style={styles.introTitle}>Canal Sigiloso e Independente</Text>
          <Text style={styles.introDesc}>
            A Ouvidoria Horazion trata violações éticas, fraudes, assédio ou abusos graves na plataforma. O anonimato é garantido por criptografia de ponta a ponta.
          </Text>
        </View>

        {/* Infográfico do SLA (Service Level Agreement) */}
        <View style={styles.slaContainer}>
          <Text style={styles.slaTitle}>Nosso Compromisso de Retorno</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTime}>Imediato</Text>
                <Text style={styles.timelineText}>Geração de Chave Única Segura</Text>
              </View>
            </View>
            <View style={styles.timelineLine} />
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTime}>Até 48h</Text>
                <Text style={styles.timelineText}>Primeira Análise Humana</Text>
              </View>
            </View>
            <View style={styles.timelineLine} />
            <View style={styles.timelineItem}>
              <View style={styles.timelineDotOutline} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTime}>Até 15 dias</Text>
                <Text style={styles.timelineText}>Resolução Definitiva</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionCards}>
          <TouchableOpacity style={styles.actionCardPrimary}>
            <View style={styles.cardHeader}>
              <Lock size={20} color="#FFF" />
              <ArrowRight size={16} color="#FFF" />
            </View>
            <Text style={styles.cardTitleWhite}>Fazer Nova Denúncia</Text>
            <Text style={styles.cardDescWhite}>Totalmente anônimo e criptografado.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCardSecondary}>
            <View style={styles.cardHeader}>
              <FileSearch size={20} color={HZ_BLACK} />
              <ArrowRight size={16} color={HZ_GRAY} />
            </View>
            <Text style={styles.cardTitle}>Acompanhar Protocolo</Text>
            <Text style={styles.cardDesc}>Insira sua chave única para ver o status.</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  
  introBox: { marginBottom: 32 },
  introTitle: { fontSize: 24, fontWeight: '900', color: HZ_BLACK, letterSpacing: -0.5, marginBottom: 12 },
  introDesc: { fontSize: 13, color: HZ_GRAY, lineHeight: 22 },

  slaContainer: { backgroundColor: '#FAFAFA', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: HZ_BORDER, marginBottom: 32 },
  slaTitle: { fontSize: 11, fontWeight: '700', color: HZ_GRAY, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 },
  timeline: { paddingLeft: 8 },
  timelineItem: { flexDirection: 'row', gap: 16 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: HZ_BLACK, marginTop: 4 },
  timelineDotOutline: { width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: HZ_GRAY, backgroundColor: '#FAFAFA', marginTop: 4 },
  timelineLine: { width: 2, height: 24, backgroundColor: HZ_BORDER, marginLeft: 4, marginVertical: 4 },
  timelineContent: { flex: 1, paddingBottom: 8 },
  timelineTime: { fontSize: 10, fontWeight: '700', color: HZ_BLACK, textTransform: 'uppercase' },
  timelineText: { fontSize: 12, color: HZ_GRAY, marginTop: 2 },

  actionCards: { gap: 16 },
  actionCardPrimary: { backgroundColor: HZ_BLACK, padding: 24, borderRadius: 16 },
  actionCardSecondary: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: HZ_BORDER },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  cardTitleWhite: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  cardDescWhite: { fontSize: 12, color: '#A1A1AA' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: HZ_BLACK, marginBottom: 8 },
  cardDesc: { fontSize: 12, color: HZ_GRAY },
});