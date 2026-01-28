/**
 * Server List Screen
 * Displays available VPN servers
 */

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';
import { ArrowLeftIcon, GlobeIcon, ArrowRightIcon, SearchIcon } from '../components/icons';

type ServerListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ServerList'>;

const { width } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = (size: number) => (width / DESIGN_WIDTH) * size;

export default function ServerListScreen() {
  const navigation = useNavigation<ServerListScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  // Static list matching Figma for now with country codes for flags
  const allServers = useMemo(
    () => [
      { id: 'usa', label: 'USA', countryCode: 'US', flag: '🇺🇸', unavailable: true },
      { id: 'germany', label: 'Germany', countryCode: 'DE', flag: '🇩🇪', unavailable: true },
      { id: 'canada', label: 'Canada', countryCode: 'CA', flag: '🇨🇦', unavailable: true },
      { id: 'finland', label: 'Finland', countryCode: 'FI', flag: '🇫🇮', unavailable: true },
      { id: 'japan', label: 'Japan', countryCode: 'JP', flag: '🇯🇵', unavailable: true },
    ],
    []
  );

  const filteredServers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allServers;
    return allServers.filter((s) => s.label.toLowerCase().includes(q));
  }, [allServers, searchQuery]);

  const renderUnavailableRow = (label: string, flag: string) => (
    <View style={[styles.serverCard, styles.serverCardUnavailable]}>
      <View style={styles.serverRow}>
        <View style={styles.flagCircle}>
          <Text style={styles.flagEmoji}>{flag}</Text>
        </View>
        <Text style={styles.serverName}>{label}</Text>
      </View>
      <ArrowRightIcon size={scale(24)} color={theme.colors.grey.base} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />
      
      {/* Top Navigation */}
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <ArrowLeftIcon size={scale(24)} color={theme.colors.dark} />
          </TouchableOpacity>
          <Text style={styles.title}>Server List</Text>
        </View>
        <View style={styles.headerDivider} />
      </SafeAreaView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Server"
          placeholderTextColor="rgba(147, 147, 147, 0.6)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.searchIconContainer}>
          <SearchIcon size={scale(20)} color="rgba(147, 147, 147, 0.6)" />
        </View>
      </View>

      <View style={styles.sectionDivider} />

      <View style={styles.body}>
        {/* Connected Server */}
        <Text style={styles.sectionTitle}>Connected Server</Text>
        <View style={styles.connectedCard}>
          <View style={styles.connectedIcon}>
            <GlobeIcon size={scale(32)} />
          </View>
          <Text style={styles.smartConnectText} numberOfLines={1}>
            Smart Connect
          </Text>
        </View>

        <View style={styles.listDivider} />

        {/* All Server */}
        <Text style={[styles.sectionTitle, { marginTop: scale(8) }]}>All Server</Text>
        <View style={styles.list}>
          {filteredServers.map((s) => (
            <View key={s.id} style={{ width: '100%' }}>
              {renderUnavailableRow(s.label, s.flag)}
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Ad Banner */}
      <View style={styles.adBanner}>
        <Image source={require('../../assets/icon.png')} style={styles.adImage} resizeMode="cover" />
        <View style={styles.adContent}>
          <View style={styles.adTextPlaceholder1} />
          <View style={styles.adTextPlaceholder2} />
          <TouchableOpacity style={styles.installButton} activeOpacity={0.7}>
            <Text style={styles.installButtonText}>Install</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingVertical: scale(10),
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
    backgroundColor: theme.colors.grey.light15,
    width: '100%',
  },
  searchContainer: {
    marginTop: scale(16),
    marginHorizontal: scale(16),
    position: 'relative',
  },
  searchInput: {
    borderWidth: scale(1),
    borderColor: '#E0E0E0', // Light grey border as per Figma
    borderRadius: scale(40), // Pill-like rounded corners
    paddingLeft: scale(20),
    paddingRight: scale(50), // Space for icon
    paddingVertical: scale(14), // Ample padding for comfortable touch target
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.dark,
    backgroundColor: theme.colors.white,
    height: scale(48), // Fixed height for consistent appearance
  },
  searchIconContainer: {
    position: 'absolute',
    right: scale(20),
    top: '50%',
    marginTop: scale(-10), // Center vertically (half of icon height)
    width: scale(20),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: theme.colors.grey.light15,
    marginTop: scale(16),
  },
  body: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
    gap: scale(12),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
    fontWeight: '600',
  },
  connectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(1.5),
    borderColor: theme.colors.primary.blue,
    borderRadius: scale(40),
    paddingHorizontal: scale(16), // Figma: px-16
    paddingVertical: scale(10), // Figma: py-10
    backgroundColor: theme.colors.white,
  },
  smartConnectText: {
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.regular,
    color: '#000000', // Pure black text
    fontWeight: '400', // Regular weight, not bold
    flexShrink: 1,
    marginLeft: scale(6), // Figma inner gap ~6
  },
  listDivider: {
    height: 1,
    backgroundColor: theme.colors.grey.light15,
    width: '100%',
  },
  list: {
    width: '100%',
    gap: scale(16),
    paddingBottom: scale(12),
  },
  serverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: scale(1),
    borderColor: 'rgba(147, 147, 147, 0.2)',
    borderRadius: scale(40),
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: theme.colors.white,
  },
  serverCardUnavailable: {
    opacity: 0.6,
  },
  serverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    flex: 1,
  },
  connectedIcon: {
    width: scale(32),
    height: scale(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    borderWidth: scale(1),
    borderColor: 'rgba(147, 147, 147, 0.2)',
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flagEmoji: {
    fontSize: scale(20),
    lineHeight: scale(32),
  },
  serverName: {
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.medium,
    color: theme.colors.dark,
    fontWeight: '500',
  },
  unavailableText: {
    fontSize: scale(14),
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.grey.base,
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

