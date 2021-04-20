import React, { useContext,useEffect, useState} from 'react';
import { View,Text, StyleSheet, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
// import {AuthContext} from '../../App';
import {AuthContext} from '../context/AuthContext';
import main from '../api/main';
import Profile from '../components/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [tags, setTags] = useState([])

  const { authContextValue }  = useContext(AuthContext);

  const { state: authState } = useContext(AuthContext);

  const [state, dispatch] = React.useReducer(reducer, initialState);

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

      }
      catch(err){
        console.log(err);
      }
    }

    getUser();
  },[]);
  
  console.log(userInfo)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white"/>
    <Button title="props"
          onPress={() => navigation.navigate('edit',{userInfo}) }
        />
        <Profile 
        data={userInfo} 
        signout={authContextValue.signOut} 
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
