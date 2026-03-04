import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { Search, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react-native';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";

// Habilita animações de layout no Android para o Accordion
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_DATA = [
  { id: 1, q: "Como altero meu Horizion ID?", a: "Seu Horizion ID é permanente. Isso garante que sua identidade seja segura e nunca duplicada. Se houver um erro grave na criação, entre em contato via Chat." },
  { id: 2, q: "Esqueci minha senha, e agora?", a: "Na tela de login, basta tocar em 'Esqueci minha senha'. Enviaremos um link mágico seguro para seu e-mail para redefinição imediata." },
  { id: 3, q: "Meus dados são vendidos?", a: "Nunca. Nosso modelo de negócio é servir você com ferramentas. Seus dados são criptografados através da arquitetura Zero Trust. Apenas você tem a chave de leitura." },
  { id: 4, q: "Como ativar o modo Imersivo?", a: "No canto superior direito da tela inicial, clique no ícone do 'Olho Cortado'. Toda a interface sumirá para você focar apenas no conteúdo." }
];

export default function FAQScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [helpfulStatus, setHelpfulStatus] = useState<Record<number, 'yes' | 'no'>>({});

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const markHelpful = (id: number, status: 'yes' | 'no') => {
    setHelpfulStatus(prev => ({ ...prev, [id]: status }));
  };

  return (
    <View style={styles.container}>
      <SupportHeader 
        title="Explorar" 
        subtitle="Mergulhe na arquitetura e nas funcionalidades do Horazion." 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Busca Interativa */}
        <View style={styles.searchSection}>
          <View style={styles.searchPill}>
            <Search size={20} color="#A1A1AA" />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Pesquisar artigos..." 
              placeholderTextColor="#A1A1AA"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
        
        {/* Accordion Vivo */}
        <View style={styles.faqContainer}>
          {FAQ_DATA.map((item) => {
            const isExpanded = expandedId === item.id;
            const status = helpfulStatus[item.id];

            return (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.faqCard, isExpanded && styles.faqCardExpanded]} 
                activeOpacity={0.8}
                onPress={() => toggleExpand(item.id)}
              >
                <View style={styles.faqHeader}>
                  <Text style={[styles.questionText, isExpanded && styles.questionTextActive]}>{item.q}</Text>
                  <View style={[styles.iconCircle, isExpanded && styles.iconCircleActive]}>
                    {isExpanded ? <ChevronUp size={16} color="#FFF" /> : <ChevronDown size={16} color={HZ_BLACK} />}
                  </View>
                </View>
                
                {isExpanded && (
                  <View style={styles.answerArea}>
                    <Text style={styles.answerText}>{item.a}</Text>
                    
                    {/* Interatividade interna da resposta */}
                    <View style={styles.helpfulRow}>
                      <Text style={styles.helpfulText}>Isso foi útil?</Text>
                      <View style={styles.helpfulActions}>
                        <TouchableOpacity 
                          style={[styles.helpfulBtn, status === 'yes' && styles.helpfulBtnActive]} 
                          onPress={() => markHelpful(item.id, 'yes')}
                        >
                          <ThumbsUp size={14} color={status === 'yes' ? "#FFF" : HZ_BLACK} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[styles.helpfulBtn, status === 'no' && styles.helpfulBtnActiveBad]} 
                          onPress={() => markHelpful(item.id, 'no')}
                        >
                          <ThumbsDown size={14} color={status === 'no' ? "#FFF" : HZ_BLACK} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Floating Action Banner - Totalmente arredondado */}
        <View style={styles.contactBanner}>
          <View style={styles.contactBannerContent}>
            <Text style={styles.contactBannerTitle}>Ainda com dúvidas?</Text>
            <Text style={styles.contactBannerDesc}>Nossa equipe humana responde em até 5 minutos.</Text>
          </View>
          <TouchableOpacity 
            style={styles.chatFabBtn} 
            activeOpacity={0.9}
            onPress={() => router.push('/support/chat' as any)}
          >
            <MessageCircle size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingBottom: 60 },
  
  searchSection: { marginBottom: 40 },
  searchPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4F5', borderRadius: 32, paddingHorizontal: 20, height: 60, gap: 12 },
  searchInput: { flex: 1, fontSize: 16, color: HZ_BLACK },

  sectionTitle: { fontSize: 15, fontWeight: '800', color: HZ_BLACK, marginBottom: 16, paddingLeft: 8 },
  
  faqContainer: { gap: 12, marginBottom: 48 },
  faqCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F4F4F5', borderRadius: 24, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  faqCardExpanded: { borderColor: '#E4E4E7', backgroundColor: '#FAFAFA' },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 },
  questionText: { fontSize: 15, fontWeight: '700', color: HZ_BLACK, flex: 1 },
  questionTextActive: { color: HZ_RED },
  iconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F4F4F5', alignItems: 'center', justifyContent: 'center' },
  iconCircleActive: { backgroundColor: HZ_RED },
  
  answerArea: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E4E4E7' },
  answerText: { fontSize: 15, color: '#71717A', lineHeight: 24, marginBottom: 20 },
  
  helpfulRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#F4F4F5' },
  helpfulText: { fontSize: 13, fontWeight: '600', color: HZ_BLACK, marginLeft: 8 },
  helpfulActions: { flexDirection: 'row', gap: 8 },
  helpfulBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F4F4F5', alignItems: 'center', justifyContent: 'center' },
  helpfulBtnActive: { backgroundColor: '#10B981' },
  helpfulBtnActiveBad: { backgroundColor: '#EF4444' },

  contactBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF0F2', padding: 24, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(182, 25, 46, 0.1)' },
  contactBannerContent: { flex: 1, paddingRight: 16 },
  contactBannerTitle: { fontSize: 16, fontWeight: '800', color: HZ_RED, marginBottom: 4 },
  contactBannerDesc: { fontSize: 13, color: '#9F1239', lineHeight: 20 },
  chatFabBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: HZ_RED, alignItems: 'center', justifyContent: 'center', shadowColor: HZ_RED, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16 },
});