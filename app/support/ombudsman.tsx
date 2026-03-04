import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { ShieldAlert, ArrowRight, LockKeyhole, Search } from 'lucide-react-native';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";
const HZ_GRAY = "#71717A";

export default function OmbudsmanScreen() {
  return (
    <View style={styles.container}>
      <SupportHeader 
        title="Ouvidoria" 
        subtitle="Seu canal independente e blindado para denúncias éticas graves." 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.introBox}>
          <ShieldAlert size={24} color={HZ_BLACK} style={{ marginBottom: 12 }} />
          <Text style={styles.introTitle}>Proteção Absoluta</Text>
          <Text style={styles.introDesc}>
            Este ambiente é criptografado. Se você presenciou fraudes, assédio ou abusos, relate aqui. Seu anonimato é garantido por sistema.
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Processo de Resolução</Text>
        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDotActive} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTime}>Passo 1 • Abertura</Text>
              <Text style={styles.timelineText}>Geração imediata de uma Chave de Acesso única e anônima.</Text>
            </View>
          </View>
          <View style={styles.timelineLine} />
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTime}>Passo 2 • Análise</Text>
              <Text style={styles.timelineText}>Nossa equipe de compliance investiga o caso em até 48h.</Text>
            </View>
          </View>
          <View style={styles.timelineLine} />
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTime}>Passo 3 • Resposta</Text>
              <Text style={styles.timelineText}>Você acompanha o desfecho usando sua Chave de Acesso.</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.actionCards}>
          <TouchableOpacity style={styles.actionCardPrimary} activeOpacity={0.9}>
            <View style={styles.cardHeader}>
              <LockKeyhole size={20} color="#FFF" />
              <ArrowRight size={18} color="#FFF" />
            </View>
            <Text style={styles.cardTitleWhite}>Fazer Relato Seguro</Text>
            <Text style={styles.cardDescWhite}>Totalmente anônimo. Não rastreamos IP.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCardSecondary} activeOpacity={0.7}>
            <View style={styles.cardHeader}>
              <Search size={20} color={HZ_BLACK} />
              <ArrowRight size={18} color={HZ_BLACK} />
            </View>
            <Text style={styles.cardTitle}>Acompanhar Protocolo</Text>
            <Text style={styles.cardDesc}>Insira sua Chave de Acesso para ver atualizações.</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingBottom: 60 },
  
  introBox: { marginBottom: 32 },
  introTitle: { fontSize: 18, fontWeight: '800', color: HZ_BLACK, marginBottom: 8 },
  introDesc: { fontSize: 14, color: HZ_GRAY, lineHeight: 22 },

  divider: { height: 1, backgroundColor: '#F4F4F5', marginBottom: 32 },

  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 24 },
  
  timeline: { paddingLeft: 4, marginBottom: 16 },
  timelineItem: { flexDirection: 'row', gap: 16 },
  timelineDotActive: { width: 10, height: 10, borderRadius: 5, backgroundColor: HZ_BLACK, marginTop: 4, borderWidth: 2, borderColor: '#FFFFFF', shadowColor: "#000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 4 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E4E4E7', marginTop: 4 },
  timelineLine: { width: 2, height: 32, backgroundColor: '#F4F4F5', marginLeft: 4, marginVertical: 4 },
  timelineContent: { flex: 1, paddingBottom: 8 },
  timelineTime: { fontSize: 12, fontWeight: '800', color: HZ_BLACK },
  timelineText: { fontSize: 13, color: HZ_GRAY, marginTop: 4, lineHeight: 20 },

  actionCards: { gap: 16 },
  actionCardPrimary: { backgroundColor: HZ_BLACK, padding: 24, borderRadius: 16 },
  actionCardSecondary: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#E4E4E7' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' },
  cardTitleWhite: { fontSize: 15, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  cardDescWhite: { fontSize: 13, color: '#A1A1AA' },
  cardTitle: { fontSize: 15, fontWeight: '800', color: HZ_BLACK, marginBottom: 4 },
  cardDesc: { fontSize: 13, color: HZ_GRAY },
});