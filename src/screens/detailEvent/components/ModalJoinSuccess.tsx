import {Icon} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, ModalBox, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';

interface IProps {
  isVisible: boolean;
  onBackdropPress: () => void;
}

const ModalJoinSuccess: FC<IProps> = ({isVisible, onBackdropPress}) => {
  return (
    <ModalBox
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      position="center">
      <Block style={styles.container}>
        <Block alignCenter marginBottom={30} marginTop={12}>
          <Icon
            name={'checkmark-circle-outline'}
            size={getSize.m(60)}
            color={Color.GREEN_HOLDER}
          />
          <Text style={styles.title}>Join Event Successfully</Text>
        </Block>
        <ButtonGradient
          onPress={onBackdropPress}
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
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.m(16),
  },
  textBtnDone: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
  },
  btnDone: {
    height: getSize.m(50),
  },
});

export default memo(ModalJoinSuccess);
