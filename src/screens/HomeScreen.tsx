/**
 * Home Screen (Main Dashboard)
 * Displays VPN connection status and controls
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';
import { VpnServiceMock } from '../services/vpn';
import { VpnConnectionStatus } from '../services/vpn';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const vpnService = new VpnServiceMock();

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [connectionStatus, setConnectionStatus] = useState<VpnConnectionStatus>(
    VpnConnectionStatus.DISCONNECTED
  );
  const [uploadSpeed, setUploadSpeed] = useState<string>('0.00');
  const [downloadSpeed, setDownloadSpeed] = useState<string>('0.00');
  const [connectionTime, setConnectionTime] = useState<string>('00 : 00 : 00');

  useEffect(() => {
    vpnService.initialize();
    updateStatus();
    
    // Update stats periodically
    const statsInterval = setInterval(() => {
      updateStats();
    }, 1000);

    return () => {
      clearInterval(statsInterval);
      vpnService.cleanup();
    };
  }, []);

  const updateStatus = async () => {
    const status = await vpnService.getStatus();
    setConnectionStatus(status);
  };

  const updateStats = async () => {
    const stats = await vpnService.getStats();
    if (stats) {
      setUploadSpeed(stats.uploadSpeed.toFixed(2));
      setDownloadSpeed(stats.downloadSpeed.toFixed(2));
      
      const hours = Math.floor(stats.connectedDuration / 3600);
      const minutes = Math.floor((stats.connectedDuration % 3600) / 60);
      const seconds = stats.connectedDuration % 60;
      setConnectionTime(
        `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
      );
    }
  };

  const handleConnect = async () => {
    if (connectionStatus === VpnConnectionStatus.DISCONNECTED) {
      const servers = await vpnService.getServers();
      const smartConnect = servers.find(s => s.id === 'smart-connect');
      if (smartConnect) {
        await vpnService.connect(smartConnect);
        updateStatus();
      }
    } else {
      await vpnService.disconnect();
      updateStatus();
      setUploadSpeed('0.00');
      setDownloadSpeed('0.00');
      setConnectionTime('00 : 00 : 00');
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case VpnConnectionStatus.CONNECTED:
        return 'Connected';
      case VpnConnectionStatus.CONNECTING:
        return 'Connecting...';
      case VpnConnectionStatus.DISCONNECTING:
        return 'Disconnecting...';
      default:
        return 'Tap to Connect';
    }
  };

  const isConnected = connectionStatus === VpnConnectionStatus.CONNECTED;
  const isConnecting = connectionStatus === VpnConnectionStatus.CONNECTING;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Section with Gradient Background */}
      <View style={styles.topSection}>
        {/* Top Navigation */}
        <View style={styles.topNav}>
          <Text style={styles.logo}>ZeroTrace</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>

        {/* Smart Connect Card */}
        <TouchableOpacity
          style={styles.smartConnectCard}
          onPress={() => navigation.navigate('ServerList')}
        >
          <View style={styles.smartConnectContent}>
            <View style={styles.globeIcon} />
            <Text style={styles.smartConnectText}>Smart Connect</Text>
          </View>
          <View style={styles.arrowIcon} />
        </TouchableOpacity>

        {/* Stats Info */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.uploadIcon} />
            <Text style={styles.statLabel}>Upload</Text>
            <Text style={styles.statValue}>{uploadSpeed}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.downloadIcon} />
            <Text style={styles.statLabel}>Download</Text>
            <Text style={styles.statValue}>{downloadSpeed}</Text>
          </View>
        </View>

        {/* Connection Button */}
        <TouchableOpacity
          style={[styles.connectButton, isConnected && styles.connectButtonActive]}
          onPress={handleConnect}
          disabled={isConnecting}
        >
          <View style={styles.connectButtonInner} />
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={[styles.statusText, isConnected && styles.statusTextConnected]}>
          {getStatusText()}
        </Text>
        <Text style={styles.connectionTime}>{connectionTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  topSection: {
    backgroundColor: theme.colors.primary.blue,
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: theme.spacing['4xl'],
    alignItems: 'center',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.overlay,
  },
  logo: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.white,
  },
  settingsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.overlay,
    borderWidth: 1,
    borderColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    width: 20,
    height: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 4,
  },
  smartConnectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.overlay,
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.base,
    marginTop: theme.spacing['3xl'],
    marginHorizontal: theme.spacing.xl,
    width: '85%',
  },
  smartConnectContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  globeIcon: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
  },
  smartConnectText: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.white,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing['3xl'],
    gap: theme.spacing['5xl'],
  },
  statItem: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  uploadIcon: {
    width: 25,
    height: 26,
    backgroundColor: theme.colors.white,
    borderRadius: 4,
  },
  downloadIcon: {
    width: 25,
    height: 26,
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    transform: [{ rotate: '180deg' }],
  },
  statLabel: {
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fonts.poppins.medium,
    color: theme.colors.white,
  },
  statValue: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.white,
  },
  statDivider: {
    width: 1,
    height: 34,
    backgroundColor: 'rgba(234, 234, 234, 0.3)',
  },
  connectButton: {
    width: 226,
    height: 208,
    marginTop: theme.spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButtonActive: {
    // Add active state styling
  },
  connectButtonInner: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: theme.colors.white,
    borderWidth: 4,
    borderColor: theme.colors.primary.blue,
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  statusText: {
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fonts.poppins.bold,
    color: theme.colors.primary.blue,
    textDecorationLine: 'underline',
    marginBottom: theme.spacing.md,
  },
  statusTextConnected: {
    color: theme.colors.primary.blue,
  },
  connectionTime: {
    fontSize: theme.typography.sizes['2xl'],
    fontFamily: theme.typography.fonts.poppins.bold,
    color: theme.colors.dark,
  },
});

