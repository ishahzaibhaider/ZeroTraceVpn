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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';
import ConnectButton from '../components/ConnectButton';

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
      
      {/* Top Section - Blue Background */}
      <View style={styles.topSection}>
        {/* Blue Background Rectangle */}
        <View style={styles.blueBackground} />
        
        {/* Top Nav Bar */}
        <View style={styles.topNav}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/ZeroTrace.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettings}
            activeOpacity={0.7}
          >
            <View style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>

        {/* Smart Connect Card */}
        <View style={styles.smartConnectCardContainer}>
          <TouchableOpacity
            style={styles.smartConnectCard}
            onPress={handleSmartConnect}
            activeOpacity={0.8}
          >
            <View style={styles.smartConnectContent}>
              <Image 
                source={require('../../assets/globe.png')} 
                style={styles.globeIcon}
                resizeMode="contain"
              />
              <Text style={styles.smartConnectText}>Smart Connect</Text>
            </View>
            <View style={styles.arrowContainer}>
              <View style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Info - Upload/Download */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Image 
                source={require('../../assets/upload.png')} 
                style={styles.statIcon}
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
                  style={styles.statIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.statLabel}>Download</Text>
            <Text style={styles.statValue}>0.00</Text>
          </View>
        </View>

        {/* Connection Button */}
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

      {/* Bottom Ad Placeholder */}
      <View style={styles.adPlaceholder}>
        <Text style={styles.adPlaceholderText}>Ad placeholder - Ads will be shown here</Text>
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
  topSection: {
    width: '100%',
    aspectRatio: DESIGN_WIDTH / 506, // Maintain aspect ratio
    backgroundColor: theme.colors.primary.blue,
    position: 'relative',
    overflow: 'hidden',
  },
  blueBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '77.5%', // 392/506
    backgroundColor: theme.colors.primary.blue,
  },
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(48),
    paddingHorizontal: scale(16),
    paddingVertical: scale(6),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.overlay,
  },
  logoContainer: {
    height: scale(36),
    justifyContent: 'center',
  },
  logoImage: {
    width: scale(115),
    height: scale(18),
  },
  settingsButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: theme.colors.background.overlay,
    borderWidth: 1,
    borderColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(6),
  },
  settingsIcon: {
    width: scale(20),
    height: scale(20),
    backgroundColor: theme.colors.white,
    borderRadius: scale(2),
  },
  smartConnectCardContainer: {
    position: 'absolute',
    left: scale(31),
    top: scale(120),
    width: scale(328),
  },
  smartConnectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.overlay,
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: scale(40),
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
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
    color: theme.colors.white,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
  arrowContainer: {
    width: scale(20),
    height: scale(20),
    backgroundColor: theme.colors.white,
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(4),
  },
  arrowIcon: {
    width: scale(8),
    height: scale(12),
    borderLeftWidth: scale(6),
    borderLeftColor: theme.colors.dark,
    borderTopWidth: scale(4),
    borderTopColor: 'transparent',
    borderBottomWidth: scale(4),
    borderBottomColor: 'transparent',
  },
  statsContainer: {
    position: 'absolute',
    left: '50%',
    top: scale(209),
    transform: [{ translateX: scale(-164) }], // Half of 328px width
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(328),
    gap: scale(48),
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
    left: scale(74),
    top: scale(297),
    width: scale(226),
    height: scale(208),
    alignItems: 'center',
    justifyContent: 'center',
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
  adPlaceholder: {
    width: '100%',
    paddingVertical: scale(10),
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  adPlaceholderText: {
    fontSize: scale(14),
    color: theme.colors.grey.base,
    fontStyle: 'italic',
  },
});
