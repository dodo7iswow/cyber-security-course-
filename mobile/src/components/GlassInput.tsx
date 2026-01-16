/**
 * GlassInput Component
 * Liquid glass text input with blur effect
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { theme, glassStyles } from '@/theme';

interface GlassInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          glassStyles.inputGlass,
          isFocused && styles.focused,
          error && styles.error,
        ]}
      >
        <BlurView intensity={15} style={styles.blurContainer}>
          <View style={styles.inputContainer}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

            <TextInput
              style={[styles.input, style]}
              placeholderTextColor={theme.colors.text.tertiary}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...textInputProps}
            />

            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
          </View>
        </BlurView>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...theme.typography.label,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  blurContainer: {
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    minHeight: 52,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing.sm,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    marginLeft: theme.spacing.sm,
  },
  focused: {
    borderColor: theme.colors.primary[500],
    borderWidth: 2,
  },
  error: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
});
