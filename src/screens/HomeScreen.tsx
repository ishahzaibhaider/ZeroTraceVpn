/**
 * Home Screen (Main Dashboard) - Disconnected State
 * Responsive Figma design implementation
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';
import ConnectButton from '../components/ConnectButton';
import { SettingsIcon } from '../components/icons/SettingsIcon';
import Svg, { Path } from 'react-native-svg';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

// Responsive scaling function
const scale = (size: number) => (width / DESIGN_WIDTH) * size;
const scaleHeight = (size: number) => (height / DESIGN_HEIGHT) * size;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleConnect = () => {
    // TODO: Connect to VPN
    console.log('Connect pressed');
  };

  const handleSmartConnect = () => {
    navigation.navigate('ServerList');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary.blue} />
      
      {/* Blue Section - Total 390 x 506 */}
      <View style={styles.blueSection}>
        {/* Blue Background Shape - Exact Figma SVG */}
        <View style={styles.blueBackgroundShape}>
          <Svg
            width={width}
            height={scale(392)}
            viewBox="0 0 390 392"
            style={styles.blueShapeSvg}
            preserveAspectRatio="none"
          >
            <Path
              d="M0 0H390V362.174L298.849 392H90.6977L0 362.174V0Z"
              fill={theme.colors.primary.blue}
            />
          </Svg>
        </View>
        
        {/* Header with Safe Area - 390 x 96 */}
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <View style={styles.topNav}>
            <Text style={styles.logoText}>ZeroTrace</Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={handleSettings}
              activeOpacity={0.7}
            >
              <View style={styles.settingsIconContainer}>
                <SettingsIcon />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Smart Connect Card - 328 x 60, gap 26.5 from header */}
        <View style={styles.smartConnectCardContainer}>
          <TouchableOpacity
            style={styles.smartConnectCard}
            onPress={handleSmartConnect}
            activeOpacity={0.8}
          >
            <View style={styles.smartConnectContent}>
              <Image 
                source={require('../../assets/globe.png')} 
                style={[styles.globeIcon, { tintColor: theme.colors.accent.orange }]}
                resizeMode="contain"
              />
              <Text style={styles.smartConnectText}>Smart Connect</Text>
            </View>
            <View style={styles.arrowContainer}>
              <View style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Info - Upload/Download - 328 x 72.5, gap 26.5 from globe */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Image 
                source={require('../../assets/upload.png')} 
                style={[styles.statIcon, { tintColor: theme.colors.accent.orange }]}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.statLabel}>Upload</Text>
            <Text style={styles.statValue}>0.00</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <View style={styles.downloadIconContainer}>
                <Image 
                  source={require('../../assets/download.png')} 
                  style={[styles.statIcon, { tintColor: theme.colors.accent.orange }]}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.statLabel}>Download</Text>
            <Text style={styles.statValue}>0.00</Text>
          </View>
        </View>

        {/* Connection Button - 226 x 208, gap 15 from upload/download */}
        <View style={styles.connectButtonContainer}>
          <ConnectButton onPress={handleConnect} />
        </View>
      </View>

      {/* Middle Section - Status Text and Time */}
      <View style={styles.middleSection}>
        <Text style={styles.statusText}>Tap to Connect</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.connectionTime}>
            <Text>00 : 00 : </Text>
            <Text style={styles.connectionTimeSeconds}>00</Text>
          </Text>
        </View>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    width: '100%',
  },
  blueSection: {
    width: '100%',
    height: scale(506), // Total blue section height
    position: 'relative',
    overflow: 'hidden',
  },
  blueBackgroundShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: scale(392),
    zIndex: 0,
  },
  blueShapeSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  headerSafeArea: {
    backgroundColor: 'transparent',
    height: scale(96), // Header including safe area
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 10,
  },
  topNav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
    backgroundColor: 'transparent',
  },
  logoText: {
    fontSize: scale(18),
    fontFamily: theme.typography.fonts.poppins.bold,
    color: theme.colors.white,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: scale(18) * 1.2,
  },
  settingsButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: theme.colors.primary.blue,
    alignItems: 'center',
    justifyContent: 'center',
    // White glow effect - multiple layers for better glow
    shadowColor: theme.colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: scale(4),
    elevation: 4,
    // Subtle white border for additional glow
    borderWidth: scale(0.5),
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  settingsIconContainer: {
    width: scale(20),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  smartConnectCardContainer: {
    position: 'absolute',
    left: (width - scale(328)) / 2, // Center horizontally: (390 - 328) / 2 = 31
    top: scale(96) + scale(26.5), // Header (96) + gap (26.5)
    width: scale(328),
    height: scale(60),
    zIndex: 10,
  },
  smartConnectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary.blue,
    borderRadius: scale(40),
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    height: scale(60),
    gap: scale(10),
  },
  smartConnectContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    flex: 1,
  },
  globeIcon: {
    width: scale(40),
    height: scale(40),
  },
  smartConnectText: {
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
  arrowContainer: {
    width: scale(20),
    height: scale(20),
    backgroundColor: theme.colors.dark,
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(4),
  },
  arrowIcon: {
    width: scale(8),
    height: scale(12),
    borderLeftWidth: scale(6),
    borderLeftColor: theme.colors.white,
    borderTopWidth: scale(4),
    borderTopColor: 'transparent',
    borderBottomWidth: scale(4),
    borderBottomColor: 'transparent',
  },
  statsContainer: {
    position: 'absolute',
    left: (width - scale(328)) / 2, // Center horizontally
    top: scale(96) + scale(26.5) + scale(60) + scale(26.5), // Header + gap + globe + gap
    width: scale(328),
    height: scale(72.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(48),
    zIndex: 10,
  },
  statItem: {
    alignItems: 'center',
    gap: scale(6),
    width: scale(83.273),
  },
  statIconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: theme.colors.white,
    borderWidth: scale(1.5),
    borderColor: theme.colors.accent.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(-7), // Adjust positioning
  },
  statIcon: {
    width: scale(25.456),
    height: scale(26.456),
  },
  downloadIconContainer: {
    transform: [{ rotate: '180deg' }],
  },
  statLabel: {
    fontSize: scale(10),
    fontFamily: theme.typography.fonts.poppins.medium,
    color: theme.colors.white,
    fontWeight: '500',
    lineHeight: scale(10) * 0.8744,
  },
  statValue: {
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.white,
    fontWeight: '600',
    lineHeight: scale(16) * 0.8744,
  },
  statDivider: {
    width: scale(1.097),
    height: scale(34),
    backgroundColor: 'rgba(234, 234, 234, 0.3)',
  },
  connectButtonContainer: {
    position: 'absolute',
    left: (width - scale(226)) / 2, // Center horizontally: (390 - 226) / 2 = 82
    top: scale(96) + scale(26.5) + scale(60) + scale(26.5) + scale(72.5) + scale(15), // Header + gap + globe + gap + upload/download + gap
    width: scale(226),
    height: scale(208),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  middleSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(20),
    gap: scale(8),
    minHeight: scale(163),
  },
  statusText: {
    fontSize: scale(18),
    fontFamily: theme.typography.fonts.poppins.bold,
    color: theme.colors.primary.blue,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    letterSpacing: 0.25,
    textAlign: 'center',
    width: '100%',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionTime: {
    fontSize: scale(32),
    fontFamily: theme.typography.fonts.poppins.bold,
    color: theme.colors.dark,
    fontWeight: '700',
    lineHeight: scale(32) * theme.typography.lineHeights.tight,
  },
  connectionTimeSeconds: {
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
