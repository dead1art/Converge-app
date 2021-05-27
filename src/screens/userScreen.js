import React, { useContext,useEffect, useState} from 'react';
import { RefreshControl,View,Text, StyleSheet, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
// import {AuthContext} from '../../App';
import {AuthContext} from '../context/AuthContext';
import main from '../api/main';
import Profile from '../components/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FocusAwareStatusBar } from '../components/statusbar'
import { ScrollView } from 'react-native';
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

  console.log(authState.userToken);

  const userInfo = state.users;
  useEffect(()=>{
    const getUser = async() =>{
      try{
        const response= await main.get('/api/profile/',{
          headers: {
            'Authorization': `Bearer ${authState.userToken}` 
          }
          
        });
        dispatch({type:'FETCH_USER_SUCCESS',payload:response.data});
        console.log(response.data);
      }
      catch(err){
        console.log(err);
      }
    }

    getUser();
  },[isFocused]);

  return (
    <SafeAreaView style={styles.container}>

      <FocusAwareStatusBar style="auto" />
      <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <Profile 
        data={userInfo} 
        signout={authContextValue.signOut} 
        nav={() => navigation.navigate('edit', {userInfo})}
        />

      
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
