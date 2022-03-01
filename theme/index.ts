import { extendTheme } from '@chakra-ui/react';
import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools';
import { SystemStyleObject } from '@chakra-ui/system';

const myTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
    cssVarsPrefix: 'xxxxxxx'
  },
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    gray: {
      50: '#f7fafc',
      // ...
      900: '#171923',
    },
  },
  fonts: {
    body: `'Barlow', sans-serif`,
    heading: `'Archivo Narrow', sans-serif`,
    mono: `Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  styles: {
    global: (props: GlobalStyleProps): SystemStyleObject => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.700', 'whiteAlpha.900')(props),
        bg: mode('gray.50', 'gray.800')(props),
        transition: 'background-color 0.2s',
        lineHeight: 'calc(8px + 2ex)',
      },

      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
      '#__next': {
        minHeight: '100vh',
      },
      hr: {
        borderColor: mode('gray.700', 'whiteAlpha.900')(props),
      },
      pre: {
        overflowX: 'auto',
      },
    }),
  },
});
export default myTheme;