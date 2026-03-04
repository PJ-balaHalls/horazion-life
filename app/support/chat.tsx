import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, AlertCircle, Bot } from 'lucide-react-native';
import { SupportHeader } from '../../src/components/support/SupportHeader';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";
const HZ_GRAY = "#71717A";
const HZ_BORDER = "#E4E4E7";

export default function ChatScreen() {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <SupportHeader title="Atendimento" />
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex1}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.anonymousWarning}>
            <AlertCircle size={14} color="#F59E0B" />
            <Text style={styles.warningText}>Sessão anônima. O histórico será perdido ao fechar o app.</Text>
          </View>

          <View style={styles.messageRow}>
            <View style={styles.botAvatar}><Bot size={16} color="#FFF" /></View>
            <View style={styles.botBubble}>
              <Text style={styles.botText}>Olá! Sou o assistente virtual da Horazion. Como posso ajudar você hoje?</Text>
            </View>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickChip}><Text style={styles.quickChipText}>Dúvida sobre conta</Text></TouchableOpacity>
            <TouchableOpacity style={styles.quickChip}><Text style={styles.quickChipText}>Problema técnico</Text></TouchableOpacity>
            <TouchableOpacity style={styles.quickChip}><Text style={styles.quickChipText}>Falar com humano</Text></TouchableOpacity>
          </View>

        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Digite sua mensagem..." 
            placeholderTextColor="#A1A1AA"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={[styles.sendBtn, message.trim() ? styles.sendBtnActive : null]}>
            <Send size={18} color={message.trim() ? "#FFF" : "#A1A1AA"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  flex1: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 40 },
  anonymousWarning: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', padding: 12, borderRadius: 12, gap: 8, marginBottom: 24 },
  warningText: { fontSize: 11, color: '#B45309', flex: 1 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, marginBottom: 16 },
  botAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: HZ_RED, alignItems: 'center', justifyContent: 'center' },
  botBubble: { backgroundColor: '#FFF', padding: 16, borderRadius: 20, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: HZ_BORDER, maxWidth: '80%' },
  botText: { fontSize: 13, color: HZ_BLACK, lineHeight: 20 },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16, marginLeft: 44 },
  quickChip: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: HZ_BORDER },
  quickChipText: { fontSize: 11, color: HZ_GRAY, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingBottom: 32, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: HZ_BORDER, gap: 12 },
  input: { flex: 1, backgroundColor: '#F4F4F5', borderRadius: 24, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14, fontSize: 13, color: HZ_BLACK, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F4F4F5', alignItems: 'center', justifyContent: 'center' },
  sendBtnActive: { backgroundColor: HZ_RED },
});