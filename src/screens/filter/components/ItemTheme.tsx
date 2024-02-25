import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, ReactNode, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SvgProps} from 'react-native-svg';

interface IProps {
  name: string;
  icon: (props?: SvgProps) => ReactNode;
}

const ItemTheme: FC<IProps> = ({name, icon}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <ButtonGradient
        style={StyleSheet.flatten([styles.icon, styles.iconInActive])}
        isRightIcon={false}
        colors={[Color.TRANSPARENT]}>
        {icon({color: Color.WHITE})}
      </ButtonGradient>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: getSize.s(12),
  },
  icon: {
    width: getSize.m(64),
    height: getSize.m(64),
    borderRadius: getSize.m(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInActive: {
    borderColor: Color.WHITE,
    borderWidth: getSize.m(1),
  },
  name: {
    fontSize: getSize.m(14, 0.3),
    fontFamily: Font.font_regular_400,
    marginTop: getSize.m(12),
  },
});

export default memo(ItemTheme);
