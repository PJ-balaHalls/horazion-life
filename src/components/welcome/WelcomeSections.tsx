import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { 
  ArrowRight, MessageCircle, HelpCircle, ShieldCheck, AlertTriangle, Phone,
  BadgeCheck, Briefcase, Globe, Megaphone, RefreshCw, Star, Newspaper
} from 'lucide-react-native';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";
const HZ_GRAY = "#71717A";
const HZ_BORDER = "#E4E4E7";

const InfoCard = ({ icon: Icon, title, desc, onPress }: any) => (
  <TouchableOpacity activeOpacity={0.7} style={styles.infoCard} onPress={onPress}>
    <View style={styles.iconBox}><Icon size={18} color={HZ_RED} /></View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
    </View>
    <ArrowRight size={14} color="#D4D4D8" />
  </TouchableOpacity>
);

const SectionContainer = ({ title, subtitle, children }: any) => (
  <View style={styles.sectionInner}>
    <View style={styles.headerBox}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.grid}>{children}</View>
  </View>
);

export const HeroContent = ({ onAction }: { onAction: (route: string) => void }) => (
  <View style={styles.heroContent}>
    <Text style={styles.heroTitle}>HORAZION <Text style={{ color: HZ_RED }}>LIFE</Text></Text>
    <Text style={styles.heroSubtitle}>SISTEMA OPERATIVO SOCIAL</Text>
    <View style={styles.heroActions}>
      <TouchableOpacity style={styles.primaryBtn} onPress={() => onAction('/auth/register')}>
        <Text style={styles.primaryBtnText}>Criar Conta</Text>
        <ArrowRight size={14} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.textLinkBtn} onPress={() => onAction('/auth/login')}>
        <Text style={styles.textLinkText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export const SupportContent = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <SectionContainer title="Suporte" subtitle="Ajuda humanizada e técnica.">
    <InfoCard icon={MessageCircle} title="Chat" desc="Atendimento tempo real" onPress={() => onNavigate('/support/chat')} />
    <InfoCard icon={AlertTriangle} title="Reportar" desc="Problemas técnicos" onPress={() => onNavigate('/support/complaint')} />
    <InfoCard icon={HelpCircle} title="FAQ" desc="Base de conhecimento" onPress={() => onNavigate('/support/faq')} />
    <InfoCard icon={ShieldCheck} title="Ouvidoria" desc="Casos sensíveis" onPress={() => onNavigate('/support/ombudsman')} />
  </SectionContainer>
);

export const EcosystemContent = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <SectionContainer title="Ecossistema" subtitle="Integrações e parcerias.">
    <InfoCard icon={BadgeCheck} title="Verificação" desc="Selo oficial" onPress={() => onNavigate('/ecosystem/verification')} />
    <InfoCard icon={Megaphone} title="Ads" desc="Para anunciantes" onPress={() => onNavigate('/ecosystem/ads')} />
    <InfoCard icon={Globe} title="Governo" desc="Instituições" onPress={() => onNavigate('/ecosystem/government')} />
    <InfoCard icon={Briefcase} title="Parceiros" desc="B2B & Startups" onPress={() => onNavigate('/ecosystem/partner')} />
  </SectionContainer>
);

export const StatusContent = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <SectionContainer title="Status" subtitle="Engenharia e transparência.">
    <InfoCard icon={RefreshCw} title="Updates" desc="Versão 2.4" onPress={() => onNavigate('/status/updates')} />
    <InfoCard icon={Star} title="Novidades" desc="Roadmap futuro" onPress={() => onNavigate('/status/news')} />
    <InfoCard icon={Newspaper} title="Blog" desc="Artigos técnicos" onPress={() => onNavigate('/status/blog')} />
    <View style={styles.footer}><Text style={styles.footerText}>© 2026 HORAZION GROUP</Text></View>
  </SectionContainer>
);

const styles = StyleSheet.create({
  heroContent: { alignItems: 'center', width: '100%' },
  heroTitle: { fontSize: 36, fontWeight: '900', color: HZ_BLACK, letterSpacing: -1 },
  heroSubtitle: { fontSize: 10, fontWeight: '700', color: HZ_GRAY, letterSpacing: 3, marginTop: 8, marginBottom: 24 },
  heroActions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  primaryBtn: { backgroundColor: HZ_RED, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 30, gap: 8 },
  primaryBtnText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  textLinkBtn: { paddingVertical: 12, paddingHorizontal: 12 },
  textLinkText: { color: HZ_BLACK, fontSize: 13, fontWeight: '500' },
  sectionInner: { flex: 1, justifyContent: 'center', width: '100%', paddingHorizontal: 24 },
  headerBox: { marginBottom: 24, alignItems: 'center' },
  sectionTitle: { fontSize: 24, fontWeight: '800', color: HZ_BLACK, marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: HZ_GRAY },
  grid: { gap: 10, width: '100%', maxWidth: 380, alignSelf: 'center' },
  infoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: HZ_BORDER, gap: 14 },
  iconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F4F4F5' },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: HZ_BLACK },
  cardDesc: { fontSize: 11, color: HZ_GRAY },
  footer: { marginTop: 32, alignItems: 'center' },
  footerText: { fontSize: 10, fontWeight: '700', color: '#D4D4D8' }
});