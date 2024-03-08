import {Icon} from '@assets/icons';
import PenIcon from '@assets/icons/profile/PenIcon';
import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, Text} from '@components';
import useDelayedValueWithLayoutAnimation from '@hooks/useDelayedValueWithLayoutAnimation';
import {useToastMessage} from '@hooks/useToastMessage';
import {Interest} from '@model/user';
import {UserState, actionUpdateUser} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import {UpdateInfoUser} from '@services/user.service';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, Fragment, memo, useCallback, useEffect, useState} from 'react';
import {
  Linking,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ItemInterest from './Items/ItemInterest';
import ContentAbout from './components/ContentAbout';
import {IS_IOS} from '@base/common/constants';

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
  const [checkbox2, setCheckbox2] = useState<boolean>(false);
  const {showWarningTop, showSuccessTop} = useToastMessage();
  const dispatch = useDispatch();

  useEffect(() => {
    !!userInterests && setListInterest(userInterests);
  }, [userInterests]);

  const handleActionInterest = useCallback(() => {
    setChangeInterest(prev => !prev);
    userInterests && setListInterest(userInterests);
  }, [userInterests]);

  const handleChangeItem = useCallback((value: string, index: number) => {
    setListInterest(prev => {
      prev[index].name = value;
      return prev;
    });
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    setListInterest(prev => {
      const _prev = JSON.parse(JSON.stringify(prev));
      _prev.splice(index, 1);
      return _prev;
    });
  }, []);

  const handleAdd = useCallback(() => {
    if (contentAdd) {
      setListInterest(prev => [...prev, {name: contentAdd}]);
      setContentAdd('');
    }
  }, [contentAdd]);

  const handleCheckBox2 = useCallback(() => setCheckbox2(prev => !prev), []);
  const handleTerm = useCallback(
    () => Linking.openURL('https://www.connectx.network/privacy/'),
    [],
  );

  const handleSaveInterest = async () => {
    if (!checkbox2) {
      return showWarningTop('Please agree ConnectX’s terms & conditions');
    }
    try {
      const interests = listInterest.filter(item => item.name);
      await UpdateInfoUser({
        fullName,
        nickname: nickname || '',
        country,
        address: address || '',
        gender,
        interests,
        description: description || '',
      });
      showSuccessTop('Update interest successfully!');
      setChangeInterest(false);
      dispatch(actionUpdateUser({userInterests: interests}));
      refetch();
    } catch (error) {
      showWarningTop('Update interest failed, please try again!');
    }
  };

  return (
    <Block style={styles.container}>
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <ContentAbout refetch={refetch} description={description} isMe={isMe} />
        <Block row alignCenter space="between" marginTop={12}>
          {(listInterest.length !== 0 || isMe) && (
            <Text style={styles.textInterest}>Interest</Text>
          )}
          {isMe && (
            <TouchableOpacity
              onPress={handleActionInterest}
              activeOpacity={0.5}
              style={styles.btnChange}>
              <PenIcon
                color={isChangeInterest ? Color.RED_HOLDER : '#5669FF'}
              />
              <Text
                color={isChangeInterest ? Color.RED_HOLDER : '#5669FF'}
                style={styles.textChange}>
                {isChangeInterest ? 'Cancel' : 'CHANGE'}
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
                handleRemoveItem={handleRemoveItem}
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
        {isChangeInterest && (
          <Fragment>
            <Block style={styles.term} marginTop={12}>
              <TouchableOpacity onPress={handleCheckBox2} activeOpacity={0.5}>
                {!checkbox2 ? (
                  <Block style={styles.btnCheckbox} />
                ) : (
                  <Icon
                    name={'checkbox'}
                    color={'#BF56FF'}
                    size={getSize.m(22)}
                  />
                )}
              </TouchableOpacity>
              <Text onPress={handleTerm} style={styles.textTerm}>
                Agree ConnectX’s terms & conditions
              </Text>
            </Block>
            <ButtonGradient
              onPress={handleSaveInterest}
              style={styles.btnSave}
              styleContainer={styles.btnSaveContainer}>
              <Text style={styles.textSave}>SAVE</Text>
            </ButtonGradient>
          </Fragment>
        )}
      </KeyboardAvoidingView>
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
    fontFamily: Font.font_extra_light_300,
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
    paddingBottom: 0,
    paddingTop: 0,
    // textAlign: 'center',
  },
  boxInputAbout: {
    backgroundColor: '#29313E',
    marginVertical: getSize.v(12),
    paddingHorizontal: getSize.s(12),
    borderRadius: getSize.m(12),
    paddingVertical: getSize.m(8),
  },
  inputAbout: {
    textAlignVertical: 'top',
    color: Color.WHITE,
    minHeight: getSize.v(100),
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_regular_400,
  },
  term: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getSize.v(8),
  },
  btnCheckbox: {
    width: getSize.m(22),
    height: getSize.m(22),
    borderRadius: getSize.m(4),
    borderColor: Color.WHITE,
    borderWidth: getSize.m(2),
  },
  textTerm: {
    marginLeft: getSize.m(8),
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(12),
    textDecorationLine: 'underline',
  },
  btnSaveContainer: {
    marginBottom: getSize.v(30),
  },
  btnSave: {
    height: getSize.m(48),
  },
  textSave: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
    color: Color.BACKGROUND,
  },
});

export default memo(AboutTab);
