import React from 'react'
import { View, Text } from 'react-native'
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


    const sort = { last_message_at: -1 };

    const filters = {
            members: { $in: ['silent-unit-4'] },
            type: 'messaging',
        };

    const { setChannel } = useContext(appContext);

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
    )
}

export default ChannelListScreen
