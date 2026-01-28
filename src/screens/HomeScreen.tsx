/**
 * Home Screen (Main Dashboard) - Disconnected State
 * Responsive Figma design implementation
 */

import React, { useState, useRef, useEffect } from 'react';
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
import { SettingsIcon, GlobeIcon, ArrowRightIcon, UploadIcon, DownloadIcon } from '../components/icons';
import Svg, { Path } from 'react-native-svg';
import { VpnServiceMock } from '../services/vpn';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

// Responsive scaling function
const scale = (size: number) => (width / DESIGN_WIDTH) * size;
const scaleHeight = (size: number) => (height / DESIGN_HEIGHT) * size;

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Real-time stats
  const [connectionTime, setConnectionTime] = useState(0); // in seconds
  const [uploadSpeed, setUploadSpeed] = useState(0); // in Mbps
  const [downloadSpeed, setDownloadSpeed] = useState(0); // in Mbps
  
  // Refs for intervals
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const connectionStartTimeRef = useRef<number | null>(null);
  
  // VPN service instance
  const vpnServiceRef = useRef(new VpnServiceMock());

  const handleConnect = async () => {
    if (connectionStatus === 'disconnected') {
      // Start connecting
      setConnectionStatus('connecting');
      setProgress(0);
      
      // Get a default server for connection (use Smart Connect or first available)
      try {
        const servers = await vpnServiceRef.current.getServers();
        const defaultServer = servers.find(s => s.id === 'smart-connect') || servers[0];
        
        if (defaultServer) {
          // Connect to VPN service in background
          vpnServiceRef.current.connect(defaultServer).catch((error) => {
            console.error('VPN connection error:', error);
            // If connection fails, reset UI
            setConnectionStatus('disconnected');
            setProgress(0);
          });
        }
      } catch (error) {
        console.error('Error getting servers:', error);
      }
      
      // Animate progress from 0 to 100 over 1.5 seconds (faster and smoother)
      const duration = 1500; // 1.5 seconds - faster
      const steps = 90; // 90 steps for smoother animation (60fps)
      const increment = 100 / steps;
      const intervalDuration = duration / steps;
      
      let currentProgress = 0;
      progressIntervalRef.current = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(100);
          // Transition to connected state immediately (no delay)
          setConnectionStatus('connected');
          setProgress(100);
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          
          // Start timer and stats polling when connected
          startConnectionTimer();
          startStatsPolling();
        } else {
          setProgress(currentProgress);
        }
      }, intervalDuration);
    } else if (connectionStatus === 'connected') {
      // Disconnect from VPN service
      try {
        await vpnServiceRef.current.disconnect();
      } catch (error) {
        console.error('VPN disconnection error:', error);
      }
      
      // Disconnect immediately
      setConnectionStatus('disconnected');
      setProgress(0);
      stopConnectionTimer();
      stopStatsPolling();
      setConnectionTime(0);
      setUploadSpeed(0);
      setDownloadSpeed(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  };
  
  const startConnectionTimer = () => {
    connectionStartTimeRef.current = Date.now();
    setConnectionTime(0);
    
    timerIntervalRef.current = setInterval(() => {
      if (connectionStartTimeRef.current) {
        const elapsed = Math.floor((Date.now() - connectionStartTimeRef.current) / 1000);
        setConnectionTime(elapsed);
      }
    }, 1000); // Update every second
  };
  
  const stopConnectionTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    connectionStartTimeRef.current = null;
  };
  
  const startStatsPolling = async () => {
    // Poll stats every second
    const pollStats = async () => {
      try {
        const stats = await vpnServiceRef.current.getStats();
        if (stats) {
          setUploadSpeed(stats.uploadSpeed);
          setDownloadSpeed(stats.downloadSpeed);
          // Update timer from stats if available (more accurate)
          if (stats.connectedDuration > 0) {
            setConnectionTime(stats.connectedDuration);
          }
        }
      } catch (error) {
        console.error('Error fetching VPN stats:', error);
      }
    };
    
    // Poll immediately, then every second
    pollStats();
    statsIntervalRef.current = setInterval(pollStats, 1000);
  };
  
  const stopStatsPolling = () => {
    if (statsIntervalRef.current) {
      clearInterval(statsIntervalRef.current);
      statsIntervalRef.current = null;
    }
  };
  
  // Format time components for display
  const formatTimeComponents = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0'),
    };
  };
  
  // Format speed with 2 decimal places
  const formatSpeed = (speed: number): string => {
    return speed.toFixed(2);
  };

  useEffect(() => {
    // Initialize VPN service
    vpnServiceRef.current.initialize();
    
    // Cleanup on unmount
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      stopConnectionTimer();
      stopStatsPolling();
      vpnServiceRef.current.cleanup();
    };
  }, []);

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
              <SettingsIcon size={scale(33)} />
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
              <GlobeIcon size={scale(40)} />
              <Text style={styles.smartConnectText}>Smart Connect</Text>
            </View>
            <View style={styles.arrowContainer}>
              <ArrowRightIcon size={scale(20)} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Info - Upload/Download - 328 x 72.5, gap 26.5 from globe */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <UploadIcon size={scale(26)} />
            </View>
            <Text style={styles.statLabel} numberOfLines={1} adjustsFontSizeToFit={true}>Upload</Text>
            <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit={true}>{formatSpeed(uploadSpeed)}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <DownloadIcon size={scale(26)} />
            </View>
            <Text style={styles.statLabel} numberOfLines={1} adjustsFontSizeToFit={true}>Download</Text>
            <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit={true}>{formatSpeed(downloadSpeed)}</Text>
          </View>
        </View>

        {/* Connection Button - 226 x 208, gap 15 from upload/download */}
        <View style={styles.connectButtonContainer}>
          <ConnectButton 
            onPress={handleConnect} 
            connectionStatus={connectionStatus}
            progress={progress}
          />
        </View>
      </View>

      {/* Middle Section - Status Text and Time */}
      <View style={styles.middleSection}>
        <Text style={styles.statusText}>
          {connectionStatus === 'disconnected' ? 'Tap to Connect' : 
           connectionStatus === 'connecting' ? 'Connecting...' : 
           'Tap to Disconnect'}
        </Text>
        <View style={styles.timeContainer}>
          <Text style={styles.connectionTime}>
            {connectionStatus === 'connected' ? (() => {
              const time = formatTimeComponents(connectionTime);
              return (
                <>
                  <Text>{time.hours} : {time.minutes} : </Text>
                  <Text style={styles.connectionTimeSeconds}>{time.seconds}</Text>
                </>
              );
            })() : (
              <>
                <Text>00 : 00 : </Text>
                <Text style={styles.connectionTimeSeconds}>00</Text>
              </>
            )}
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
    width: scale(33),
    height: scale(33),
    borderRadius: scale(16.5),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
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
    backgroundColor: 'rgba(20, 20, 25, 0.12)', // Figma: translucent dark
    borderWidth: 1,
    borderColor: theme.colors.white,
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
    color: theme.colors.white, // White text as per Figma (works with semi-transparent card)
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
  },
  statsContainer: {
    position: 'absolute',
    left: (width - scale(328)) / 2, // Center horizontally
    top: scale(96) + scale(26.5) + scale(60) + scale(26.5), // Header + gap + globe + gap
    width: scale(328),
    minHeight: scale(72.5), // Use minHeight instead of fixed height
    flexDirection: 'row',
    alignItems: 'flex-start', // Align to top to prevent cropping
    justifyContent: 'space-around',
    paddingHorizontal: scale(8), // Add padding to prevent edge cropping
    paddingTop: scale(4), // Add top padding
    paddingBottom: scale(4), // Add bottom padding
    zIndex: 10,
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: scale(6),
    flex: 1,
    minWidth: 0, // Allow flex to shrink if needed
    paddingTop: scale(0), // No extra padding needed
  },
  statIconContainer: {
    width: scale(40),
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: scale(10),
    fontFamily: theme.typography.fonts.poppins.medium,
    color: theme.colors.white,
    fontWeight: '500',
    lineHeight: scale(14), // Increased line height to prevent top cropping
    textAlign: 'center',
    width: '100%',
    includeFontPadding: false, // Remove extra font padding
    textAlignVertical: 'center',
  },
  statValue: {
    fontSize: scale(16),
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.white,
    fontWeight: '600',
    lineHeight: scale(20), // Increased line height to prevent top cropping
    textAlign: 'center',
    width: '100%',
    minWidth: scale(50), // Ensure minimum width for numbers
    includeFontPadding: false, // Remove extra font padding
    textAlignVertical: 'center',
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
