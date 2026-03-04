import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import Svg, { Path } from 'react-native-svg';
import { ShieldCheck, ArrowRight } from 'lucide-react-native';

const HZ_BLACK = "#09090B";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HorazionStar = ({ size = 24, color = "#B6192E" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 0 C12.5 8 16 11.5 24 12 C16 12.5 12.5 16 12 24 C11.5 16 8 12.5 0 12 C8 11.5 11.5 8 12 0 Z" />
  </Svg>
);

const TIERS = [
  { id: 'gov', color: '#F59E0B', title: 'Dourada • Governo & Entidades', desc: 'Reservada para instituições governamentais, proteção civil e utilidade pública. Imune a filtros algorítmicos em caso de emergência.' },
  { id: 'core', color: '#B6192E', title: 'Vermelha • Horazion Core', desc: 'Identifica comunicações oficiais, engenheiros e a equipa fundadora do ecossistema Horazion.' },
  { id: 'biz', color: '#3B82F6', title: 'Azul • Corporate & Marcas', desc: 'Garante que empresas, anunciantes e parceiros B2B são autênticos e auditados legalmente.' },
  { id: 'edu', color: '#8B5CF6', title: 'Lilás • Criadores & Educação', desc: 'Atribuída a produtores de conhecimento, curadores e instituições académicas de alto impacto.' },
  { id: 'user', color: '#10B981', title: 'Verde • Cidadão Validado', desc: 'Utilizadores reais que concluíram a verificação de identidade (KYC). Essencial para manter a plataforma livre de bots.' }
];

export default function VerificationScreen() {
  const [activeTier, setActiveTier] = useState<string | null>('gov');

  const toggleTier = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveTier(id === activeTier ? null : id);
  };

  return (
    <View style={styles.container}>
      <SupportHeader 
        title="Verificação" 
        subtitle="O fim dos vistos comprados. Autenticidade real baseada em mérito e identidade." 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.introSection}>
          <Text style={styles.introText}>
            No Horazion Life, a verificação não é um produto, é uma infraestrutura de segurança. Utilizamos a nossa Estrela para classificar a natureza de cada entidade no ecossistema.
          </Text>
        </View>

        <View style={styles.tiersContainer}>
          {TIERS.map((tier) => {
            const isActive = activeTier === tier.id;
            return (
              <TouchableOpacity 
                key={tier.id} 
                style={[styles.tierCard, isActive && styles.tierCardActive]} 
                onPress={() => toggleTier(tier.id)}
                activeOpacity={0.8}
              >
                <View style={styles.tierHeader}>
                  <View style={[styles.starGlow, { backgroundColor: `${tier.color}15` }]}>
                    <HorazionStar size={28} color={tier.color} />
                  </View>
                  <Text style={styles.tierTitle}>{tier.title}</Text>
                </View>
                
                {isActive && (
                  <View style={styles.tierBody}>
                    <Text style={styles.tierDesc}>{tier.desc}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={styles.actionBlock}>
          <View style={styles.actionIcon}>
            <ShieldCheck size={24} color={HZ_BLACK} />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Solicitar Análise de Perfil</Text>
            <Text style={styles.actionDesc}>Inicie o processo KYC (Know Your Customer) de forma segura e encripada.</Text>
          </View>
          <TouchableOpacity style={styles.actionBtn}>
            <ArrowRight size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingBottom: 60 },
  
  introSection: { marginBottom: 40 },
  introText: { fontSize: 16, color: '#71717A', lineHeight: 26, fontWeight: '500' },

  tiersContainer: { gap: 16, marginBottom: 48 },
  tierCard: { padding: 20, borderRadius: 28, borderWidth: StyleSheet.hairlineWidth, borderColor: '#E4E4E7', backgroundColor: '#FFFFFF' },
  tierCardActive: { borderColor: HZ_BLACK, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 2 },
  
  tierHeader: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  starGlow: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  tierTitle: { fontSize: 15, fontWeight: '800', color: HZ_BLACK, flex: 1, letterSpacing: -0.2 },
  
  tierBody: { marginTop: 16, paddingTop: 16, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E4E4E7' },
  tierDesc: { fontSize: 14, color: '#71717A', lineHeight: 24 },

  actionBlock: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 24, borderRadius: 32, borderWidth: 1, borderColor: '#E4E4E7', shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 8 },
  actionIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F4F4F5', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  actionContent: { flex: 1, paddingRight: 16 },
  actionTitle: { fontSize: 15, fontWeight: '800', color: HZ_BLACK, marginBottom: 4 },
  actionDesc: { fontSize: 13, color: '#71717A', lineHeight: 20 },
  actionBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: HZ_BLACK, alignItems: 'center', justifyContent: 'center' },
});