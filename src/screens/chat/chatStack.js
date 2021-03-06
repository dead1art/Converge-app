import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { appContext } from '../../context/appContext';
import ChannelListScreen from './ChannelListScreen';
import ChannelScreen from './ChannelScreen';
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
import { StreamChat } from 'stream-chat';

const chat = createStackNavigator();

const chatStack = ({navigation}) => {

    const { state: authState } = useContext(AuthContext);

    const user_firstName = authState.user.first_name
    const user_lastName = authState.user.last_name
    
    const user_id = authState.user.id
    const user_image = authState.user.image
    const user_name = user_firstName + user_lastName
  

        const chatClient = StreamChat.getInstance('nzuqbc4twux5');
        const userToken = authState.streamToken;
        console.log(userToken);
    
    const user = { id: `${user_id}`, name: `${user_name}`, image: `${user_image}` };

    const { bottom } = useSafeAreaInsets();

    const [channel, setChannel] = useState();
    const [clientReady, setClientReady] = useState(false);


    useEffect(() => {
      const setupClient = async () => {
        await chatClient.connectUser(user, userToken);
  
        setClientReady(true);
      };
  
      setupClient();

      return async()=>{
        await chatClient.disconnectUser();
      }
    }, []);

    return (
        <appContext.Provider value={{channel,setChannel,setClientReady,clientReady}}>
              <chat.Navigator initialRouteName='ChannelList'  screenOptions={{
                headerTitleStyle: { alignSelf: 'center', fontWeight: 'bold' },
              }}>  
                <chat.Screen 
                component={ChannelScreen}
                name='Channel'
                options={() => ({
                  headerBackTitle: 'Back',
                  headerRight: () => <></>,
                  headerTitle: channel?.data?.name,
                })}/>
                <chat.Screen 
                  component={ChannelListScreen} name='ChannelList' options={{ headerTitle: 'Events' }}
                />
              </chat.Navigator>
              </appContext.Provider>
            )
}

export default chatStack
