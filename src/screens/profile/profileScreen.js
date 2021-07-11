import React, { useContext,useEffect, useState} from 'react';
import { RefreshControl,View,Text, StyleSheet, SafeAreaView, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext';
import { MaterialIcons } from "@expo/vector-icons"
import main from '../../api/main';
import axios from 'axios'
import UserProfile from '../../components/profile/UserProfile'
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


const profileScreen = ({navigation, route }) => {

  const { host } = route.params.item;

  // console.log(host)

  const isFocused = useIsFocused();

  const { authContextValue }  = useContext(AuthContext);

  const { state: authState } = useContext(AuthContext);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  // --LoadingScreen

  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null)

  // LoadingScreen--

  const url = "https://converge-project.herokuapp.com/api/profile/" + host + "/";

  const userInfo = state.users;

  useEffect(()=> {
    const getUser = async() =>{
      try{
        dispatch({type:'FETCH_USER_REQUEST'});
        setIsloading(true)
        const response= await axios.get(url,{

          headers: {
            'Authorization': `Bearer ${authState.userToken}` 
          }
          
        });
        dispatch({type:'FETCH_USER_SUCCESS',payload:response.data});
        console.log(response.data);
        setIsloading(false)
      }
      catch(err){
        dispatch({type:'FETCH_USER_ERROR'});
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

        <UserProfile 
        data={userInfo} 
        back={() => navigation.goBack()}
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

export default profileScreen;
