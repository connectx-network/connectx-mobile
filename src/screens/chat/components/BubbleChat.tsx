import {getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import ContentMessage from './ContentMessage';

interface IProps {
  _id: string;
  text: string;
  user: any;
  idMe: number;
  createdAt: string;
  name?: string;
  nextMessage: {
    user: {
      _id: number;
    };
  };
  isHidden?: boolean;
  handleReply: () => void;
  replyData?: any;
}

function BubbleChat({
  text,
  idMe,
  user,
  createdAt,
  name,
  nextMessage,
  isHidden,
  handleReply,
  replyData,
}: IProps) {
  return (
    <Block
    // marginBottom={
    //   totalDislike || totalLike
    //     ? nextMessage?.user?._id !== user?._id && name && idMe !== user?._id
    //       ? 2
    //       : 20
    //     : 2
    // }
    >
      {/* <Menu
        visible={showOption}
        anchor={ */}
      <ContentMessage
        createdAt={createdAt}
        text={text}
        idMe={idMe}
        user={user}
        isHidden={isHidden}
        handleReply={handleReply}
        replyData={replyData}
      />
      {/* }
        onRequestClose={handleCloseOption}
        style={StyleSheet.flatten([
          styles.menuOption,
          {
            marginTop: showMessage ? -getSize.m(36) : heightMessage * 0.7,
            marginLeft: showMessage ? 0 : getSize.m(6),
          },
        ])}
        // children2={<Text>sfdsff222</Text>}
      >
        <ReactChat
          handleReply={handleReplyAction}
          handleDisLike={handleDisLike}
          handleLike={handleLike}
        />
      </Menu> */}

      {nextMessage?.user?._id !== user?._id && name && idMe !== user?._id && (
        <Block marginVertical={8} marginTop={8}>
          <Text numberOfLines={1} style={styles.textName}>
            {name}
          </Text>
        </Block>
      )}
    </Block>
  );
}

const styles = StyleSheet.create({
  textName: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
    color: Color.WHITE,
    opacity: 0.5,
  },
  menuOption: {
    height: getSize.m(40),
    borderRadius: getSize.m(20),
    shadowColor: Color.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    elevation: 3,
    shadowRadius: getSize.m(5),
    backgroundColor: Color.TRANSPARENT,
  },
});

export default memo(BubbleChat);
