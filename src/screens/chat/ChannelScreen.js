import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Channel,
    ChannelList,
    Chat,
    MessageInput,
    MessageList,
    OverlayProvider,
    useAttachmentPickerContext,
  } from 'stream-chat-expo';
import { LogBox, SafeAreaView, StyleSheet, View } from 'react-native';
import { appContext } from '../../context/appContext';

const ChannelScreen = ({ navigation }) => {

    const chatClient = StreamChat.getInstance('dz5f4d5kzrue');

    const { channel } = useContext(appContext);
    const headerHeight = useHeaderHeight();
    const { setTopInset } = useAttachmentPickerContext();

    useEffect(() => {
        setTopInset(headerHeight);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [headerHeight]);


    return (
        <SafeAreaView>
        <Chat client={chatClient}>
          <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
            <View style={StyleSheet.absoluteFill}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    )
}

export default ChannelScreen
