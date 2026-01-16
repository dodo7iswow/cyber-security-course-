/**
 * Home Screen
 * Main screen with salon discovery and glassmorphism UI
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '@/components/GlassCard';
import { GlassButton } from '@/components/GlassButton';
import { theme } from '@/theme';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#FFE5EF', '#F5F5F5', '#E5F0FF']}
        style={styles.background}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Bonjou! 👋</Text>
          <Text style={styles.title}>Find Your Perfect Salon</Text>
        </View>

        {/* Search Card */}
        <GlassCard variant="light" style={styles.searchCard}>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchPlaceholder}>
              Search salons, services...
            </Text>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category, index) => (
              <GlassCard
                key={index}
                variant="medium"
                style={styles.categoryCard}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </GlassCard>
            ))}
          </ScrollView>
        </View>

        {/* Featured Salons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Salons</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {featuredSalons.map((salon, index) => (
            <GlassCard key={index} variant="light" style={styles.salonCard}>
              {/* Salon Image */}
              <View style={styles.salonImageContainer}>
                <LinearGradient
                  colors={theme.colors.gradients.primary}
                  style={styles.salonImagePlaceholder}
                >
                  <Text style={styles.salonImageText}>
                    {salon.name.charAt(0)}
                  </Text>
                </LinearGradient>
              </View>

              {/* Salon Info */}
              <View style={styles.salonInfo}>
                <Text style={styles.salonName}>{salon.name}</Text>
                <Text style={styles.salonAddress}>{salon.address}</Text>

                <View style={styles.salonMeta}>
                  <View style={styles.rating}>
                    <Text style={styles.ratingIcon}>⭐</Text>
                    <Text style={styles.ratingText}>{salon.rating}</Text>
                  </View>
                  <Text style={styles.distance}>{salon.distance}</Text>
                </View>
              </View>

              {/* Book Button */}
              <GlassButton
                variant="primary"
                size="small"
                onPress={() => console.log('Book:', salon.name)}
                style={styles.bookButton}
              >
                Book Now
              </GlassButton>
            </GlassCard>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const categories = [
  { name: 'Haircut', icon: '✂️' },
  { name: 'Nails', icon: '💅' },
  { name: 'Makeup', icon: '💄' },
  { name: 'Braiding', icon: '👩🏾' },
  { name: 'Facial', icon: '✨' },
  { name: 'Massage', icon: '💆🏾' },
];

const featuredSalons = [
  {
    name: 'Beauty Luxe',
    address: 'Pétion-Ville, Port-au-Prince',
    rating: '4.8',
    distance: '2.5 km',
  },
  {
    name: 'Salon Élégance',
    address: 'Delmas 31, Port-au-Prince',
    rating: '4.9',
    distance: '1.8 km',
  },
  {
    name: 'Coiffure Moderne',
    address: 'Cap-Haïtien',
    rating: '4.7',
    distance: '3.2 km',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    marginTop: theme.spacing['2xl'],
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
  },
  searchCard: {
    marginBottom: theme.spacing.lg,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
  },
  searchPlaceholder: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
  },
  searchIcon: {
    fontSize: 20,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  seeAll: {
    ...theme.typography.label,
    color: theme.colors.primary[500],
  },
  categoriesScroll: {
    marginHorizontal: -theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  categoryCard: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    marginRight: theme.spacing.sm,
    alignItems: 'center',
    minWidth: 100,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    ...theme.typography.label,
    color: theme.colors.text.primary,
  },
  salonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  salonImageContainer: {
    marginRight: theme.spacing.md,
  },
  salonImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  salonImageText: {
    ...theme.typography.h2,
    color: theme.colors.text.inverse,
  },
  salonInfo: {
    flex: 1,
  },
  salonName: {
    ...theme.typography.h4,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  salonAddress: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  salonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  ratingIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    ...theme.typography.label,
    color: theme.colors.text.primary,
  },
  distance: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },
  bookButton: {
    marginLeft: theme.spacing.sm,
  },
  bottomSpacing: {
    height: theme.spacing['4xl'],
  },
});
