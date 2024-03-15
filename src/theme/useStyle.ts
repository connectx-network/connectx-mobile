import {useMemo} from 'react';
import {TColors, useTheme} from './Theme';
import {ColorSchemeName, ImageStyle, TextStyle, ViewStyle} from 'react-native';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export function useStyle<T>(
  func: (props: TColors, colorScheme?: ColorSchemeName) => NamedStyles<T>,
) {
  const {colors, colorScheme} = useTheme();

  const styles = useMemo(
    () => func(colors, colorScheme),
    [colors, colorScheme],
  );

  return styles;
}
