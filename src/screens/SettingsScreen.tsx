/**
 * Settings Screen
 * App settings and preferences
 */

import React from 'react';
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

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const settingsItems = [
    {
      id: 'connection-type',
      title: 'Connection Type',
      description: 'Choose how your VPN connects. Select the protocol that best fits your speed and security needs.',
      onPress: () => navigation.navigate('ConnectionType'),
    },
    {
      id: 'terms',
      title: 'Terms of Use',
      description: undefined,
      onPress: () => {
        // Navigate to terms screen
      },
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: undefined,
      onPress: () => {
        // Navigate to privacy policy screen
      },
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
        {settingsItems.map((item, index) => (
          <View key={item.id}>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={item.onPress}
            >
              <View style={styles.settingsContent}>
                {item.description && (
                  <View style={styles.settingsTextContainer}>
                    <Text style={styles.settingsTitle}>{item.title}</Text>
                    <Text style={styles.settingsDescription}>{item.description}</Text>
                  </View>
                )}
                {!item.description && (
                  <Text style={styles.settingsTitle}>{item.title}</Text>
                )}
              </View>
              <View style={styles.arrowIcon} />
            </TouchableOpacity>
            {index < settingsItems.length - 1 && <View style={styles.divider} />}
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
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTextContainer: {
    gap: theme.spacing.sm,
  },
  settingsTitle: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.semiBold,
    color: theme.colors.dark,
    marginBottom: theme.spacing.sm,
  },
  settingsDescription: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.grey.base,
    lineHeight: theme.typography.sizes.base * theme.typography.lineHeights.normal,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    backgroundColor: theme.colors.grey.base,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.grey.base,
    marginVertical: theme.spacing.md,
  },
});

