/**
 * Terms of Use Screen
 * Display terms of use content
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

type TermsOfUseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TermsOfUse'>;

export default function TermsOfUseScreen() {
  const navigation = useNavigation<TermsOfUseScreenNavigationProp>();

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
          <Text style={styles.title}>Terms of Use</Text>
        </View>
        <View style={styles.headerDivider} />
      </SafeAreaView>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing and using ZeroTrace VPN, you accept and agree to be bound by the terms and provision of this agreement.
        </Text>

        <Text style={styles.sectionTitle}>2. Description of Service</Text>
        <Text style={styles.paragraph}>
          ZeroTrace VPN provides a virtual private network (VPN) service that allows users to securely connect to the internet through encrypted connections.
        </Text>

        <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </Text>

        <Text style={styles.sectionTitle}>4. Prohibited Activities</Text>
        <Text style={styles.paragraph}>
          You agree not to use the service for any illegal activities, including but not limited to copyright infringement, hacking, or distribution of malicious software.
        </Text>

        <Text style={styles.sectionTitle}>5. Service Availability</Text>
        <Text style={styles.paragraph}>
          We strive to provide reliable service but do not guarantee uninterrupted or error-free operation. Service may be temporarily unavailable due to maintenance or technical issues.
        </Text>

        <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          ZeroTrace VPN shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
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
