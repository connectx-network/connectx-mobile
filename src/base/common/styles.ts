import {StyleSheet} from 'react-native';
import {WIDTH_SCREEN, getSize} from './responsive';

const Styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    flex: 1,
    // backgroundColor: Color.BACKGROUND,
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
