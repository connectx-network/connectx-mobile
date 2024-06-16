import {Icon} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import {hapticFeedback} from '@base/utils/Utils';
import {Text} from '@components';
import {navigate} from '@navigation/navigationService';
import {LOGIN_SCREEN, SHARE_PROFILE_SCREEN} from '@navigation/routes';
import Font from '@theme/Font';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {FC, memo, useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Menu} from 'react-native-material-menu';

interface IProps {
  isLogged: boolean;
}

const ActionRightTabBar: FC<IProps> = ({isLogged}) => {
  const styles = useStyle(getStyles);
  const [visible, setVisible] = useState<boolean>(false);

  const handleClose = () => setVisible(false);
  const handleOpen = () => {
    setVisible(true);
    hapticFeedback();
  };

  const handleShareProfile = useCallback(() => {
    setVisible(false);
    if (!isLogged) {
      return navigate(LOGIN_SCREEN);
    }
    navigate(SHARE_PROFILE_SCREEN);
  }, []);

  return (
    <Menu
      visible={visible}
      style={styles.menu}
      onRequestClose={handleClose}
      anchor={
        <TouchableOpacity onPress={handleOpen}>
          <Icon
            name={'ellipsis-vertical'}
            size={getSize.m(22)}
            {...styles.iconOption}
          />
        </TouchableOpacity>
      }>
      <TouchableOpacity
        onPress={handleShareProfile}
        activeOpacity={0.5}
        style={styles.btnItem}>
        <Icon name="share-social" size={getSize.m(18)} {...styles.icon} />
        <Text style={styles.textShare}>Share Profile</Text>
      </TouchableOpacity>
    </Menu>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    menu: {
      backgroundColor: colors.mainForeground,
      borderRadius: getSize.m(12),
    },
    btnItem: {
      height: getSize.m(40),
      backgroundColor: colors.mainForeground,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: getSize.m(8),
      borderRadius: getSize.m(12),
    },
    textShare: {
      fontFamily: Font.font_regular_400,
      fontSize: getSize.m(12, 0.3),
      marginLeft: getSize.m(4),
      color: colors.mainBackground,
    },
    icon: {
      color: colors.mainBackground,
    },
    iconOption: {
      color: colors.mainForeground,
    },
  });

export default memo(ActionRightTabBar);
