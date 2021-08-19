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
    ChatOverlayProvider
  } from 'stream-chat-expo';
import { LogBox, SafeAreaView, StyleSheet, View } from 'react-native';
import { appContext } from '../../context/appContext';
import { useHeaderHeight } from '@react-navigation/stack';

const ChannelScreen = ({ navigation }) => {

  const chatClient = StreamChat.getInstance('nzuqbc4twux5');

  const { bottom } = useSafeAreaInsets();

    const { channel } = useContext(appContext);
    const headerHeight = useHeaderHeight();
    const { setTopInset } = useAttachmentPickerContext();

    // useEffect(() => {
    //     setTopInset(headerHeight);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [headerHeight]);
    
    
    return (
        <SafeAreaView>
        <OverlayProvider>
        <Chat client={chatClient}>
          <Channel channel={channel} keyboardVerticalOffset={headerHeight} >
            <View style={StyleSheet.absoluteFill}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
        </OverlayProvider>
      </SafeAreaView>
    )
}

export default ChannelScreen
