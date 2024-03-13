import {Icon} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import {Text} from '@components';
import Block from '@components/Block';
import {goBack} from '@navigation/navigationService';
import Font from '@theme/Font';
import {useTheme} from '@theme/Theme';
import {FC, ReactNode, memo} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

interface IProps {
  title: string;
  customActionRight?: () => ReactNode;
  styleContainer?: StyleProp<ViewStyle>;
  hideRightIcon?: boolean;
  leftIcon?: ReactNode | null;
  handleLeftIcon?: () => void;
}

const TabBar: FC<IProps> = ({
  title,
  customActionRight,
  styleContainer,
  hideRightIcon,
  leftIcon,
  handleLeftIcon,
}) => {
  const {colors} = useTheme();
  return (
    <Block style={[styles.tabBar, styleContainer]}>
      <Block row alignCenter flex>
        <TouchableOpacity
          onPress={handleLeftIcon || goBack}
          activeOpacity={0.5}>
          {leftIcon || (
            <Icon
              name={'arrow-back-outline'}
              color={colors.mainForeground}
              size={getSize.m(26)}
            />
          )}
        </TouchableOpacity>
        <Text
          color={colors.mainForeground}
          numberOfLines={1}
          style={styles.title}>
          {title}
        </Text>
      </Block>
      {!hideRightIcon &&
        (customActionRight ? (
          customActionRight()
        ) : (
          <Block row alignCenter>
            <TouchableOpacity style={styles.btnAction} activeOpacity={0.5}>
              <Icon
                name={'ellipsis-vertical'}
                color={colors.mainForeground}
                size={getSize.m(22)}
              />
            </TouchableOpacity>
          </Block>
        ))}
    </Block>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize.s(20),
    paddingVertical: getSize.m(8),
  },
  title: {
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_medium_500,
    marginLeft: getSize.m(12),
  },
  btnAction: {
    padding: getSize.m(5),
    marginLeft: getSize.m(6),
  },
});

export default memo(TabBar);
