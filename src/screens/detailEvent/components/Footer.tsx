import {HEIGHT_SCREEN, WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {ButtonGradient, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  isLoading: boolean;
  handleJoinEvent: () => void;
}

const Footer: FC<IProps> = ({handleJoinEvent, isLoading}) => {
  return (
    <LinearGradient
      colors={[Color.BLACK, Color.TRANSPARENT]}
      start={{x: 0, y: 0.7}}
      end={{x: 0, y: 0}}
      style={styles.container}>
      <ButtonGradient
        disabled={isLoading}
        isLoading={isLoading}
        onPress={handleJoinEvent}
        style={styles.btnBuy}
        colorRightIcon={Color.WHITE}>
        <Text style={styles.textBuy}>Join Event</Text>
      </ButtonGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: WIDTH_SCREEN,
    justifyContent: 'flex-end',
    paddingBottom: getSize.v(25),
    paddingTop: getSize.v(20),
  },
  btnBuy: {
    marginHorizontal: getSize.s(50),
  },
  textBuy: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_medium_500,
  },
});

export default memo(Footer);
