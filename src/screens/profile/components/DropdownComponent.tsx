import {HEIGHT_SCREEN, getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {FC, memo, useCallback} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

export interface ItemDropbox<T> {
  label: string;
  value: T;
}

interface IProps {
  placeholder: string;
  onChange: (item: ItemDropbox<any>) => void;
  data: ItemDropbox<any>[];
  value: any;
  textSearch?: string;
  onChangeText?: (text: string) => void;
  stylesContainer?: StyleProp<ViewStyle>;
}

const DropdownComponent: FC<IProps> = props => {
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const renderRightIcon = useCallback((open?: boolean) => {
    return <View />;
  }, []);

  return (
    <Block style={styles.container}>
      <Block flex>
        <Text style={styles.textGender}>Gender</Text>
        <Dropdown
          style={[styles.dropdown, props.stylesContainer]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          renderRightIcon={renderRightIcon}
          maxHeight={HEIGHT_SCREEN * 0.4}
          labelField={'label'}
          valueField={'value'}
          renderItem={renderItem}
          containerStyle={styles.containerStyle}
          activeColor={`${Color.BLACK}20`}
          itemContainerStyle={styles.itemContainerStyle}
          {...props}
        />
      </Block>
      <Icon
        name={'caret-down-outline'}
        color={Color.WHITE}
        size={getSize.m(14)}
      />
    </Block>
  );
};

export default memo(DropdownComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: getSize.m(54),
    backgroundColor: `${Color.WHITE}10`,
    paddingVertical: getSize.m(8),
    borderRadius: getSize.m(12),
    borderColor: '#757575',
    borderWidth: getSize.m(1),
    paddingHorizontal: getSize.s(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textGender: {
    fontSize: getSize.m(11, 0.3),
  },
  dropdown: {flex: 1, justifyContent: 'flex-start'},
  label: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
    color: Color.BLACK,
    marginBottom: getSize.m(5),
  },
  icon: {
    marginRight: 5,
  },
  itemContainerStyle: {
    marginBottom: getSize.m(8),
    paddingHorizontal: getSize.m(12),
    borderRadius: getSize.m(8),
  },
  item: {
    borderRadius: getSize.m(6),
    height: getSize.m(40),
    justifyContent: 'center',
  },
  textItem: {
    color: Color.WHITE,
    fontFamily: Font.font_regular_400,
    fontSize: getSize.m(15, 0.3),
  },
  placeholderStyle: {
    fontSize: getSize.m(13, 0.3),
    color: `${Color.BLACK}60`,
    fontFamily: Font.font_regular_400,
  },
  selectedTextStyle: {
    fontSize: getSize.m(13, 0.3),
    color: Color.WHITE,
    fontFamily: Font.font_regular_400,
  },
  containerStyle: {
    backgroundColor: Color.BACKGROUND,
    padding: getSize.m(8),
    borderRadius: getSize.m(8),
    marginTop: getSize.m(12),
    borderColor: '#75757580',
    borderWidth: getSize.m(1),
  },
  error: {
    minHeight: getSize.m(20),
  },
  textError: {
    color: Color.RED,
    fontFamily: Font.font_regular_400,
    fontSize: getSize.m(10, 0.3),
    marginTop: getSize.m(5),
  },
});
