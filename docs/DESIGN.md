# Liquid Glass Design System

BeautyBook Haiti uses a modern **glassmorphism** (liquid glass) design inspired by the latest iOS design language.

## What is Glassmorphism?

Glassmorphism is a UI design trend featuring:
- ✨ Frosted glass effect with blur
- 🌈 Semi-transparent backgrounds
- 🔲 Subtle borders and shadows
- 🎨 Vibrant gradient backgrounds
- 💫 Smooth animations and transitions

## Design Principles

### 1. Transparency & Blur

All UI elements use semi-transparent backgrounds with blur effects:

```typescript
backgroundColor: 'rgba(255, 255, 255, 0.7)'  // 70% white opacity
```

The blur effect is achieved using Expo's `BlurView` component with intensity values between 10-30.

### 2. Layering

Elements are layered on top of colorful gradient backgrounds:

```typescript
<LinearGradient
  colors={['#FFE5EF', '#F5F5F5', '#E5F0FF']}
  style={styles.background}
/>
```

### 3. Subtle Borders

Glass elements have thin, semi-transparent borders:

```typescript
borderWidth: 1
borderColor: 'rgba(255, 255, 255, 0.2)'
```

### 4. Soft Shadows

Shadows are gentle and create depth:

```typescript
shadowColor: '#000'
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.1
shadowRadius: 8
```

## Color Palette

### Brand Colors

- **Primary Pink:** `#FF0062` - Main brand color
- **Accent Pink:** `#FF6B9D` - Secondary actions
- **Purple:** `#A855F7` - Premium features
- **Teal:** `#14B8A6` - Success states

### Glass Effects

- **Light Glass:** `rgba(255, 255, 255, 0.7)` - Main cards
- **Medium Glass:** `rgba(255, 255, 255, 0.5)` - Overlays
- **Dark Glass:** `rgba(0, 0, 0, 0.3)` - Dark mode

## Typography

Using system fonts for native feel:
- **iOS:** SF Pro
- **Android:** Roboto

### Type Scale

```
Display:  48px / 700 weight
H1:       32px / 700 weight
H2:       28px / 600 weight
H3:       24px / 600 weight
H4:       20px / 600 weight
Body:     16px / 400 weight
Label:    14px / 500 weight
Caption:  12px / 400 weight
```

## Components

### GlassCard

Frosted glass card with blur effect:

```tsx
<GlassCard variant="light" intensity={20}>
  <Text>Content goes here</Text>
</GlassCard>
```

**Variants:**
- `light` - Light background (default)
- `medium` - Semi-transparent
- `dark` - Dark background

### GlassButton

Button with glass effect or gradient:

```tsx
<GlassButton
  variant="primary"
  size="medium"
  onPress={() => {}}
>
  Book Now
</GlassButton>
```

**Variants:**
- `primary` - Gradient background
- `secondary` - Solid background
- `glass` - Frosted glass effect
- `outline` - Transparent with border

**Sizes:**
- `small` - 32px height
- `medium` - 44px height
- `large` - 56px height

### GlassInput

Text input with frosted background:

```tsx
<GlassInput
  label="Phone Number"
  placeholder="509 XXXX XXXX"
  value={phone}
  onChangeText={setPhone}
/>
```

## Spacing System

Based on 4px grid:

```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 40px
3xl: 48px
4xl: 64px
```

## Border Radius

Rounded corners for modern feel:

```
sm:  8px   - Small elements
md:  12px  - Input fields
lg:  16px  - Cards
xl:  24px  - Large cards
2xl: 32px  - Modals
full: 9999px - Pills/Buttons
```

## Animations

### Smooth Transitions

All interactions use smooth animations:

```typescript
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
}).start()
```

### Haptic Feedback

Buttons provide tactile feedback on press using Expo Haptics.

### Gestures

- Swipe gestures for navigation
- Pull-to-refresh on lists
- Pinch-to-zoom on images

## Best Practices

### DO ✅

- Layer glass elements on gradient backgrounds
- Use blur intensity between 10-30
- Keep borders subtle (0.2-0.3 opacity)
- Add soft shadows for depth
- Use smooth animations (200-300ms)

### DON'T ❌

- Don't stack too many glass layers (max 2-3)
- Don't use glass on solid backgrounds
- Don't make blur too intense (>40)
- Don't use harsh shadows
- Don't skip accessibility contrast checks

## Accessibility

### Color Contrast

All text meets WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum

### Focus States

Interactive elements have clear focus indicators:

```typescript
focused: {
  borderColor: theme.colors.primary[500],
  borderWidth: 2,
}
```

### Touch Targets

All buttons have minimum 44x44px touch area per iOS guidelines.

## Dark Mode Support

The design system supports both light and dark modes:

```typescript
// Light mode
backgroundColor: colors.glass.light

// Dark mode
backgroundColor: colors.glass.dark
```

## Inspiration

This design is inspired by:
- iOS 18 design language
- macOS Big Sur glassmorphism
- Modern banking apps
- Premium lifestyle apps

## Examples

### Home Screen

Features:
- Gradient background
- Glass search bar
- Category cards with blur
- Salon cards with images
- Floating action buttons

### Booking Flow

1. **Service Selection** - Glass cards with service details
2. **Date/Time Picker** - Glass overlay with calendar
3. **Payment** - Secure glass form with MonCash
4. **Confirmation** - Success card with animation

### Profile Screen

- Glass avatar container
- Semi-transparent info cards
- Blur effect on background image
- Smooth tab transitions

## Resources

### Figma Design File
[Coming Soon]

### Color Swatches
See `mobile/src/theme/colors.ts`

### Component Library
See `mobile/src/components/`

---

**Happy Designing! 🎨**

The liquid glass aesthetic makes BeautyBook Haiti feel premium, modern, and uniquely Haitian.
