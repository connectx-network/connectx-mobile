import {useMemo} from 'react';
import {TColors, useTheme} from './Theme';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export function useStyle<T>(func: (props: TColors) => NamedStyles<T>) {
  const {colors} = useTheme();

  const styles = useMemo(() => func(colors), [colors]);

  return styles;
}
