import {Icon} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import {hapticFeedback} from '@base/utils/Utils';
import {Text} from '@components';
import {navigate} from '@navigation/navigationService';
import {SHARE_PROFILE_SCREEN} from '@navigation/routes';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {memo, useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Menu} from 'react-native-material-menu';

const ActionRightTabBar = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleClose = () => setVisible(false);
  const handleOpen = () => {
    setVisible(true);
    hapticFeedback();
  };

  const handleShareProfile = useCallback(() => {
    setVisible(false);
    navigate(SHARE_PROFILE_SCREEN);
  }, []);

  return (
    <Menu
      visible={visible}
      onRequestClose={handleClose}
      anchor={
        <TouchableOpacity onPress={handleOpen}>
          <Icon
            name={'ellipsis-vertical'}
            color={Color.WHITE}
            size={getSize.m(22)}
          />
        </TouchableOpacity>
      }>
      <TouchableOpacity
        onPress={handleShareProfile}
        activeOpacity={0.5}
        style={styles.btnItem}>
        <Icon
          name="share-social"
          color={Color.BACKGROUND}
          size={getSize.m(18)}
        />
        <Text style={styles.textShare}>Share Profile</Text>
      </TouchableOpacity>
    </Menu>
  );
};

const styles = StyleSheet.create({
  btnItem: {
    height: getSize.m(40),
    backgroundColor: Color.WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: getSize.m(8),
    borderRadius: getSize.m(12),
  },
  textShare: {
    color: Color.BACKGROUND,
    fontFamily: Font.font_regular_400,
    fontSize: getSize.m(12, 0.3),
    marginLeft: getSize.m(4),
  },
});

export default memo(ActionRightTabBar);
