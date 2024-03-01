import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, ModalBox, Text} from '@components';
import Font from '@theme/Font';
import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {
  Asset,
  ImagePickerResponse,
  OptionsCommon,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

interface IProps {
  isVisible: boolean;
  onBackdropPress?: () => void;
  handleImage: (image?: Asset) => void;
}

const options: OptionsCommon = {
  mediaType: 'photo',
  quality: 0.6,
  includeBase64: false,
};

const ModalPickImage: FC<IProps> = ({
  onBackdropPress,
  isVisible,
  handleImage,
}) => {
  const handleLib = async () => {
    try {
      const data: ImagePickerResponse = await launchImageLibrary(options);
      handleImage(data.assets?.[0]);
    } catch (error) {}
  };
  const handleCamera = async () => {
    try {
      const data: ImagePickerResponse = await launchCamera(options);
      handleImage(data.assets?.[0]);
    } catch (error) {}
  };

  return (
    <ModalBox isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Block style={styles.container}>
        <ButtonGradient
          onPress={handleLib}
          styleContainer={styles.btnLib}
          isRightIcon={false}>
          <Text style={styles.textBtn}>Open library</Text>
        </ButtonGradient>
        <ButtonGradient
          onPress={handleCamera}
          styleContainer={styles.btnCamera}
          isRightIcon={false}>
          <Text style={styles.textBtn}>Open Camera</Text>
        </ButtonGradient>
      </Block>
    </ModalBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#29313E',
    paddingTop: getSize.m(12),
    borderTopRightRadius: getSize.m(20),
    borderTopLeftRadius: getSize.m(20),
    paddingHorizontal: getSize.m(12),
    paddingBottom: getSize.v(22),
  },
  btnLib: {
    flex: 1,
    marginRight: getSize.s(12),
  },
  btnCamera: {
    flex: 1,
  },
  textBtn: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
  },
});

export default memo(ModalPickImage);
