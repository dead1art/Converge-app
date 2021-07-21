import React, { useContext,useEffect, useState} from 'react';
import { RefreshControl,View,Text, StyleSheet, SafeAreaView, Dimensions, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
// import {AuthContext} from '../../App';
import {AuthContext} from '../../context/AuthContext';
import { theme } from '../../constants/colors'
import main from '../../api/main';
import Profile from '../../components/profile/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FocusAwareStatusBar } from '../../components/statusbar'
import HostedEvent from '../../components/profile/HostedEvent'
import {
  NavigationContainer,
  useIsFocused,
} from '@react-navigation/native';

const initialState = {
  users:[],
  isFetching:false,
  hasError:false
}


const reducer = (state, action) => {
  switch (action.type){
     case 'FETCH_USER_REQUEST':
       return {
         ...state,
        isFetching:true,
        hasError:false
       }
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        isFetching: false,
        users:action.payload
      }
    case 'FETCH_USER_ERROR':
      return {
        ...state,
        isFetching: false,
        hasError:true
      }
  }
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const userScreen = ({navigation}) => {

  // const isFocused = useIsFocused();

  const { authContextValue }  = useContext(AuthContext);

  const { state: authState } = useContext(AuthContext);

  // console.log(authState.expoToken)

  const [state, dispatch] = React.useReducer(reducer, initialState);


  // const getToken =async() =>{
  //   try
  //   {
  //     const streamToken = await AsyncStorage.getItem("stream");
  //     console.log(streamToken);
  //   }
  //   catch(e)
  //   {
  //     console.log(e);
  //   }
  // }

  // getToken();
 

  // --LoadingScreen

  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = React.useState(false);

  // LoadingScreen--

  const url = '/api/profile/'

  const userInfo = state.users;
  const { hosted_events, tags } = userInfo;

  useEffect(()=>{
    const abortController = new AbortController()
    const getUser = async() =>{
      try{
        setIsloading(true)
        const response = await main.get(url, {
          headers: {
            'Authorization': `Bearer ${authState.userToken}` 
          }         
        });
          dispatch({type:'FETCH_USER_SUCCESS',payload:response.data});
          // console.log(response.data);
          setRefreshing(false)
          setIsloading(false)
      }
      catch(err){
          setRefreshing(false)
          setIsloading(false)
          console.log(err);
          setError(err)
      }
    }

    getUser();

    return () => {
      abortController.abort()
    }
  },[refreshing]);


    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false)); 
  }, []);

  //SignOut 

  const signOutUser = async() => {
    try{
          const response = await main.post('/api/del-expotoken/', 
            { 
              token:authState.expoToken 
            },
            {
             headers: {
              'Authorization': `Bearer ${authState.userToken}` 
              }
            })
            console.log(response)
          }
        catch (err){
          console.log(err)
        }
        authContextValue.signOut()
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
    <SafeAreaView style={styles.container}>

        <ScrollView 
        refreshControl={
              <RefreshControl refreshing={refreshing}  
                              onRefresh={onRefresh} 
              />}
        >

        <Profile 
        data={userInfo} 
        signout={signOutUser} 
        nav={() => navigation.navigate('edit', {userInfo})}
        // props={navigation}
        />

        <View style={styles.content}>

        {/* Interests */}

        <View style={styles.interests}>

          <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 24, }}>Interests</Text>
          
          <View style={styles.tagsView}>

          {tags && tags.map((item, index) => (
            <Text key={index} style={styles.tags}>{item}</Text>
            ))}

          </View>

          {!tags &&  <Text style={{textAlign:'center',color:theme.gray}}>Please add your intrests</Text>}

        </View>

        {/* HostedEvents */}

        <View style={styles.hostedEvents}>

          <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 24, }}>Hosted Events</Text>

          <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:10}}>

            {hosted_events && hosted_events.map((item) => (
              <HostedEvent key={item.id} eventdata={item} press={() => navigation.navigate("invite", {item} )} />
            ))}

          </View>

            {!hosted_events && <Text style={{textAlign:'center', marginBottom:'20%', marginTop:10, color: theme.gray}}> You have not hosted any events </Text>}

        </View>

        </View>

        </ScrollView>

      <FocusAwareStatusBar style="auto" />

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfcfc',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('screen').height,
  }, 

  content: {
    flex:1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal:20,
  },

  interests:{
    marginVertical:20,
    width:'100%',
  },

  hostedEvents:{
    marginTop:10,
    width:'100%',
  },

  tagsView:{
        marginVertical:10,
        marginHorizontal:0,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

  tags:{
        marginTop:10,
        marginRight:10,
        backgroundColor: theme.lightaccent,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:20,
    },

});

export default userScreen;
