/**
 * Server List Screen
 * Displays available VPN servers
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';
import { VpnServiceMock } from '../services/vpn';
import { VpnServer } from '../services/vpn';

type ServerListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ServerList'>;

const vpnService = new VpnServiceMock();

export default function ServerListScreen() {
  const navigation = useNavigation<ServerListScreenNavigationProp>();
  const [servers, setServers] = useState<VpnServer[]>([]);
  const [currentServer, setCurrentServer] = useState<VpnServer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadServers();
    loadCurrentServer();
  }, []);

  const loadServers = async () => {
    const serverList = await vpnService.getServers();
    setServers(serverList);
  };

  const loadCurrentServer = async () => {
    const server = await vpnService.getCurrentServer();
    setCurrentServer(server);
  };

  const handleServerSelect = async (server: VpnServer) => {
    // In real implementation, this would connect to the selected server
    // For now, just navigate back
    navigation.goBack();
  };

  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderServerItem = ({ item }: { item: VpnServer }) => (
    <TouchableOpacity
      style={styles.serverItem}
      onPress={() => handleServerSelect(item)}
    >
      <View style={styles.serverContent}>
        <View style={styles.serverFlag}>
          {/* Flag placeholder */}
          <View style={styles.flagPlaceholder} />
        </View>
        <Text style={styles.serverName}>{item.name}</Text>
      </View>
      <View style={styles.arrowIcon} />
    </TouchableOpacity>
  );

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
        <Text style={styles.title}>Server List</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="search Server"
          placeholderTextColor={theme.colors.grey.base}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.searchIcon} />
      </View>

      <View style={styles.divider} />

      {/* Server List */}
      <FlatList
        data={filteredServers}
        renderItem={renderServerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          currentServer ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Connected Server</Text>
              <TouchableOpacity style={styles.serverItem}>
                <View style={styles.serverContent}>
                  <View style={styles.serverFlag}>
                    <View style={styles.globeIcon} />
                  </View>
                  <Text style={styles.serverName}>{currentServer.name}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
            </View>
          ) : null
        }
        ListHeaderComponentStyle={styles.sectionHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No servers found</Text>
          </View>
        }
      />
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
  },
  title: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.grey.light15,
    marginHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.base,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.dark,
  },
  searchIcon: {
    width: 20,
    height: 22,
    backgroundColor: theme.colors.grey.base,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.grey.base,
    marginVertical: theme.spacing.md,
  },
  listContent: {
    paddingHorizontal: theme.spacing.xl,
  },
  sectionHeader: {
    marginBottom: theme.spacing.md,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
    marginBottom: theme.spacing.md,
  },
  serverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.grey.light15,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  serverContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  serverFlag: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.grey.light30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.grey.base,
  },
  globeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary.blue,
  },
  serverName: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.dark,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    backgroundColor: theme.colors.grey.base,
    borderRadius: 4,
  },
  emptyContainer: {
    paddingVertical: theme.spacing['4xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.grey.base,
  },
});

