/**
 * Privacy Policy Screen
 * Display privacy policy content
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';
import { ArrowLeftIcon } from '../components/icons';

const { width } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PrivacyPolicy'>;

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation<PrivacyPolicyScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />
      
      {/* Top Navigation */}
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.topNav}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeftIcon size={scale(24)} color={theme.colors.dark} />
          </TouchableOpacity>
          <Text style={styles.title}>Privacy Policy</Text>
        </View>
        <View style={styles.headerDivider} />
      </SafeAreaView>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          ZeroTrace VPN collects minimal information necessary to provide our service. We do not log your browsing activity, connection timestamps, or IP addresses.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect solely to provide, maintain, and improve our VPN service. We do not sell or share your personal information with third parties.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement industry-standard security measures to protect your data. All connections are encrypted using strong encryption protocols.
        </Text>

        <Text style={styles.sectionTitle}>4. No-Log Policy</Text>
        <Text style={styles.paragraph}>
          ZeroTrace VPN operates under a strict no-log policy. We do not track, collect, or store your online activities, browsing history, or connection logs.
        </Text>

        <Text style={styles.sectionTitle}>5. Third-Party Services</Text>
        <Text style={styles.paragraph}>
          Our service may use third-party analytics tools that collect anonymous usage statistics. These tools do not identify individual users.
        </Text>

        <Text style={styles.sectionTitle}>6. Your Rights</Text>
        <Text style={styles.paragraph}>
          You have the right to access, modify, or delete your account information at any time. You can also request a copy of any data we may have about you.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our website.
        </Text>

        <Text style={styles.lastUpdated}>Last updated: January 2026</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  safeArea: {
    backgroundColor: theme.colors.white,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: theme.colors.white,
  },
  backButton: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
    fontWeight: '600',
  },
  headerDivider: {
    height: 1,
    backgroundColor: theme.colors.grey.light30,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: scale(16),
    paddingTop: scale(24),
    paddingBottom: scale(32),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontFamily: theme.typography.fonts.poppins.bold,
    color: theme.colors.dark,
    fontWeight: '700',
    marginTop: scale(24),
    marginBottom: scale(12),
  },
  paragraph: {
    fontSize: scale(14),
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.dark,
    lineHeight: scale(22),
    marginBottom: scale(16),
  },
  lastUpdated: {
    fontSize: scale(12),
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.grey.base,
    marginTop: scale(32),
    fontStyle: 'italic',
  },
});
