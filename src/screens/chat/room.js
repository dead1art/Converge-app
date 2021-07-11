import React, { useContext, useEffect, useMemo, useState } from 'react';
import { LogBox, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  useAttachmentPickerContext,
} from 'stream-chat-expo';
import {AuthContext} from '../../context/AuthContext';

LogBox.ignoreAllLogs(true);

// const { state: authState } = useContext(AuthContext);
const chatClient = StreamChat.getInstance('gxz6ahcuv6p5');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSJ9.0IValLW5VmiBV8waUOTkRy8BNWrsEtseoIVKypqM3Jc';
const user = { id: '1' };

const filters = {
  members: { $in: ['1'] },
  type: 'messaging',
};

const sort = { last_message_at: -1 };

const ChannelListScreen = ({ navigation }) => {
   useEffect(() => {
      const setupClient = async () => {
        await chatClient.connectUser(user, userToken);
  
        setClientReady(true);
      };
  
      setupClient();
    }, []);
  
  const { setChannel } = useContext(AppContext);

  const memoizedFilters = useMemo(() => filters, []);

  return (
    <Chat client={chatClient}>
      <View style={StyleSheet.absoluteFill}>
        <ChannelList
          filters={memoizedFilters}
          onSelect={(channel) => {
            setChannel(channel);
            navigation.navigate('Channel');
          }}
          sort={sort}
        />
      </View>
    </Chat>
  );
};

const ChannelScreen = ({ navigation }) => {
  const { channel } = useContext(AppContext);
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
  );
};

const log = createStackNavigator();

const AppContext = React.createContext();

const room = () => {
  const { bottom } = useSafeAreaInsets();

  const [channel, setChannel] = useState();
  const [clientReady, setClientReady] = useState(false);

  return (
      <AppContext.Provider value={{ channel, setChannel }}>
            <log.Navigator
              initialRouteName='ChannelList'
              screenOptions={{
                headerTitleStyle: { alignSelf: 'center', fontWeight: 'bold' },
              }}
            >
              <log.Screen
                component={ChannelScreen}
                name='Channel'
                options={() => ({
                  headerBackTitle: 'Back',
                  headerRight: () => <></>,
                  headerTitle: channel?.data?.name,
                })}
              />
              <log.Screen component={ChannelListScreen} name='ChannelList' options={{ headerTitle: 'Channel List' }} />
            </log.Navigator>
      </AppContext.Provider>
  );
};

export default room
