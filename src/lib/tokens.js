// Shape a generated theme into a clean, portable design-tokens object and a
// set of CSS custom properties for applying the theme to the live preview.
import { googleFontsHref } from './fonts.js';

export function toTokens(theme) {
  const c = theme.colors;
  return {
    $schema: 'theme-randomizer/v1',
    name: theme.name,
    appearance: theme.appearance,
    mode: theme.meta.mode,
    preset: theme.meta.preset,
    archetype: theme.meta.archetype,
    harmony: theme.meta.harmony,
    color: {
      background: c.background,
      surface: c.surface,
      surfaceAlt: c.surfaceAlt,
      border: c.border,
      text: c.text,
      textMuted: c.textMuted,
      primary: c.primary,
      primaryContrast: c.primaryContrast,
      secondary: c.secondary,
      secondaryContrast: c.secondaryContrast,
      accent: c.accent,
      accentContrast: c.accentContrast,
      success: c.success,
      warning: c.warning,
      danger: c.danger,
    },
    background: { type: theme.background.type, value: theme.background.value },
    typography: {
      heading: {
        fontFamily: theme.typography.heading.stack,
        googleFamily: theme.typography.heading.family,
        weights: theme.typography.heading.weights.split(';'),
      },
      body: {
        fontFamily: theme.typography.body.stack,
        googleFamily: theme.typography.body.family,
        weights: theme.typography.body.weights.split(';'),
      },
      headingTransform: theme.typography.treatment?.case ?? 'none',
      headingTracking: theme.typography.treatment?.tracking ?? '-0.02em',
      googleFontsUrl: googleFontsHref(theme.typography),
    },
    radius: `${theme.shape.radius}px`,
    icons: {
      library: theme.icons.library,
      strokeWidth: theme.icons.strokeWidth,
      sample: theme.icons.sample,
    },
    layout: {
      archetype: theme.layout.archetype,
      shell: theme.layout.shell,
      density: theme.layout.density,
      align: theme.layout.align,
      cardStyle: theme.layout.cardStyle,
      accent: theme.layout.accent,
      blocks: theme.layout.blocks.map((b) => ({ type: b.type, variant: b.variant })),
    },
  };
}

export function toJSON(theme) {
  return JSON.stringify(toTokens(theme), null, 2);
}

// CSS custom properties consumed by the preview surface.
export function toCssVars(theme) {
  const c = theme.colors;
  return {
    '--bg': theme.background.value,
    '--c-background': c.background,
    '--c-surface': c.surface,
    '--c-surface-alt': c.surfaceAlt,
    '--c-border': c.border,
    '--c-text': c.text,
    '--c-text-muted': c.textMuted,
    '--c-primary': c.primary,
    '--c-primary-contrast': c.primaryContrast,
    '--c-secondary': c.secondary,
    '--c-secondary-contrast': c.secondaryContrast,
    '--c-accent': c.accent,
    '--c-accent-contrast': c.accentContrast,
    '--c-success': c.success,
    '--c-warning': c.warning,
    '--c-danger': c.danger,
    '--font-heading': theme.typography.heading.stack,
    '--font-body': theme.typography.body.stack,
    '--heading-transform': theme.typography.treatment?.case ?? 'none',
    '--heading-tracking': theme.typography.treatment?.tracking ?? '-0.02em',
    '--radius': `${theme.shape.radius}px`,
  };
}
