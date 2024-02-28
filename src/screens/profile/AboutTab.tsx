import PenIcon from '@assets/icons/profile/PenIcon';
import {getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {
  isMe: boolean;
  userInterests?: any[];
  description?: string | null;
}

const interests = [
  'Games Online',
  'Concert',
  'Music',
  'Art',
  'Movie',
  'Others',
];

const AboutTab: FC<IProps> = ({isMe, description, userInterests}) => {
  console.log('userInterests>>', userInterests);

  return (
    <Block style={styles.container}>
      {description ? (
        <Text style={styles.textAbout}>{description}</Text>
      ) : (
        <Block row alignStart space="between" marginBottom={30}>
          <Text style={styles.textEmptyProfile}>
            {isMe ? 'Update biography about you' : 'No biography yet'}
          </Text>
          {isMe && (
            <TouchableOpacity activeOpacity={0.5} style={styles.btnChange}>
              <PenIcon />
              <Text style={styles.textChange}>CHANGE</Text>
            </TouchableOpacity>
          )}
        </Block>
      )}
      <Block row alignCenter space="between">
        <Text style={styles.textInterest}>Interest</Text>
        {isMe && (
          <TouchableOpacity activeOpacity={0.5} style={styles.btnChange}>
            <PenIcon />
            <Text style={styles.textChange}>CHANGE</Text>
          </TouchableOpacity>
        )}
      </Block>
      <Block row wrap alignCenter marginTop={12}>
        {interests.map((item, index) => {
          return (
            <Block key={index} style={styles.itemInterest}>
              <Text>{item}</Text>
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getSize.s(20),
    marginTop: getSize.m(20),
  },
  textAbout: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_regular_400,
    lineHeight: getSize.m(26),
    marginBottom: getSize.m(24),
  },
  textInterest: {
    fontSize: getSize.m(18, 0.3),
    fontFamily: Font.font_medium_500,
  },
  itemInterest: {
    height: getSize.m(32),
    borderRadius: getSize.m(16),
    paddingHorizontal: getSize.m(12),
    backgroundColor: '#6B7AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getSize.m(12),
    marginRight: getSize.m(8),
  },
  btnChange: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF10',
    height: getSize.m(28),
    paddingHorizontal: getSize.m(12),
    borderRadius: getSize.m(14),
  },
  textChange: {
    fontSize: getSize.m(10, 0.3),
    fontFamily: Font.font_medium_500,
    color: '#5669FF',
    marginLeft: getSize.m(4),
  },
  textEmptyProfile: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_regular_400,
    flex: 1,
    marginRight: getSize.m(8),
  },
});

export default memo(AboutTab);
