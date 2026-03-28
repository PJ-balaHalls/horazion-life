// src/theme/index.ts
import { createTheme } from '@shopify/restyle';
import { colors } from './colors';

const theme = createTheme({
  colors: {
    ...colors,
    mainBackground: colors.bg,
    mainText: colors.text,
  },
  spacing: {
    none: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadii: {
    none: 0,
    s: 4,
    m: 8, // Padrão Horazion para componentes
    l: 12,
    corner: 20, // Para containers principais
    pill: 999,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      color: 'mainText',
      fontSize: 16,
    },
    h1: {
      fontWeight: 'bold',
      fontSize: 28,
      letterSpacing: -0.5,
    },
    h2: {
      fontWeight: '600',
      fontSize: 20,
    },
    body: {
      fontSize: 16,
      color: 'dark2',
    },
    subText: {
      fontSize: 14,
      color: 'gray1',
    },
    button: {
      color: 'bg',
      fontWeight: '600',
      fontSize: 16,
    }
  },
});

export type Theme = typeof theme;
export default theme;