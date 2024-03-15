import {createTheme, useTheme as useThemeRS} from '@shopify/restyle';
import {ColorSchemeName} from 'react-native';
import Color from './Color';

export const theme = createTheme({
  colorScheme: 'light' as ColorSchemeName,
  colors: {
    mainBackground: '#f5f5f5',
    mainForeground: Color.BACKGROUND,
    secondaryBackground: Color.WHITE,
    shadow: '#979797',
    tabColor: '#5669FF',
    input: '#EEEEEF',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
});

export const darkTheme: Theme = {
  ...theme,
  colorScheme: 'dark',
  colors: {
    ...theme.colors,
    mainBackground: Color.BACKGROUND,
    mainForeground: Color.WHITE,
    secondaryBackground: '#29313E',
    shadow: Color.TRANSPARENT,
    tabColor: Color.WHITE,
    input: '#29313E',
  },
};

export type Theme = typeof theme;
export type TColors = Theme['colors'];
export const useTheme = useThemeRS<Theme>;
