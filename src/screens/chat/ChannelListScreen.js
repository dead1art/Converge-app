import React,{useContext, useMemo, useEffect,useState} from 'react'
import { View, Text,StyleSheet } from 'react-native'
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
import { appContext } from '../../context/appContext';
import {AuthContext} from '../../context/AuthContext';



const ChannelListScreen = ({navigation}) => {

  const chatClient = StreamChat.getInstance('gxz6ahcuv6p5');

        const { state: authState } = useContext(AuthContext);

        const userToken = authState.streamToken;
        console.log(userToken);

        const { setChannel,setClientReady,clientReady } = useContext(appContext);

        const user = { id: '3' };

        
        const sort = { last_message_at: -1 };


        const filters = {
          members: { $in: ['3'] },
          type: 'messaging',
        };

        // useEffect(() => {
        //   const setupClient = async () => {
        //     await chatClient.connectUser(user, userToken);
      
        //     setClientReady(true);
        //     console.log(clientReady);
        //   };
      
        //   setupClient();
    
        // }, []);

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
}

export default ChannelListScreen
