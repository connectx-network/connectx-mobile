import {IconApp} from '@assets/icons';
import ContactIcon from '@assets/icons/chat/ContactIcon';
import MessagePlusIcon from '@assets/icons/chat/MessagePlusIcon';
import SearchIcon from '@assets/icons/home/SearchIcon';
import {HEIGHT_SCREEN, getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {Block, TabBar, Text} from '@components';
import {openDrawer} from '@navigation/navigationService';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {useCallback} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChatScreen = () => {
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

  return (
    <SafeAreaView style={Styles.container}>
      <TabBar
        title="Chat"
        handleLeftIcon={openDrawer}
        leftIcon={
          <IconApp name={'menu'} color={Color.WHITE} size={getSize.m(18)} />
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
      <Text style={styles.textEmpty}>There are no messages yet</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default ChatScreen;
