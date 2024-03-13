import {HEIGHT_SCREEN, WIDTH_SCREEN} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {
  Canvas,
  Circle,
  Image,
  ImageShader,
  SkImage,
  mix,
} from '@shopify/react-native-skia';
import {ReactNode, RefObject, createContext, useReducer, useRef} from 'react';
import {ColorSchemeName, StatusBar, StyleSheet, View} from 'react-native';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

interface ColorScheme {
  active: boolean;
  statusBarStyle: ColorSchemeName;
  colorScheme: ColorSchemeName;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
}

interface ColorSchemeContext extends ColorScheme {
  ref: RefObject<View>;
  transition: SharedValue<number>;
  circle: SharedValue<{x: number; y: number; r: number}>;
  dispatch: (scheme: ColorScheme) => void;
}

interface ColorSchemeProviderProps {
  children: ReactNode;
}

const defaultValue: ColorScheme = {
  active: false,
  // statusBarStyle: Appearance.getColorScheme() ?? 'light' ? 'dark' : 'light',
  // colorScheme: Appearance.getColorScheme() ?? 'dark',
  statusBarStyle: 'light',
  colorScheme: 'dark',
  overlay1: null,
  overlay2: null,
};
export const ColorSchemeContext = createContext<ColorSchemeContext | null>(
  null,
);

const colorSchemeReducer = (_: ColorScheme, colorScheme: ColorScheme) => {
  return colorScheme;
};

const ColorSchemeProvider = ({children}: ColorSchemeProviderProps) => {
  const circle = useSharedValue({x: 0, y: 0, r: 0});
  const ref = useRef(null);
  const transition = useSharedValue(0);
  const [{colorScheme, overlay1, overlay2, active, statusBarStyle}, dispatch] =
    useReducer(colorSchemeReducer, defaultValue);
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });

  return (
    <View style={Styles.root}>
      <StatusBar
        translucent
        barStyle={statusBarStyle === 'light' ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <View ref={ref} style={Styles.root} collapsable={false}>
        <ColorSchemeContext.Provider
          value={{
            active,
            colorScheme,
            overlay1,
            overlay2,
            dispatch,
            ref,
            transition,
            circle,
            statusBarStyle,
          }}>
          {children}
        </ColorSchemeContext.Provider>
      </View>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
        <Image
          image={overlay1}
          x={0}
          y={0}
          width={WIDTH_SCREEN}
          height={HEIGHT_SCREEN}
        />
        {overlay2 && (
          <Circle c={circle} r={r}>
            <ImageShader
              image={overlay2}
              x={0}
              y={0}
              width={WIDTH_SCREEN}
              height={HEIGHT_SCREEN}
              fit="cover"
            />
          </Circle>
        )}
      </Canvas>
    </View>
  );
};

export default ColorSchemeProvider;
