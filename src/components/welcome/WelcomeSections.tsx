import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { 
  ArrowRight, MessageCircle, HelpCircle, ShieldCheck, AlertTriangle, Phone,
  BadgeCheck, Briefcase, Globe, Megaphone, RefreshCw, Star, Newspaper, Fingerprint, EyeOff
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

export const HeroContent = ({ onAction, onHide }: { onAction: (route: string) => void, onHide?: () => void }) => {
  const [keepSession, setKeepSession] = useState(true);

  return (
    <View style={styles.heroContent}>
      {/* Botão de Modo Imersivo no topo direito do card */}
      {onHide && (
        <TouchableOpacity style={styles.hideBtn} onPress={onHide} activeOpacity={0.6} hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
          <EyeOff size={18} color={HZ_GRAY} />
        </TouchableOpacity>
      )}

      <Text style={styles.heroTitle}>HORAZION <Text style={{ color: HZ_RED }}>LIFE</Text></Text>
      <Text style={styles.heroSubtitle}>SISTEMA OPERATIVO SOCIAL - SOS </Text>
      
      <View style={styles.authContainer}>
        <TouchableOpacity style={styles.biometricBtn} onPress={() => console.log("Init Biometrics")}>
          <Fingerprint size={16} color={HZ_BLACK} />
          <Text style={styles.biometricText}>Entrar com Face ID / Digital</Text>
        </TouchableOpacity>

        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => onAction('/auth/register')}>
            <Text style={styles.primaryBtnText}>Criar Conta</Text>
            <ArrowRight size={14} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.textLinkBtn} onPress={() => onAction('/auth/login')}>
            <Text style={styles.textLinkText}>Outras opções</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secondaryActionsContainer}>
          <View style={styles.sessionControl}>
            <Switch 
              value={keepSession} 
              onValueChange={setKeepSession} 
              trackColor={{ false: "#E4E4E7", true: "rgba(182, 25, 46, 0.3)" }}
              thumbColor={keepSession ? HZ_RED : "#FFF"}
              style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            />
            <Text style={styles.sessionText}>Manter sessão iniciada</Text>
          </View>
          
          <TouchableOpacity onPress={() => onAction('/auth/recovery')} style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  heroContent: { alignItems: 'center', width: '100%', position: 'relative' },
  hideBtn: { position: 'absolute', top: -10, right: 20, zIndex: 10, padding: 4, backgroundColor: '#F4F4F5', borderRadius: 20 },
  heroTitle: { fontSize: 34, fontWeight: '900', color: HZ_BLACK, letterSpacing: -1 }, 
  heroSubtitle: { fontSize: 10, fontWeight: '700', color: HZ_GRAY, letterSpacing: 3, marginTop: 4, marginBottom: 24 },
  authContainer: { width: '100%', alignItems: 'center', paddingHorizontal: 20 }, 
  biometricBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4F5', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 30, gap: 10, width: '100%', justifyContent: 'center', marginBottom: 12 },
  biometricText: { color: HZ_BLACK, fontSize: 13, fontWeight: '600' },
  heroActions: { flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%', justifyContent: 'center' },
  primaryBtn: { backgroundColor: HZ_RED, flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 30, gap: 8, flex: 1, justifyContent: 'center' },
  primaryBtnText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  textLinkBtn: { paddingVertical: 14, paddingHorizontal: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: HZ_BORDER, borderRadius: 30, flex: 1, alignItems: 'center' },
  textLinkText: { color: HZ_BLACK, fontSize: 13, fontWeight: '600' },
  
  secondaryActionsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 16, paddingHorizontal: 4 },
  sessionControl: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sessionText: { fontSize: 11, color: HZ_GRAY, fontWeight: '500' },
  forgotBtn: { paddingVertical: 8 },
  forgotText: { fontSize: 11, color: HZ_GRAY, fontWeight: '600', textDecorationLine: 'underline' },
  
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