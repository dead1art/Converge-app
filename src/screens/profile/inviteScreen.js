import React,{useContext,useEffect,useState} from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext';
import InviteCard from '../../components/profile/InviteCard'
import { FocusAwareStatusBar } from '../../components/statusbar'
import { Dimensions } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { Button } from 'react-native-elements'
import { theme } from '../../constants/colors';

const inviteScreen = ({route, navigation}) => {

    const { id, title } = route.params.item;

    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null)

    const [invites, setInvites] = useState([])

    //Accepted dependency for useState

    const [accepted, setAccepted] = useState()

    const { state: authState } = useContext(AuthContext);

    const getUrl = `https://converge-project.herokuapp.com/api/event/${id}/`

    const postUrl = `https://converge-project.herokuapp.com/api/event/accept/${id}/`

    useEffect(()=>{
    const abortController = new AbortController()
    const getInvites = async() =>{
      try{
        setIsloading(true)
        const response = await axios.get(getUrl, {
          headers: {
            'Authorization': `Bearer ${authState.userToken}` 
          }         
        });
          const data = response.data
        //   console.log(data.invites)
          setInvites(data.invites)
          setIsloading(false)
      }
      catch(err){
          setIsloading(false)
          console.log(err);
          setError(err)
      }
    }

    getInvites();

    return () => {
      abortController.abort()
    }
  },[accepted]);


    const acceptHandler = async(userid) => {
        try{
            const invite_response = await axios.post(postUrl,
                {userid}, 
                {
                headers: {
                    'Authorization': `Bearer ${authState.userToken}` 
            }});
            setAccepted(userid)
            console.log(invite_response.data);
        }
        catch(err){
            console.log(err);
            setError(err)
        }
    }


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

                <Button
                        type="clear"
                        containerStyle={{
                            position: 'absolute',
                            left: 20,
                            top: 34,
                            // backgroundColor: 'rgba(0,0,0,0.25)',
                            borderRadius: 10,
                        }}
                        icon={
                            <MaterialIcons
                                name="arrow-back"
                                size={28}
                                color={'black'}
                            />
                        }
                        onPress={() => navigation.goBack()} />

                <Text style={{fontWeight:'bold', fontSize:24}}> {title} </Text>
            </View>

            
            <View style={styles.content}>

            <FlatList
                data={invites}
                keyExtractor={item => item.userid.toString()}
                renderItem={({item}) => (
                     <InviteCard cardData={item} accept={() => acceptHandler(item.userid)}/>
                     )}
                ListEmptyComponent={<Text> No invites for u </Text>}
                     />

            </View>

            <FocusAwareStatusBar style="auto" />

        </View>
    )
}

export default inviteScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height: Dimensions.get('screen').height,
    },

    header:{
        flex:0.2,
        alignItems:'center',
        paddingVertical:'10%',
        borderBottomWidth:2,
        borderColor:theme.lightaccent,
        width:'100%',
    },

    content:{
        flex:4.8,
        paddingVertical:'10%',
        width:'100%',
        alignItems:'center',
    }
})