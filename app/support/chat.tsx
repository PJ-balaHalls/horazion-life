import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';
import { SendHorizontal, Sparkles, ArrowRight, Zap, RefreshCw } from 'lucide-react-native';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isActionCard?: boolean;
}

const QUICK_PROMPTS = [
  "Como altero minha privacidade?",
  "Relatar um erro no Feed",
  "Falar com especialista"
];

export default function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! Sou a Inteligência de Suporte da Horazion. Como posso facilitar o seu dia hoje?', sender: 'bot' }
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const newUserMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    // Rola para o final
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    // Simulação de resposta do backend/IA
    setTimeout(() => {
      setIsTyping(false);
      const newBotMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: 'Entendi! Estou processando sua solicitação para oferecer a melhor solução dentro do ecossistema.', 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, newBotMsg]);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <SupportHeader 
        title="Concierge" 
        subtitle="Suporte interativo e em tempo real." 
      />
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex1}>
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.heroSection}>
            <View style={styles.aiBadge}>
              <Sparkles size={14} color={HZ_RED} />
              <Text style={styles.aiBadgeText}>SISTEMA ONLINE</Text>
            </View>
          </View>

          {/* Renderização das Mensagens */}
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.messageRow, msg.sender === 'user' ? styles.messageRowUser : styles.messageRowBot]}>
              {msg.sender === 'bot' && (
                <View style={styles.botAvatar}>
                  <Sparkles size={14} color="#FFF" />
                </View>
              )}
              
              <View style={[styles.bubble, msg.sender === 'user' ? styles.bubbleUser : styles.bubbleBot]}>
                <Text style={[styles.bubbleText, msg.sender === 'user' ? styles.bubbleTextUser : styles.bubbleTextBot]}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}

          {/* Indicador de Digitação */}
          {isTyping && (
            <View style={[styles.messageRow, styles.messageRowBot]}>
              <View style={styles.botAvatar}>
                <Sparkles size={14} color="#FFF" />
              </View>
              <View style={[styles.bubble, styles.bubbleBot, { paddingVertical: 12, paddingHorizontal: 16 }]}>
                <ActivityIndicator size="small" color={HZ_BLACK} />
              </View>
            </View>
          )}

          {/* Prompts Rápidos - Somente se houver poucas mensagens para não poluir depois */}
          {messages.length < 3 && !isTyping && (
            <View style={styles.promptsContainer}>
              <View style={styles.promptHeader}>
                <Zap size={16} color={HZ_BLACK} />
                <Text style={styles.promptTitle}>Sugestões Rápidas</Text>
              </View>
              <View style={styles.promptGrid}>
                {QUICK_PROMPTS.map((prompt, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.promptAction} 
                    activeOpacity={0.7}
                    onPress={() => handleSend(prompt)}
                  >
                    <Text style={styles.promptActionText}>{prompt}</Text>
                    <ArrowRight size={14} color="#A1A1AA" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

        </ScrollView>

        <View style={styles.inputArea}>
          <View style={styles.inputPill}>
            <TextInput 
              style={styles.input} 
              placeholder="Digite sua mensagem..." 
              placeholderTextColor="#A1A1AA"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendBtn, inputText.trim() ? styles.sendBtnActive : null]} 
              activeOpacity={0.8}
              onPress={() => handleSend(inputText)}
            >
              <SendHorizontal size={20} color={inputText.trim() ? "#FFF" : "#A1A1AA"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  flex1: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 40, flexGrow: 1 },
  
  heroSection: { alignItems: 'center', marginBottom: 32 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: 'rgba(182, 25, 46, 0.05)', borderWidth: 1, borderColor: 'rgba(182, 25, 46, 0.1)' },
  aiBadgeText: { fontSize: 10, fontWeight: '800', color: HZ_RED, letterSpacing: 1 },

  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16, maxWidth: '85%' },
  messageRowUser: { alignSelf: 'flex-end', justifyContent: 'flex-end' },
  messageRowBot: { alignSelf: 'flex-start' },
  
  botAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: HZ_BLACK, alignItems: 'center', justifyContent: 'center', marginRight: 8, marginBottom: 4 },
  
  bubble: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 24 },
  bubbleBot: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F4F4F5', borderBottomLeftRadius: 6 },
  bubbleUser: { backgroundColor: HZ_BLACK, borderBottomRightRadius: 6 },
  
  bubbleText: { fontSize: 15, lineHeight: 22 },
  bubbleTextBot: { color: HZ_BLACK },
  bubbleTextUser: { color: '#FFFFFF' },

  promptsContainer: { marginTop: 40 },
  promptHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, paddingHorizontal: 4 },
  promptTitle: { fontSize: 12, fontWeight: '800', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: 1 },
  promptGrid: { gap: 10 },
  promptAction: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 24 },
  promptActionText: { fontSize: 14, fontWeight: '600', color: HZ_BLACK, flex: 1, paddingRight: 16 },

  inputArea: { paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 20, paddingTop: 10, backgroundColor: '#FFFFFF' },
  inputPill: { flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#F4F4F5', borderRadius: 32, paddingLeft: 20, paddingRight: 6, paddingVertical: 6 },
  input: { flex: 1, fontSize: 15, color: HZ_BLACK, paddingTop: 12, paddingBottom: 12, maxHeight: 120 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E4E4E7', alignItems: 'center', justifyContent: 'center' },
  sendBtnActive: { backgroundColor: HZ_RED },
});