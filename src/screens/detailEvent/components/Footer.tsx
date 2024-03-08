import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {ButtonGradient, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  isLoading: boolean;
  handleJoinEvent: () => void;
  userRole: 'USER' | 'ADMIN';
}

const Footer: FC<IProps> = ({handleJoinEvent, isLoading, userRole}) => {
  // const [checkbox, setCheckbox] = useState<boolean>(false);

  // const handleCheckBox = () => setCheckbox(!checkbox);
  // const handleTerm = () =>
  //   Linking.openURL('https://www.connectx.network/privacy/');
  return (
    <LinearGradient
      colors={[Color.BLACK, Color.TRANSPARENT]}
      start={{x: 0, y: 0.7}}
      end={{x: 0, y: 0}}
      style={styles.container}>
      {/* <Block style={styles.term}>
        <TouchableOpacity onPress={handleCheckBox} activeOpacity={0.5}>
          {!checkbox ? (
            <Block style={styles.btnCheckbox} />
          ) : (
            <Icon name={'checkbox'} color={'#BF56FF'} size={getSize.m(22)} />
          )}
        </TouchableOpacity>
        <Text onPress={handleTerm} style={styles.textTerm}>
          Agree ConnectX’s terms & conditions
        </Text>
      </Block> */}
      <ButtonGradient
        disabled={isLoading}
        isLoading={isLoading}
        onPress={handleJoinEvent}
        style={styles.btnBuy}
        colorRightIcon={Color.WHITE}>
        <Text style={styles.textBuy}>
          {userRole === 'ADMIN' ? 'Scan QR code' : 'Join Event'}
        </Text>
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
    marginHorizontal: getSize.s(20),
  },
  textBuy: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_medium_500,
  },
  term: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize.s(20),
    marginBottom: getSize.v(8),
  },
  btnCheckbox: {
    width: getSize.m(22),
    height: getSize.m(22),
    borderRadius: getSize.m(4),
    borderColor: Color.WHITE,
    borderWidth: getSize.m(2),
  },
  textTerm: {
    marginLeft: getSize.m(8),
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(12),
    textDecorationLine: 'underline',
  },
});

export default memo(Footer);
