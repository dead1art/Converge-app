import React, { useContext,useState, useCallback, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import { FocusAwareStatusBar } from '../../components/statusbar'
import NotificationCard from '../../components/Chat/NotificationCard'
import { Button } from 'react-native-elements'
import { theme } from '../../constants/colors'
import {AuthContext} from '../../context/AuthContext';
import main from '../../api/main';
import {
  NavigationContainer,
  useIsFocused,
} from '@react-navigation/native';

const notificationScreen = ({navigation}) => {

    const isFocused = useIsFocused();

    const { state: authState } = useContext(AuthContext);

    const [notifications, setNotifications] = useState([]);

    // --LoadingScreen

    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null)

    // LoadingScreen--

    useEffect(()=>{
        const abortController = new AbortController()
        const getUser = async() =>{
            try{
                setIsloading(true)
                const response = await main.get('/api/notifications/', {
                  headers: {
                    'Authorization': `Bearer ${authState.userToken}` 
                  }         
                });
                console.log(response.data);
                setNotifications(response.data)
                setIsloading(false)
              }
              catch(err){
                  setIsloading(false)
                  console.log(err);
                  setError(err)
              }
        }

        getUser();

        return () => {
            abortController.abort()
        }
    },[isFocused])

    if (isloading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="black" />
            <FocusAwareStatusBar style="auto" />
        </View>
        );
    }

    if (error) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
            {error}
            </Text>
            <FocusAwareStatusBar style="auto" />
        </View>
        );
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>

                <Text style={{fontWeight:'bold', fontSize:28,}}> Activity </Text>

            </View>

            
            <View style={styles.content}>

            <FlatList
                data={notifications}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text style={{marginTop:10}}> There are no recent activities for you </Text>}
                renderItem={({item}) => (
                     <NotificationCard cardData={item} />
                     )}
                     />

            </View>

            <FocusAwareStatusBar style="auto" />

        </View>
    )
}

export default notificationScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:theme.white,
        height: Dimensions.get('screen').height,
    },

    header:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:20,
        marginHorizontal:20,
        borderColor:theme.lightaccent,
    },

    content:{
        flex:7,
        width:'100%',
        paddingHorizontal:10,
        alignItems:'center',
    }
})

