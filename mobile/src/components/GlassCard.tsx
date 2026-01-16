/**
 * GlassCard Component
 * Liquid glass card with blur effect
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { theme, glassStyles } from '@/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number; // Blur intensity (0-100)
  variant?: 'light' | 'medium' | 'dark';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 20,
  variant = 'light',
}) => {
  const containerStyle = [
    styles.container,
    variant === 'light' && glassStyles.cardLight,
    variant === 'medium' && glassStyles.cardMedium,
    variant === 'dark' && glassStyles.cardDark,
    style,
  ];

  return (
    <View style={containerStyle}>
      <BlurView intensity={intensity} style={styles.blur}>
        <View style={styles.content}>{children}</View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  blur: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
});
