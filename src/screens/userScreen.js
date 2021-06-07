import React, { useContext,useEffect, useState} from 'react';
import { RefreshControl,View,Text, StyleSheet, SafeAreaView, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
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

  // --LoadingScreen

  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null)

  // LoadingScreen--

  console.log(authState.userToken);

  const userInfo = state.users;
  useEffect(()=>{
    const getUser = async() =>{
      try{
        setIsloading(true)
        const response= await main.get('/api/profile/',{
          headers: {
            'Authorization': `Bearer ${authState.userToken}` 
          }
          
        });
        dispatch({type:'FETCH_USER_SUCCESS',payload:response.data});
        console.log(response.data);
        setIsloading(false)
      }
      catch(err){
        setIsloading(false)
        console.log(err);
        setError(err)
      }
    }

    getUser();
  },[isFocused]);

  if (isloading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="black" />
        </View>
        );
    }

    if (error) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
            {error}
            </Text>
        </View>
        );
    }

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
