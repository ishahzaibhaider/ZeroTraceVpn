/**
 * Reusable Card Component
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
}

export default function Card({ children, onPress, style }: CardProps) {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Component>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.grey.light15,
    padding: theme.spacing.xl,
  },
});

