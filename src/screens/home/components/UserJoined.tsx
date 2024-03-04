import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {Block, Image, Text} from '@components';
import {UserInfo} from '@model/user';
import Font from '@theme/Font';
import {FC, memo} from 'react';
import {ImageStyle, StyleProp, StyleSheet, TextStyle} from 'react-native';

interface IProps {
  style?: StyleProp<ImageStyle>;
  translateX?: number;
  styleText?: StyleProp<TextStyle>;
  totalUser?: number;
  users?: Array<{user: UserInfo}>;
}

const image = [Images.AVATAR, Images.USER_TEST];

const UserJoined: FC<IProps> = ({
  style,
  translateX,
  styleText,
  totalUser,
  users,
}) => {
  return (
    <Block row alignCenter>
      <Block row alignCenter>
        {(users?.slice(0, 3) || [1, 2, 3]).map((item, index) => (
          <Image
            style={[
              styles.image,
              {
                zIndex: 10 - index,
                transform: [
                  {translateX: index * -(translateX || getSize.m(10))},
                ],
              },
              style,
            ]}
            key={index}
            source={
              item.user?.avatarUrl ? {uri: item.user?.avatarUrl} : Images.AVATAR
            }
          />
        ))}
      </Block>
      <Text
        style={[
          styles.numberJoined,
          styleText,
          {
            transform: [
              {
                translateX:
                  (users?.slice(0, 3) || [1, 2, 3]).length === 3
                    ? -getSize.m(10)
                    : 0,
              },
            ],
          },
        ]}>
        +{totalUser || 1} Going
      </Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: getSize.m(24),
    height: getSize.m(24),
    borderRadius: getSize.m(12),
    borderWidth: getSize.m(2),
    borderColor: '#29313E',
  },
  numberJoined: {
    color: '#3F38DD',
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(12, 0.3),
  },
});

export default memo(UserJoined);
