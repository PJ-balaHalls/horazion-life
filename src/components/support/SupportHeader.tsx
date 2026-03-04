import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, UserCircle2 } from 'lucide-react-native';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";
const HZ_BORDER = "#E4E4E7";

interface SupportHeaderProps {
  title: string;
  isAnonymous?: boolean;
}

export const SupportHeader = ({ title, isAnonymous = true }: SupportHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.leftGroup}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color={HZ_BLACK} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      {isAnonymous && (
        <TouchableOpacity style={styles.connectBtn} onPress={() => router.push('/auth/login' as any)}>
          <UserCircle2 size={16} color={HZ_RED} />
          <Text style={styles.connectText}>Conectar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: HZ_BORDER,
  },
  leftGroup: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  backBtn: { padding: 8, marginLeft: -8, backgroundColor: '#F4F4F5', borderRadius: 20 },
  title: { fontSize: 18, fontWeight: '800', color: HZ_BLACK },
  connectBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(182, 25, 46, 0.08)', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  connectText: { fontSize: 12, fontWeight: '700', color: HZ_RED }
});