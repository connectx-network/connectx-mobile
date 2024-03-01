import PenIcon from '@assets/icons/profile/PenIcon';
import {getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import {Interest} from '@model/user';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import ItemInterest from './Items/ItemInterest';
import useDelayedValueWithLayoutAnimation from '@hooks/useDelayedValueWithLayoutAnimation';
import {useToastMessage} from '@hooks/useToastMessage';
import {UpdateInfoUser} from '@services/user.service';
import {useDispatch, useSelector} from 'react-redux';
import {IRootState} from '@redux/stores';
import {UserState, actionUpdateUser} from '@redux/slices/userSlice';
import {uStateUser} from '@redux/stores/selection';

interface IProps {
  isMe: boolean;
  userInterests?: Interest[];
  description?: string | null;
  refetch: () => void;
}

const AboutTab: FC<IProps> = ({isMe, description, userInterests, refetch}) => {
  const {fullName, country, nickname, gender, address} = useSelector<
    IRootState,
    UserState
  >(uStateUser);
  const [editInterest, setChangeInterest] = useState<boolean>(false);
  const isChangeInterest = useDelayedValueWithLayoutAnimation(editInterest);
  const [listInterest, setListInterest] = useState<Interest[]>(
    userInterests || [],
  );
  const [contentAdd, setContentAdd] = useState<string>('');
  const {showWarningTop, showSuccessTop} = useToastMessage();
  const dispatch = useDispatch();

  useEffect(() => {
    !!userInterests && setListInterest(userInterests);
  }, [userInterests]);

  const handleActionInterest = async () => {
    if (!editInterest) {
      setChangeInterest(true);
    } else {
      try {
        const interests = listInterest.filter(item => item.name);
        await UpdateInfoUser({
          fullName,
          nickname: nickname || '',
          country,
          address: address || '',
          gender,
          interests,
        });
        showSuccessTop('Update interest successfully!');
        setChangeInterest(false);
        dispatch(actionUpdateUser({userInterests: interests}));
        refetch();
      } catch (error) {
        showWarningTop('Update interest failed, please try again!');
      }
    }
  };

  const handleChangeItem = useCallback((value: string, index: number) => {
    setListInterest(prev => {
      prev[index].name = value;
      return prev;
    });
  }, []);

  const handleAdd = useCallback(() => {
    if (contentAdd) {
      setListInterest(prev => [...prev, {name: contentAdd}]);
      setContentAdd('');
    }
  }, [contentAdd]);

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
              <Text color="#5669FF" style={styles.textChange}>
                CHANGE
              </Text>
            </TouchableOpacity>
          )}
        </Block>
      )}
      <Block row alignCenter space="between">
        <Text style={styles.textInterest}>Interest</Text>
        {isMe && (
          <TouchableOpacity
            onPress={handleActionInterest}
            activeOpacity={0.5}
            style={styles.btnChange}>
            <PenIcon
              color={isChangeInterest ? Color.GREEN_HOLDER : '#5669FF'}
            />
            <Text
              color={isChangeInterest ? Color.GREEN_HOLDER : '#5669FF'}
              style={styles.textChange}>
              {isChangeInterest ? 'SAVE' : 'CHANGE'}
            </Text>
          </TouchableOpacity>
        )}
      </Block>
      <Block row wrap alignCenter marginTop={12}>
        {listInterest.map((item, index) => {
          return (
            <ItemInterest
              isChangeInterest={isChangeInterest}
              key={index}
              name={item.name}
              index={index}
              handleChangeItem={handleChangeItem}
            />
          );
        })}
        {isChangeInterest && (
          <Block row alignCenter marginBottom={12}>
            <Block style={[styles.itemInterest, styles.itemInterestNoMargin]}>
              <TextInput
                placeholderTextColor={`${Color.BLACK}80`}
                style={styles.inputInterest}
                placeholder="Interest"
                autoFocus
                onChangeText={setContentAdd}
                value={contentAdd}
              />
            </Block>
            <TouchableOpacity
              onPress={handleAdd}
              style={styles.btnAddInterest}
              activeOpacity={0.5}>
              <Text style={styles.textAdd}>Add</Text>
            </TouchableOpacity>
          </Block>
        )}
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
  itemInterestNoMargin: {
    marginBottom: 0,
  },
  btnAddInterest: {
    height: getSize.m(32),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.GREEN_HOLDER,
    borderRadius: getSize.m(16),
    paddingHorizontal: getSize.s(8),
  },
  textAdd: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_medium_500,
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
    marginLeft: getSize.m(4),
  },
  textEmptyProfile: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_regular_400,
    flex: 1,
    marginRight: getSize.m(8),
  },
  textItemInterest: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_medium_500,
    color: Color.BACKGROUND,
  },
  inputInterest: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_medium_500,
    color: Color.BACKGROUND,
    minWidth: getSize.m(30),
  },
});

export default memo(AboutTab);
