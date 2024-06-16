import {Icon} from '@assets/icons';
import PenIcon from '@assets/icons/profile/PenIcon';
import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, Text} from '@components';
import useDelayedValueWithLayoutAnimation from '@hooks/useDelayedValueWithLayoutAnimation';
import {useToastMessage} from '@hooks/useToastMessage';
import {navigate} from '@navigation/navigationService';
import {LOGIN_SCREEN} from '@navigation/routes';
import {UserState, actionUpdateUser} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import {UpdateInfoUser} from '@services/user.service';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {TColors, useTheme} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {useFormik} from 'formik';
import {FC, Fragment, memo, useCallback, useEffect, useState} from 'react';
import {
  ColorSchemeName,
  Linking,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

interface IProps {
  isMe: boolean;
  description?: string | null;
  refetch: () => void;
}

const initialValues = {
  content: '',
  isAgree: false,
};

const validationSchema = Yup.object({
  content: Yup.string().required('Biography is required'),
  isAgree: Yup.boolean().isTrue('is true'),
});

const ContentAbout: FC<IProps> = ({isMe, description, refetch}) => {
  const {colors} = useTheme();
  const styles = useStyle(getStyles);
  const [editAbout, setEditAbout] = useState<boolean>(false);
  const isEditAbout = useDelayedValueWithLayoutAnimation(editAbout);
  const {
    fullName,
    country,
    nickname,
    gender,
    address,
    userInterests,
    isLogged,
  } = useSelector<IRootState, UserState>(uStateUser);
  const {showSuccessTop, showWarningTop} = useToastMessage();
  const dispatch = useDispatch();

  const handleSave = async (values: typeof initialValues) => {
    try {
      await UpdateInfoUser({
        fullName,
        nickname: nickname || '',
        country,
        address: address || '',
        gender,
        interests: userInterests,
        description: values.content,
      });
      showSuccessTop('Update description successfully!');
      setEditAbout(false);
      dispatch(actionUpdateUser({description: values.content}));
      refetch();
    } catch (error) {
      showWarningTop('Update description failed, please try again!');
    }
  };

  const {
    values,
    handleChange,
    submitForm,
    errors,
    setFieldValue,
    setFieldError,
  } = useFormik<typeof initialValues>({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: handleSave,
  });

  useEffect(() => {
    description && setFieldValue('content', description);
  }, [description]);

  const handleEditAbout = useCallback(() => {
    if (!isLogged) {
      return navigate(LOGIN_SCREEN);
    }
    setEditAbout(prev => !prev);
  }, []);

  const handleCheckBox = useCallback(() => {
    setFieldValue('isAgree', !values.isAgree);
    setFieldError('isAgree', '');
  }, [values.isAgree, setFieldValue, setFieldError]);

  const handleTerm = useCallback(
    () => Linking.openURL('https://www.connectx.network/privacy/'),
    [],
  );

  const handleChangeValue = (field: string) => (value: string) => {
    handleChange(field)(value);
    setFieldError('content', '');
  };

  return (
    <Fragment>
      {description && !editAbout ? (
        <Fragment>
          {isMe && (
            <Block row space="between">
              <Text style={styles.textInterest}>Update biography</Text>
              <TouchableOpacity
                onPress={handleEditAbout}
                activeOpacity={0.5}
                style={styles.btnChange}>
                <PenIcon color={isEditAbout ? Color.GREEN_HOLDER : '#5669FF'} />
                <Text
                  color={isEditAbout ? Color.GREEN_HOLDER : '#5669FF'}
                  style={styles.textChange}>
                  {isEditAbout ? 'Cancel' : 'CHANGE'}
                </Text>
              </TouchableOpacity>
            </Block>
          )}
          <Text style={styles.textAbout}>{description}</Text>
        </Fragment>
      ) : (
        <Block row alignStart space="between">
          <Text style={styles.textEmptyProfile}>
            {isMe ? 'Update biography' : 'No biography yet'}
          </Text>
          {isMe && (
            <TouchableOpacity
              onPress={handleEditAbout}
              activeOpacity={0.5}
              style={styles.btnChange}>
              <PenIcon color={isEditAbout ? Color.RED_HOLDER : '#5669FF'} />
              <Text
                color={isEditAbout ? Color.RED_HOLDER : '#5669FF'}
                style={styles.textChange}>
                {isEditAbout ? 'Cancel' : 'CHANGE'}
              </Text>
            </TouchableOpacity>
          )}
        </Block>
      )}
      {isEditAbout && (
        <Fragment>
          <Block style={styles.boxInputAbout}>
            <TextInput
              multiline
              style={styles.inputAbout}
              placeholder="Enter biography...."
              placeholderTextColor={`${colors.mainForeground}40`}
              value={values.content}
              onChangeText={handleChangeValue('content')}
              autoFocus
            />
          </Block>
          {!!errors.content && (
            <Text style={styles.textError}>{errors.content}</Text>
          )}
          <Block style={styles.term}>
            <TouchableOpacity onPress={handleCheckBox} activeOpacity={0.5}>
              {!values.isAgree ? (
                <Block
                  style={styles.btnCheckbox}
                  borderColor={
                    errors.isAgree ? Color.RED_HOLDER : colors.mainForeground
                  }
                />
              ) : (
                <Icon
                  name={'checkbox'}
                  color={'#5669FF'}
                  size={getSize.m(20)}
                />
              )}
            </TouchableOpacity>
            <Text
              onPress={handleTerm}
              color={errors.isAgree ? Color.RED_HOLDER : colors.mainForeground}
              style={styles.textTerm}>
              Agree ConnectX’s terms & conditions
            </Text>
          </Block>
          <ButtonGradient
            onPress={submitForm}
            style={styles.btnSave}
            styleContainer={styles.btnSaveContainer}>
            <Text style={styles.textSave}>SAVE</Text>
          </ButtonGradient>
        </Fragment>
      )}
    </Fragment>
  );
};

const getStyles = (colors: TColors, colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    textAbout: {
      fontSize: getSize.m(16, 0.3),
      fontFamily: Font.font_extra_light_300,
      lineHeight: getSize.m(26),
      marginBottom: getSize.m(24),
      color: colors.mainForeground,
    },
    textInterest: {
      fontSize: getSize.m(18, 0.3),
      fontFamily: Font.font_medium_500,
      color: colors.mainForeground,
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
      backgroundColor: `${colors.mainForeground}10`,
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
      color: colors.mainForeground,
    },
    boxInputAbout: {
      backgroundColor: colors.input,
      marginTop: getSize.v(12),
      marginBottom: getSize.v(6),
      paddingHorizontal: getSize.s(12),
      borderRadius: getSize.m(12),
      paddingVertical: getSize.m(8),
      borderColor: `${colors.mainForeground}60`,
      borderWidth: colorScheme === 'light' ? getSize.m(1) : 0,
    },
    inputAbout: {
      textAlignVertical: 'top',
      color: colors.mainForeground,
      minHeight: getSize.v(100),
      fontSize: getSize.m(13, 0.3),
      fontFamily: Font.font_regular_400,
    },
    term: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: getSize.v(6),
      marginTop: getSize.m(12),
    },
    btnCheckbox: {
      width: getSize.m(20),
      height: getSize.m(20),
      borderRadius: getSize.m(4),
      borderWidth: getSize.m(2),
    },
    textTerm: {
      marginLeft: getSize.m(8),
      fontFamily: Font.font_medium_500,
      fontSize: getSize.m(11, 0.3),
      textDecorationLine: 'underline',
    },
    textSave: {
      fontSize: getSize.m(15, 0.3),
      fontFamily: Font.font_medium_500,
      color: Color.BACKGROUND,
    },
    btnSaveContainer: {
      marginBottom: getSize.v(30),
    },
    btnSave: {
      height: getSize.m(48),
    },
    textError: {
      color: Color.RED_HOLDER,
      fontSize: getSize.m(13, 0.3),
      fontFamily: Font.font_regular_400,
    },
  });

export default memo(ContentAbout);
