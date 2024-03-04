import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block, ModalBox, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const refModalQr = createRef<any>();
export const modalQrControl = {
  show: (qrCode: string) => refModalQr.current?.show(qrCode),
  hide: () => refModalQr.current?.hide(),
};

const ModalQrCode = forwardRef(({}, ref) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const {bottom} = useSafeAreaInsets();
  const [data, setData] = useState<string>('');

  const show = useCallback((qrCode: string) => {
    setData(qrCode);
    setVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {show, hide: handleClose};
  });

  return (
    <ModalBox isVisible={isVisible} onBackdropPress={handleClose}>
      <Block style={styles.content}>
        <QRCode size={WIDTH_SCREEN - getSize.s(80)} value={data} />
      </Block>
      <TouchableOpacity
        style={[
          styles.btnClose,
          {
            marginBottom: bottom + bottom > 20 ? getSize.v(12) : 0,
          },
        ]}
        activeOpacity={0.5}
        onPress={handleClose}>
        <Text style={styles.textBtnClose}>Close</Text>
      </TouchableOpacity>
    </ModalBox>
  );
});

const styles = StyleSheet.create({
  content: {
    backgroundColor: Color.WHITE,
    marginHorizontal: getSize.s(20),
    padding: getSize.s(20),
    borderRadius: getSize.m(20),
    marginBottom: getSize.v(12),
  },
  btnClose: {
    height: getSize.m(54),
    backgroundColor: Color.WHITE,
    marginHorizontal: getSize.s(20),
    borderRadius: getSize.m(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtnClose: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_medium_500,
    color: Color.BACKGROUND,
  },
});

export default ModalQrCode;
