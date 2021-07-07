import React, { useContext,useEffect, useState} from 'react';
import { RefreshControl,View,Text, StyleSheet, SafeAreaView, Dimensions, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
// import {AuthContext} from '../../App';
import {AuthContext} from '../../context/AuthContext';
import main from '../../api/main';
import Profile from '../../components/profile/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FocusAwareStatusBar } from '../../components/statusbar'
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

const userScreen = ({navigation}) => {

  const isFocused = useIsFocused();

  const { authContextValue }  = useContext(AuthContext);

  const { state: authState } = useContext(AuthContext);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log(authState.streamToken);

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
 

  console.log(authState.user.first_name);

  // --LoadingScreen

  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null)

  // LoadingScreen--

  const url = '/api/profile/'

  const userInfo = state.users;

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
  },[url,isFocused]);

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


        <Profile 
        data={userInfo} 
        signout={authContextValue.signOut} 
        nav={() => navigation.navigate('edit', {userInfo})}
        props={navigation}
        />
        
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

});

export default userScreen;
