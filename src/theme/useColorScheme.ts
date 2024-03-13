import {useCallback, useContext} from 'react';
import {ColorSchemeContext} from './ColorSchemeProvider';
import {dist, makeImageFromView, vec} from '@shopify/react-native-skia';
import {HEIGHT_SCREEN, WIDTH_SCREEN} from '@base/common/responsive';
import {withTiming} from 'react-native-reanimated';

const wait = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const corners = [
  vec(0, 0),
  vec(WIDTH_SCREEN, 0),
  vec(WIDTH_SCREEN, HEIGHT_SCREEN),
  vec(0, HEIGHT_SCREEN),
];

export const useColorScheme = () => {
  const ctx = useContext(ColorSchemeContext);
  if (ctx === null) {
    throw new Error('No ColorScheme context context found');
  }
  const {colorScheme, dispatch, ref, transition, circle, active} = ctx;

  const toggle = useCallback(
    async (x: number, y: number) => {
      const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';

      dispatch({
        active: true,
        colorScheme,
        overlay1: null,
        overlay2: null,
        statusBarStyle: newColorScheme,
      });
      // 0. Define the circle and its maximum radius
      const r = Math.max(...corners.map(corner => dist(corner, {x, y})));
      circle.value = {x, y, r};

      // 1. Take the screenshot
      const overlay1 = await makeImageFromView(ref);
      // 2. display it
      dispatch({
        active: true,
        colorScheme,
        overlay1,
        overlay2: null,
        statusBarStyle: newColorScheme,
      });
      // 3. switch to dark mode
      await wait(16);
      dispatch({
        active: true,
        colorScheme: newColorScheme,
        overlay1,
        overlay2: null,
        statusBarStyle: newColorScheme,
      });
      // 4. wait for the dark mode to render
      await wait(16);
      // 5. take screenshot
      const overlay2 = await makeImageFromView(ref);
      dispatch({
        active: true,
        colorScheme: newColorScheme,
        overlay1,
        overlay2,
        statusBarStyle: newColorScheme,
      });
      // 6. transition
      transition.value = 0;
      transition.value = withTiming(1, {duration: 650});
      await wait(650);
      dispatch({
        active: false,
        colorScheme: newColorScheme,
        overlay1: null,
        overlay2: null,
        statusBarStyle: newColorScheme === 'light' ? 'dark' : 'light',
      });
    },
    [circle, colorScheme, dispatch, ref, transition],
  );

  return {colorScheme, toggle, active};
};
