import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

const HZ_RED = "#B6192E";
const HZ_BLACK = "#09090B";

// Nossa Identidade Visual - A Estrela Horazion
const HorazionStar = ({ size = 16, color = HZ_RED }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 0 C12.5 8 16 11.5 24 12 C16 12.5 12.5 16 12 24 C11.5 16 8 12.5 0 12 C8 11.5 11.5 8 12 0 Z" />
  </Svg>
);

interface SupportHeaderProps {
  title: string;
  subtitle?: string;
  isAnonymous?: boolean;
}

export const SupportHeader = ({ title, subtitle, isAnonymous = true }: SupportHeaderProps) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
            <ArrowLeft size={22} color={HZ_BLACK} />
          </TouchableOpacity>
          
          {/* Badge Elegante de Sessão Anônima ao invés de Alertas Intrusivos */}
          {isAnonymous && (
            <TouchableOpacity style={styles.anonBadge} onPress={() => router.push('/auth/login' as any)} activeOpacity={0.7}>
              <HorazionStar size={12} color={HZ_RED} />
              <Text style={styles.anonText}>Acesso Anônimo • Fazer Login</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 40 : 0, 
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5', // Divisor ultrafino Clean White
  },
  topRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 10
  },
  backBtn: { 
    padding: 8, 
    marginLeft: -8, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    backgroundColor: '#FFFFFF'
  },
  anonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(182, 25, 46, 0.1)',
    backgroundColor: 'rgba(182, 25, 46, 0.02)',
  },
  anonText: {
    fontSize: 11,
    fontWeight: '700',
    color: HZ_RED,
  },
  titleContainer: {
    gap: 6
  },
  title: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: HZ_BLACK,
    letterSpacing: -0.5
  },
  subtitle: {
    fontSize: 14,
    color: '#71717A',
    lineHeight: 20
  }
});