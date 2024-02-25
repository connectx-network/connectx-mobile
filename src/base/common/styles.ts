import {StyleSheet} from 'react-native';
import {WIDTH_SCREEN, getSize} from './responsive';
import Color from '@theme/Color';

const Styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
  },

  paddingHorizontal: {
    paddingHorizontal: getSize.s(20),
  },

  centerNoFlex: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  justifyBetween: {
    justifyContent: 'space-between',
  },

  alignItemsEnd: {
    alignItems: 'flex-end',
  },

  fullWidth: {
    width: WIDTH_SCREEN,
  },

  padding: {
    paddingHorizontal: getSize.m(2),
    paddingVertical: getSize.m(4),
  },
});

export default Styles;
