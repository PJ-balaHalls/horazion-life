import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowRight, Layers, Lock, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const HZ_RED = "#B6192E";
const HZ_TEXT = "#18181B";
const HZ_TEXT_MUTED = "#71717A";

// --- ÁTOMOS UI (Ultra Premium) ---

const Card = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <Animated.View 
    entering={FadeInDown.delay(delay).duration(600).springify().damping(12)}
    style={styles.card}
  >
    {children}
  </Animated.View>
);

const PrimaryButton = ({ label, onPress }: { label: string, onPress: () => void }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.primaryBtn}>
    <Text style={styles.primaryBtnText}>{label}</Text>
    <ArrowRight size={16} color="#FFF" />
  </TouchableOpacity>
);

const SecondaryButton = ({ label, onPress }: { label: string, onPress: () => void }) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={styles.secondaryBtn}>
    <Text style={styles.secondaryBtnText}>{label}</Text>
  </TouchableOpacity>
);

// --- SEÇÕES DO LAYOUT ---

export const HeroTextSection = ({ onAction }: { onAction: (t: string) => void }) => (
  <View style={styles.heroSection}>
    <Animated.Text entering={FadeInDown.duration(600)} style={styles.eyebrow}>
      HORIZON OS 2.0
    </Animated.Text>
    
    <Animated.Text entering={FadeInDown.delay(100).duration(600)} style={styles.heroTitle}>
      A vida ao seu alcance.
    </Animated.Text>
    
    <Animated.Text entering={FadeInDown.delay(200).duration(600)} style={styles.heroDesc}>
      O primeiro Sistema Operativo Social. Organize sua vida digital em blocos vivos, 
      longe do ruído e focado no essencial.
    </Animated.Text>

    <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.btnRow}>
      <PrimaryButton label="Criar HorazionID" onPress={() => onAction('register')} />
      <SecondaryButton label="Entrar" onPress={() => onAction('login')} />
    </Animated.View>
  </View>
);

export const FeaturesSection = () => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionHeader}>Arquitetura Modular</Text>
    
    <View style={styles.grid}>
      <Card delay={100}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}><Layers size={20} color={HZ_RED} /></View>
          <Text style={styles.cardTitle}>Blocos Vivos</Text>
        </View>
        <Text style={styles.cardDesc}>Seu feed não é uma timeline. É um painel de controle da sua vida.</Text>
      </Card>

      <Card delay={200}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}><Zap size={20} color={HZ_RED} /></View>
          <Text style={styles.cardTitle}>Zero Ruído</Text>
        </View>
        <Text style={styles.cardDesc}>Sem métricas de vaidade. Sem vício. Apenas o que importa para você.</Text>
      </Card>
      
      <Card delay={300}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}><Lock size={20} color={HZ_RED} /></View>
          <Text style={styles.cardTitle}>Privacidade Real</Text>
        </View>
        <Text style={styles.cardDesc}>Seus dados são seus. Nenhuma caixa preta decide o que você vê.</Text>
      </Card>
    </View>
  </View>
);

export const AccessibilityNote = () => (
  <View style={styles.accessBox}>
    <Text style={styles.accessText}>
      <Text style={{ fontWeight: '700', color: HZ_RED }}>Acessibilidade Nativa.</Text> Projetado para todos. 
      Suporte total a leitores de tela e alto contraste.
    </Text>
  </View>
);

export const FooterSection = () => (
  <View style={styles.footer}>
    <Text style={styles.footerBrand}>HORAZION GROUP</Text>
    <Text style={styles.footerCopy}>© 2026. Todos os direitos reservados.</Text>
  </View>
);

// --- ESTILOS ---

const styles = StyleSheet.create({
  sectionPadding: { paddingHorizontal: 24, marginBottom: 40 },
  heroSection: { paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' },
  
  eyebrow: { 
    fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: HZ_RED, 
    textTransform: 'uppercase', marginBottom: 16 
  },
  heroTitle: { 
    fontSize: 34, fontWeight: '800', color: HZ_TEXT, textAlign: 'center', 
    marginBottom: 16, letterSpacing: -1, lineHeight: 40 
  },
  heroDesc: { 
    fontSize: 15, color: HZ_TEXT_MUTED, textAlign: 'center', lineHeight: 24, 
    maxWidth: width * 0.85, marginBottom: 32 
  },
  
  btnRow: { flexDirection: 'row', gap: 12, width: '100%', justifyContent: 'center' },
  primaryBtn: { 
    flexDirection: 'row', backgroundColor: HZ_RED, paddingVertical: 14, paddingHorizontal: 20, 
    borderRadius: 14, alignItems: 'center', gap: 8, 
    shadowColor: HZ_RED, shadowOffset: {width:0, height:4}, shadowOpacity: 0.3, shadowRadius: 10 
  },
  primaryBtnText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  secondaryBtn: { 
    paddingVertical: 14, paddingHorizontal: 20, borderRadius: 14, 
    borderWidth: 1, borderColor: '#E4E4E7', backgroundColor: 'transparent' 
  },
  secondaryBtnText: { color: HZ_TEXT, fontWeight: '600', fontSize: 14 },

  sectionHeader: { 
    fontSize: 18, fontWeight: '700', color: HZ_TEXT, marginBottom: 16, marginLeft: 4 
  },
  grid: { gap: 16 },
  
  card: { 
    backgroundColor: '#FAFAFA', padding: 20, borderRadius: 20, 
    borderWidth: 1, borderColor: '#F4F4F5',
    shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.03, shadowRadius: 8
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  iconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF1F2', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: HZ_TEXT },
  cardDesc: { fontSize: 13, color: HZ_TEXT_MUTED, lineHeight: 19 },

  accessBox: { marginHorizontal: 24, padding: 24, backgroundColor: '#F9FAFB', borderRadius: 16, alignItems: 'center' },
  accessText: { fontSize: 12, color: HZ_TEXT_MUTED, textAlign: 'center', lineHeight: 18 },

  footer: { padding: 40, alignItems: 'center', opacity: 0.5 },
  footerBrand: { fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  footerCopy: { fontSize: 10 }
});