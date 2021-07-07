import React, { useState, useCallback, useEffect } from 'react'
import {Text} from 'react-native'
import { Channel as ChannelType, StreamChat } from 'stream-chat'; 
import { ChannelList, Chat, MessageType, OverlayProvider } from 'stream-chat-expo';


function room({navigation}) {

  const client = StreamChat.getInstance('92wpnfcj44nq');

  
  const [channel, setChannel] = useState();
  const [clientReady, setClientReady] = useState(false);
  const [thread, setThread] = useState();

  useEffect(() => {   
     const setupClient = async () => {      
       try {        
         await client.connectUser(         
            {             
              id: 'jlahey',             
              name: 'Jim Lahey',            
               image: 'https://i.imgur.com/fR9Jz14.png',           
              },           
              'user_token',       
               );         
               setClientReady(true);     
               }
                catch (e) 
                {       
                   console.log(e);     
                   }    
                };

    setupClient();  
  }, []);

  const onBackPress = () => {   
     if (thread) {      
       setThread(undefined);    
      } else if (channel)
       {      
        setChannel(undefined);   
       }  
      };

      if (!clientReady) return null;

      return (    
      <OverlayProvider topInset={60}>      
      <TouchableOpacity onPress={onBackPress} disabled={!channel}>       
       <View style={{ height: 60, paddingLeft: 16, paddingTop: 40 }}>       
          {channel && <Text>Back</Text>}    
              </View>     
               </TouchableOpacity>      
               <View style={{ flex: 1 }}>     
                  <Chat client={client}>        
                    {channel ? (          
                        <Channel channel={channel} keyboardVerticalOffset={60} thread={thread}>   
                                   {thread ? (         
                                            <Thread />     
                                                     ) : (         
                                                              <>          
                                                                      <MessageList onThreadSelect={setThread} />     
                                                                                   <MessageInput />   
                                                                                                </>      
                                                                                                        )} 
                         </Channel>          ) : (          
                             <ChannelList onSelect={setChannel} />       
                                )}      
                    </Chat>      
                   </View>    
                 </OverlayProvider> 
                 );
              };

export default room
