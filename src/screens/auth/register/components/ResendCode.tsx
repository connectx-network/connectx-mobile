import {getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import Font from '@theme/Font';
import {FC, Fragment, memo, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {
  handleSendCode: () => void;
}

const ResendCode: FC<IProps> = ({handleSendCode}) => {
  const [time, setTime] = useState<number>(30);

  useEffect(() => {
    setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
  }, [time]);

  const _handleSendCode = () => {
    setTime(30);
    handleSendCode();
  };

  return (
    <Block alignCenter row justifyCenter>
      {time === 0 ? (
        <TouchableOpacity activeOpacity={0.5} onPress={_handleSendCode}>
          <Text style={styles.textBtnResend}>Re-send code</Text>
        </TouchableOpacity>
      ) : (
        <Fragment>
          <Text style={styles.textReSend}>Re-send code in</Text>
          <Text style={styles.textTime}>0:{time < 10 ? `0${time}` : time}</Text>
        </Fragment>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  textReSend: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_thin_100,
    marginRight: getSize.m(6),
  },
  textTime: {
    color: '#5669FF',
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_extra_light_300,
  },
  textBtnResend: {
    color: '#5669FF',
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
  },
});

export default memo(ResendCode);
