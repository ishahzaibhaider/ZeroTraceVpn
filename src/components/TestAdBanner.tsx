/**
 * Test Ad Banner Component
 * Behaves like a test ad for development
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../theme';

interface TestAdBannerProps {
  onPress?: () => void;
}

export default function TestAdBanner({ onPress }: TestAdBannerProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default behavior: log ad click
      console.log('Test Ad clicked');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.adContainer}>
        {/* Ad Image */}
        <View style={styles.adImageContainer}>
          <View style={styles.adImagePlaceholder} />
        </View>
        
        {/* Ad Content */}
        <View style={styles.adContent}>
          <View style={styles.adContentTop}>
            <View style={styles.adPlaceholder1} />
            <View style={styles.adPlaceholder2} />
          </View>
          <TouchableOpacity 
            style={styles.adButton} 
            onPress={handlePress}
            activeOpacity={0.8}
          >
            <Text style={styles.adButtonText}>Install</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Footer - Home Indicator */}
      <View style={styles.footer}>
        <View style={styles.footerBar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  adContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',
  },
  adImageContainer: {
    width: 111,
    height: 111,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
  },
  adImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.background.grey,
  },
  adContent: {
    flex: 1,
    backgroundColor: theme.colors.background.grey,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    justifyContent: 'space-between',
  },
  adContentTop: {
    gap: theme.spacing.xl,
  },
  adPlaceholder1: {
    height: 16,
    width: 60,
    backgroundColor: theme.colors.grey.light45,
    borderRadius: theme.borderRadius.md,
  },
  adPlaceholder2: {
    height: 12,
    width: '100%',
    backgroundColor: theme.colors.grey.light30,
    borderRadius: theme.borderRadius.md,
  },
  adButton: {
    backgroundColor: theme.colors.primary.blue,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  adButtonText: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fonts.inter.bold,
    color: theme.colors.white,
    fontWeight: '700',
    lineHeight: theme.typography.sizes.base * theme.typography.lineHeights.relaxed,
  },
  footer: {
    paddingVertical: theme.spacing.base,
    alignItems: 'center',
    width: '100%',
  },
  footerBar: {
    width: 122,
    height: 4,
    backgroundColor: theme.colors.grey.light60,
    borderRadius: theme.borderRadius.sm,
  },
});

