import {Icon} from '@assets/icons';
import LocationIcon from '@assets/icons/detailEvent/LocationIcon';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block} from '@components';
import useDelayedValueWithLayoutAnimation from '@hooks/useDelayedValueWithLayoutAnimation';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, MutableRefObject} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

interface IProps extends TextInputProps {
  top: number;
  searchInputRef: MutableRefObject<TextInput | any>;
  handleClearText?: () => void;
  showSearch: boolean;
  handleBack: () => void;
}

export const HEIGHT_SEARCH_MAP = getSize.m(52);

const SearchBar: FC<IProps> = ({
  top,
  searchInputRef,
  handleClearText,
  showSearch,
  handleBack,
  ...props
}) => {
  const delayedShowSearch = useDelayedValueWithLayoutAnimation(showSearch);

  return (
    <Block style={[styles.container, {paddingTop: top}]}>
      <Block style={styles.search}>
        {delayedShowSearch ? (
          <TouchableOpacity activeOpacity={0.5} onPress={handleBack}>
            <Icon
              name={'chevron-back-outline'}
              size={getSize.m(24)}
              color={Color.BACKGROUND}
            />
          </TouchableOpacity>
        ) : (
          <LocationIcon color={'#5669FF'} />
        )}

        <TextInput
          placeholderTextColor={'#61667980'}
          style={styles.textSearch}
          placeholder="Find event"
          ref={searchInputRef}
          {...props}
        />
        {props.value && (
          <TouchableOpacity onPress={handleClearText} activeOpacity={0.5}>
            <Icon
              name={'close-circle'}
              size={getSize.m(22)}
              color={`${Color.BLACK}40`}
            />
          </TouchableOpacity>
        )}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    width: WIDTH_SCREEN,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT_SEARCH_MAP,
    backgroundColor: Color.WHITE,
    marginHorizontal: getSize.s(20),
    borderRadius: getSize.m(12),
    paddingHorizontal: getSize.s(12),
    shadowColor: Color.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: getSize.m(4),
    elevation: 4,
  },
  textSearch: {
    flex: 1,
    fontSize: getSize.m(14, 0.3),
    fontFamily: Font.font_regular_400,
    color: Color.BACKGROUND,
    marginLeft: getSize.m(8),
    marginRight: getSize.m(6),
  },
});

export default SearchBar;
