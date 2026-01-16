/**
 * Typography System
 * SF Pro on iOS, Roboto on Android
 */

import { Platform } from 'react-native';

const fontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  semibold: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
};

export const typography = {
  // Display
  display: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700' as const,
    fontFamily: fontFamily.bold,
  },

  // Headings
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    fontFamily: fontFamily.bold,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semibold,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semibold,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semibold,
  },

  // Body Text
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
  },

  // Labels & Captions
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    fontFamily: fontFamily.medium,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    fontFamily: fontFamily.regular,
  },

  // Button Text
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    fontFamily: fontFamily.semibold,
  },
} as const;

export type Typography = typeof typography;
