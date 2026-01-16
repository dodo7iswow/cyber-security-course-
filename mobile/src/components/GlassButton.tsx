/**
 * GlassButton Component
 * Liquid glass button with haptic feedback
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, glassStyles } from '@/theme';

interface GlassButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const containerStyle = [
    styles.container,
    size === 'small' && styles.small,
    size === 'medium' && styles.medium,
    size === 'large' && styles.large,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    size === 'small' && styles.textSmall,
    size === 'medium' && styles.textMedium,
    size === 'large' && styles.textLarge,
    variant === 'primary' && styles.textPrimary,
    variant === 'secondary' && styles.textSecondary,
    disabled && styles.textDisabled,
    textStyle,
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary[500]}
        />
      );
    }

    return <Text style={textStyleCombined}>{children}</Text>;
  };

  // Primary button with gradient
  if (variant === 'primary') {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={theme.colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Glass button with blur
  if (variant === 'glass') {
    return (
      <TouchableOpacity
        style={[containerStyle, glassStyles.buttonGlass]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <BlurView intensity={20} style={styles.blurContent}>
          {renderContent()}
        </BlurView>
      </TouchableOpacity>
    );
  }

  // Outline button
  if (variant === 'outline') {
    return (
      <TouchableOpacity
        style={[containerStyle, styles.outline]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  // Secondary button (default)
  return (
    <TouchableOpacity
      style={[containerStyle, styles.secondary]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  small: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    minHeight: 56,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  blurContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  secondary: {
    backgroundColor: theme.colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...theme.typography.button,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  textPrimary: {
    color: theme.colors.text.inverse,
  },
  textSecondary: {
    color: theme.colors.text.primary,
  },
  textDisabled: {
    color: theme.colors.text.tertiary,
  },
});
