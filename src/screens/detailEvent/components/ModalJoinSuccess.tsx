import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {hapticFeedback} from '@base/utils/Utils';
import {Block, ButtonGradient, ModalBox, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {HapticFeedbackTypes} from 'react-native-haptic-feedback';
import QRCode from 'react-native-qrcode-svg';

interface IProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  userId: string;
  eventId?: string;
}

const ModalJoinSuccess: FC<IProps> = ({
  isVisible,
  onBackdropPress,
  userId,
  eventId,
}) => {
  const handleDone = useCallback(() => {
    onBackdropPress();
    hapticFeedback(HapticFeedbackTypes.notificationSuccess);
  }, [onBackdropPress]);
  return (
    <ModalBox
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      position="center">
      <Block style={styles.container}>
        <Block alignCenter marginBottom={25} marginTop={12}>
          <Text style={styles.title}>Join Event Successfully</Text>
          <Text style={styles.noteQr}>
            This is the QR code to join your event
          </Text>
        </Block>
        <Block style={styles.boxQr}>
          <QRCode size={WIDTH_SCREEN * 0.35} value={`${eventId};${userId}`} />
        </Block>

        <ButtonGradient
          onPress={handleDone}
          style={styles.btnDone}
          isRightIcon={false}>
          <Text style={styles.textBtnDone}>Done</Text>
        </ButtonGradient>
      </Block>
    </ModalBox>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#29313E',
    borderRadius: getSize.m(20),
    marginHorizontal: getSize.s(12),
    padding: getSize.m(12),
  },
  title: {
    fontSize: getSize.m(18, 0.3),
    fontFamily: Font.font_medium_500,
    color: Color.GREEN_HOLDER,
  },
  textBtnDone: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
  },
  btnDone: {
    height: getSize.m(50),
  },
  boxQr: {
    width: WIDTH_SCREEN * 0.35 + getSize.s(20),
    height: WIDTH_SCREEN * 0.35 + getSize.s(20),
    borderRadius: getSize.m(12),
    backgroundColor: Color.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: getSize.v(20),
  },
  noteQr: {
    textAlign: 'center',
    fontFamily: Font.font_regular_400,
    fontSize: getSize.m(13, 0.3),
    marginTop: getSize.v(6),
  },
});

export default memo(ModalJoinSuccess);
