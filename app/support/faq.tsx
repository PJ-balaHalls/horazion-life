import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { Search, ChevronDown } from 'lucide-react-native';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";
const HZ_GRAY = "#71717A";
const HZ_BORDER = "#E4E4E7";

const FAQ_DATA = [
  { id: 1, q: "Como altero meu Horizion ID?", a: "Seu Horizion ID é permanente e imutável para garantir integridade e segurança no ecossistema." },
  { id: 2, q: "Esqueci minha senha, e agora?", a: "Você pode usar a opção 'Esqueci minha senha' na tela de login para receber um link de recuperação via e-mail." },
  { id: 3, q: "Como ativo o Modo de Foco?", a: "Acesse as configurações do seu perfil e na aba 'Bem-estar Digital', ative o Modo Foco para pausar notificações." },
  { id: 4, q: "Meus dados são compartilhados?", a: "Não. Seguimos a arquitetura Zero Trust. Seus dados são criptografados e nunca vendidos." }
];

export default function FAQScreen() {
  return (
    <View style={styles.container}>
      <SupportHeader title="Central de Ajuda" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={18} color={HZ_GRAY} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar por palavras-chave..." 
            placeholderTextColor="#A1A1AA"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Dúvidas Frequentes</Text>
        
        <View style={styles.accordionContainer}>
          {FAQ_DATA.map((item, index) => (
            <TouchableOpacity key={item.id} style={[styles.accordionItem, index === FAQ_DATA.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.accordionHeader}>
                <Text style={styles.questionText}>{item.q}</Text>
                <ChevronDown size={16} color={HZ_GRAY} />
              </View>
              {/* Para simplificar neste mockup estático, mantemos as respostas ocultas ou expandimos a primeira */}
              {index === 0 && (
                <Text style={styles.answerText}>{item.a}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.contactTitle}>Ainda precisa de ajuda?</Text>
          <Text style={styles.contactDesc}>Nossa equipe humana está pronta para analisar seu caso.</Text>
          <TouchableOpacity style={styles.contactBtn}>
            <Text style={styles.contactBtnText}>Falar com Suporte</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  searchContainer: { padding: 24, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: HZ_BORDER },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4F5', paddingHorizontal: 16, height: 48, borderRadius: 24, gap: 10 },
  searchInput: { flex: 1, fontSize: 13, color: HZ_BLACK },
  
  scrollContent: { padding: 24, paddingBottom: 40 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: HZ_GRAY, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
  
  accordionContainer: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: HZ_BORDER, overflow: 'hidden' },
  accordionItem: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#F4F4F5' },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  questionText: { fontSize: 13, fontWeight: '600', color: HZ_BLACK, flex: 1, paddingRight: 16 },
  answerText: { fontSize: 12, color: HZ_GRAY, marginTop: 12, lineHeight: 18 },

  contactBox: { marginTop: 32, backgroundColor: 'rgba(182, 25, 46, 0.05)', padding: 24, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(182, 25, 46, 0.1)' },
  contactTitle: { fontSize: 14, fontWeight: '700', color: HZ_RED, marginBottom: 8 },
  contactDesc: { fontSize: 12, color: '#7F1D1D', textAlign: 'center', marginBottom: 16 },
  contactBtn: { backgroundColor: HZ_RED, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 20 },
  contactBtnText: { color: '#FFF', fontSize: 12, fontWeight: '700' }
});