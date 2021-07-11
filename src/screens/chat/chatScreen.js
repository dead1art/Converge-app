import React, { useContext,useState, useCallback, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import data from "../../../assets/chatroom"
import { FocusAwareStatusBar } from '../../components/statusbar'
import { MaterialIcons } from "@expo/vector-icons"
import { Button } from 'react-native-elements'
import { theme } from '../../constants/colors'
import ChatRoom from '../../components/Chat/ChatRoom'
import { GiftedChat } from 'react-native-gifted-chat'
import {AuthContext} from '../../context/AuthContext';
import main from '../../api/main';

const chatScreen = ({navigation}) => {

    const { state: authState } = useContext(AuthContext);

    const [user, setUser] = useState([]);

    // useEffect(()=>{
    //     const abortController = new AbortController()
    //     const getUser = async() =>{
    //         try{
    //             // setIsloading(true)
    //             const response = await main.get('/api/profile/', {
    //               headers: {
    //                 'Authorization': `Bearer ${authState.userToken}` 
    //               }         
    //             });
    //             console.log(response.data.id);
    //             setUser(response.data);
    //             //   setIsloading(false)
    //           }
    //           catch(err){
    //             //   setIsloading(false)
    //               console.log(err);
    //             //   setError(err)
    //           }
    //     }

    //     getUser();

    //     return () => {
    //         abortController.abort()
    //     }
    // },[])

    // console.log(user);

    return(
        <Button
        style={styles.button}
        title="Search for any events"
        onPress={()=>navigation.navigate("room")}
    />
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        height: Dimensions.get('screen').height,
    },

    header:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        width: '100%',
        paddingHorizontal:10,
        backgroundColor: theme.white,
        elevation:10,
    },

    section:{
        flex:5,
        width:'100%',
    },

    headerTitle:{
        color: theme.back,
        marginTop:70,
        fontSize:36,
        fontWeight:'bold',
    },

    button:{
        marginTop:75,
        flexDirection:'row',
        marginRight:10,
    },

    bellContainer:{     
        marginRight:10,
        borderRadius:10,
    },

    searchContainer:{     
        borderRadius:10,
    }


})

export default chatScreen
