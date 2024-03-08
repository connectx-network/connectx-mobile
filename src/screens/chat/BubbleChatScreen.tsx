import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {TabBar} from '@components';
import {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ReplyMessage, {HEIGHT_REPLY} from './components/ReplyMessage';
import Composer from './components/Composer';
import SendIcon from '@assets/icons/chat/SendIcon';
import BubbleChat from './components/BubbleChat';

const MESSAGES = [
  {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 2,
    text: 'Hello ',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'pham duc',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 3,
    text: 'Hello hahaha',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 4,
    text: 'Enter passphrase for key',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 5,
    text: 'Enter passphrase for key',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 6,
    text: 'Enter passphrase for key',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 7,
    text: 'Enter passphrase for key',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 8,
    text: 'Enter passphrase for key',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
];

const BubbleChatScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages(MESSAGES);
  }, []);

  const renderReply = useCallback(() => {
    return <ReplyMessage replyMessage={null} />;
  }, []);

  const renderInputToolbar = useCallback(
    props => {
      return (
        <InputToolbar
          {...props}
          containerStyle={StyleSheet.flatten([
            styles.inputToolbar,
            {
              paddingBottom: bottom + getSize.m(10),
            },
          ])}
          placeholder={'Aa'}
          primaryStyle={styles.primaryStyle}
          renderReply={renderReply}
        />
      );
    },
    [bottom, renderReply],
  );

  const onSend = useCallback(() => {}, []);

  const renderComposer = useCallback(props => {
    return <Composer {...props} />;
  }, []);

  const renderSend = useCallback(props => {
    return (
      <Send
        sendButtonProps={{
          activeOpacity: 0.5,
          // disabled: spam,
        }}
        {...props}
        containerStyle={styles.btnSend}>
        <SendIcon />
      </Send>
    );
  }, []);

  const renderBubble = useCallback(props => {
    const _handleReply = () => {};
    return (
      <BubbleChat
        {...props.currentMessage}
        idMe={props.user._id}
        nextMessage={props.nextMessage}
        handleLikeMessage={() => {}}
        handleReply={_handleReply}
      />
    );
  }, []);

  return (
    <SafeAreaView style={Styles.container} edges={['top']}>
      <TabBar title="Athalia Putri" styleContainer={styles.tabBar} />
      <GiftedChat
        messages={messages as any[]}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        keyboardShouldPersistTaps={'never'}
        renderUsernameOnMessage={true}
        // renderActions={renderActions}
        renderInputToolbar={renderInputToolbar}
        minComposerHeight={false ? -HEIGHT_REPLY : 0}
        renderComposer={renderComposer}
        renderSend={renderSend}
        alwaysShowSend
        messagesContainerStyle={{
          paddingBottom: bottom,
        }}
        renderBubble={renderBubble}
        // renderAvatar={renderAvatar}
        // renderDay={renderDay}
        // renderFooter={renderFooter}
        // listViewProps={{
        //   onScroll: onScrollMessage,
        //   scrollEventThrottle: 300,
        // }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderBottomColor: '#D9D9D940',
    borderBottomWidth: getSize.m(1),
  },
  inputToolbar: {
    width: WIDTH_SCREEN,
    paddingHorizontal: getSize.s(12),
    borderTopWidth: 0,
  },
  primaryStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    ...Styles.centerNoFlex,
    marginTop: getSize.m(5),
    width: getSize.m(24),
    height: getSize.m(24),
    marginRight: getSize.m(12),
  },
  btnSend: {
    height: getSize.m(24),
    marginTop: getSize.m(10),
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: getSize.m(6),
    paddingRight: getSize.m(4),
  },
});

export default BubbleChatScreen;
