/**
 * Settings Screen
 * App settings and preferences - Matching Figma design
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/icons';
import ConnectionTypeModal from '../components/ConnectionTypeModal';

const { width } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [connectionTypeModalVisible, setConnectionTypeModalVisible] = useState(false);

  const settingsItems = [
    {
      id: 'connection-type',
      title: 'Connection Type',
      description: 'Choose how your VPN connects. Select the protocol that best fits your speed and security needs.',
      onPress: () => setConnectionTypeModalVisible(true),
    },
    {
      id: 'terms',
      title: 'Terms of Use',
      description: undefined,
      onPress: () => navigation.navigate('TermsOfUse'),
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: undefined,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
  ];

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
          <Text style={styles.title}>Settings</Text>
        </View>
        {/* Separator line */}
        <View style={styles.headerDivider} />
      </SafeAreaView>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {settingsItems.map((item, index) => (
          <View key={item.id}>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.settingsContent}>
                {item.description ? (
                  <View style={styles.settingsTextContainer}>
                    <Text style={styles.settingsTitle}>{item.title}</Text>
                    <Text style={styles.settingsDescription}>{item.description}</Text>
                  </View>
                ) : (
                  <Text style={styles.settingsTitle}>{item.title}</Text>
                )}
              </View>
              <ArrowRightIcon size={scale(24)} color={theme.colors.grey.base} />
            </TouchableOpacity>
            {index < settingsItems.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Ad Banner */}
      <View style={styles.adBanner}>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.adImage}
          resizeMode="cover"
        />
        <View style={styles.adContent}>
          <View style={styles.adTextPlaceholder1} />
          <View style={styles.adTextPlaceholder2} />
          <TouchableOpacity style={styles.installButton} activeOpacity={0.7}>
            <Text style={styles.installButtonText}>Install</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Connection Type Modal */}
      <ConnectionTypeModal
        visible={connectionTypeModalVisible}
        onClose={() => setConnectionTypeModalVisible(false)}
      />
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
    paddingTop: scale(0),
    paddingBottom: scale(16),
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(16),
    minHeight: scale(56), // Minimum touch target
  },
  settingsContent: {
    flex: 1,
    paddingRight: scale(16),
  },
  settingsTextContainer: {
    gap: scale(4),
  },
  settingsTitle: {
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
    fontWeight: '600',
    marginBottom: scale(4),
  },
  settingsDescription: {
    fontSize: scale(14),
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.grey.base,
    lineHeight: scale(20),
    flexWrap: 'wrap',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.grey.light30,
    marginLeft: scale(16),
  },
  adBanner: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey.light30,
    alignItems: 'center',
    gap: scale(12),
  },
  adImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    backgroundColor: theme.colors.grey.light15,
  },
  adContent: {
    flex: 1,
    gap: scale(6),
  },
  adTextPlaceholder1: {
    height: scale(12),
    width: '70%',
    backgroundColor: theme.colors.grey.light30,
    borderRadius: scale(2),
  },
  adTextPlaceholder2: {
    height: scale(12),
    width: '50%',
    backgroundColor: theme.colors.grey.light30,
    borderRadius: scale(2),
  },
  installButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary.blue,
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(6),
    marginTop: scale(4),
  },
  installButtonText: {
    fontSize: scale(14),
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.white,
    fontWeight: '600',
  },
});

