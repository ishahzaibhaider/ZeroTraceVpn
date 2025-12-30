/**
 * Onboarding Screen
 * Introduction screens for first-time users
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      title: 'Welcome to ZeroTrace VPN',
      description: 'Protect your online privacy with military-grade encryption',
    },
    {
      title: 'One-Click Connection',
      description: 'Connect to secure servers around the world with a single tap',
    },
    {
      title: 'Fast & Secure',
      description: 'Enjoy blazing-fast speeds without compromising your security',
    },
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('Main');
    }
  };

  const handleSkip = () => {
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
        <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
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
    paddingHorizontal: theme.spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.sizes['2xl'],
    fontFamily: theme.typography.fonts.poppins.bold,
    color: theme.colors.dark,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  description: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fonts.poppins.regular,
    color: theme.colors.grey.base,
    textAlign: 'center',
    lineHeight: theme.typography.sizes.base * theme.typography.lineHeights.normal,
  },
  footer: {
    paddingBottom: theme.spacing['4xl'],
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing['4xl'],
    gap: theme.spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.grey.light30,
  },
  dotActive: {
    backgroundColor: theme.colors.primary.blue,
    width: 24,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.lg,
  },
  skipButton: {
    flex: 1,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  skipText: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.poppins.medium,
    color: theme.colors.grey.base,
  },
  nextButton: {
    flex: 1,
    backgroundColor: theme.colors.primary.blue,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  nextText: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.inter.bold,
    color: theme.colors.white,
  },
});

