import {Icon} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import {getColorByName} from '@base/utils/Utils';
import {Block} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo, useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';

interface IProps {
  name: string;
  isChangeInterest: boolean;
  index: number;
  handleChangeItem: (value: string, index: number) => void;
  handleRemoveItem: (index: number) => void;
}

const ItemInterest: FC<IProps> = ({
  name,
  isChangeInterest,
  handleChangeItem,
  index,
  handleRemoveItem,
}) => {
  const [value, setValue] = useState<string>(name);

  const onChangeText = (text: string) => {
    setValue(text);
    handleChangeItem(text, index);
  };

  useEffect(() => {
    setValue(name);
  }, [name]);

  const _handleRemoveItem = () => handleRemoveItem(index);

  return (
    <Block backgroundColor={getColorByName(value)} style={styles.itemInterest}>
      <TextInput
        editable={isChangeInterest}
        placeholder="Interest"
        style={styles.inputInterest}
        value={value}
        placeholderTextColor={`${Color.BLACK}80`}
        onChangeText={onChangeText}
      />
      {isChangeInterest && (
        <TouchableOpacity onPress={_handleRemoveItem} style={styles.btnClose}>
          <Icon
            name={'close-outline'}
            color={Color.BLACK}
            size={getSize.m(12)}
          />
        </TouchableOpacity>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  itemInterest: {
    height: getSize.m(32),
    borderRadius: getSize.m(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getSize.m(12),
    marginRight: getSize.m(8),
  },
  inputInterest: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_medium_500,
    color: Color.BACKGROUND,
    minWidth: getSize.m(30),
    paddingHorizontal: getSize.m(12),
    paddingBottom: 0,
    paddingTop: 0,
    textAlign: 'center',
  },
  btnClose: {
    position: 'absolute',
    left: 0,
    width: getSize.m(16),
    borderRadius: getSize.m(8),
    height: getSize.m(16),
    backgroundColor: `${Color.WHITE}60`,
    alignItems: 'center',
    justifyContent: 'center',
    top: -getSize.m(6),
    zIndex: 10,
    shadowColor: Color.BLACK,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
});

export default memo(ItemInterest);
