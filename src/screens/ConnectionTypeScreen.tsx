/**
 * Connection Type Screen
 * Allows users to select VPN protocol (WireGuard/OpenVPN)
 */

import React, { useState } from 'react';
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
import { VpnProtocol } from '../services/vpn';

type ConnectionTypeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ConnectionType'>;

export default function ConnectionTypeScreen() {
  const navigation = useNavigation<ConnectionTypeScreenNavigationProp>();
  const [selectedProtocol, setSelectedProtocol] = useState<VpnProtocol>(VpnProtocol.WIREGUARD);

  const protocols = [
    {
      protocol: VpnProtocol.WIREGUARD,
      title: 'WireGuard',
      description: 'Modern, fast, and secure VPN protocol with state-of-the-art cryptography.',
    },
    {
      protocol: VpnProtocol.OPENVPN,
      title: 'OpenVPN',
      description: 'Mature and widely supported VPN protocol with excellent compatibility.',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Connection Type</Text>
          <Text style={styles.headerDescription}>
            Choose how your VPN connects. Select the protocol that best fits your speed and security needs.
          </Text>
        </View>

        <View style={styles.divider} />

        {protocols.map((item, index) => (
          <View key={item.protocol}>
            <TouchableOpacity
              style={styles.protocolItem}
              onPress={() => setSelectedProtocol(item.protocol)}
            >
              <View style={styles.protocolContent}>
                <View style={styles.radioButton}>
                  {selectedProtocol === item.protocol && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View style={styles.protocolTextContainer}>
                  <Text style={styles.protocolTitle}>{item.title}</Text>
                  <Text style={styles.protocolDescription}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {index < protocols.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: theme.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey.light15,
  },
  backButton: {
    width: 24,
    height: 24,
    marginRight: theme.spacing.md,
  },
  backIcon: {
    width: 24,
    height: 24,
    backgroundColor: theme.colors.dark,
    borderRadius: 4,
    transform: [{ rotate: '180deg' }],
  },
  title: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
    marginBottom: theme.spacing.sm,
  },
  headerDescription: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.grey.base,
    lineHeight: theme.typography.sizes.base * theme.typography.lineHeights.normal,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.grey.base,
    marginVertical: theme.spacing.md,
  },
  protocolItem: {
    paddingVertical: theme.spacing.md,
  },
  protocolContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.grey.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary.blue,
  },
  protocolTextContainer: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  protocolTitle: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
  },
  protocolDescription: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.grey.base,
    lineHeight: theme.typography.sizes.base * theme.typography.lineHeights.normal,
  },
});

