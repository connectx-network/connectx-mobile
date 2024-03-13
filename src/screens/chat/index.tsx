import {IconApp} from '@assets/icons';
import SearchIcon from '@assets/icons/home/SearchIcon';
import {HEIGHT_SCREEN, getSize} from '@base/common/responsive';
import {hapticFeedback, keyExtractor} from '@base/utils/Utils';
import {Block, TabBar, Text} from '@components';
import {openDrawer} from '@navigation/navigationService';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemMessage from './Items/ItemMessage';

const ChatScreen = () => {
  const styles = useStyle(getStyles);
  const customActionRight = useCallback(() => {
    return (
      <Block style={styles.boxRightAction}>
        {/* <TouchableOpacity style={styles.btnMessage} activeOpacity={0.5}>
          <MessagePlusIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContact} activeOpacity={0.5}>
          <ContactIcon />
        </TouchableOpacity> */}
      </Block>
    );
  }, []);

  const emptyMessage = useMemo(
    () => <Text style={styles.textEmpty}>There are no messages yet</Text>,
    [],
  );

  const renderItem = useCallback(() => {
    return <ItemMessage />;
  }, []);

  const handleDrawer = useCallback(() => {
    openDrawer();
    hapticFeedback();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TabBar
        title="Chat"
        handleLeftIcon={handleDrawer}
        leftIcon={
          <IconApp name={'menu'} {...styles.iconDrawer} size={getSize.m(18)} />
        }
        customActionRight={customActionRight}
      />
      <Block style={styles.search}>
        <SearchIcon color={Color.WHITE} />
        <TextInput
          placeholderTextColor={`${Color.WHITE}40`}
          placeholder="Search..."
          style={styles.searchInput}
        />
      </Block>
      <FlatList
        data={Array.from(Array(0).keys())}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={emptyMessage}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </SafeAreaView>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    boxRightAction: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    btnMessage: {
      paddingHorizontal: getSize.m(4),
      paddingVertical: getSize.m(2),
      marginRight: getSize.m(6),
    },
    btnContact: {
      paddingHorizontal: getSize.m(4),
      paddingVertical: getSize.m(2),
    },
    search: {
      height: getSize.m(40),
      borderRadius: getSize.m(8),
      backgroundColor: '#1D1D32',
      marginHorizontal: getSize.s(20),
      marginTop: getSize.v(8),
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: getSize.v(12),
      paddingHorizontal: getSize.m(12),
    },
    searchInput: {
      flex: 1,
      marginLeft: getSize.m(12),
      fontSize: getSize.m(14, 0.3),
      fontFamily: Font.font_medium_500,
    },
    textEmpty: {
      color: Color.GRAY,
      fontSize: getSize.m(18, 0.3),
      textAlign: 'center',
      marginTop: HEIGHT_SCREEN * 0.3,
    },
    contentContainerStyle: {
      paddingTop: getSize.v(12),
    },
    iconDrawer: {
      color: colors.mainForeground,
    },
  });

export default ChatScreen;
