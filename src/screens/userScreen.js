import React, { useContext,useEffect} from 'react';
import { View,Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
// import {AuthContext} from '../../App';
import AuthContext from '../context/AuthContext';
import main from '../api/main';
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


const userScreen = () => {
  const { authContextValue }  = useContext(AuthContext);

  const { state: authState } = useContext(AuthContext);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const tag = state.users;

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
  

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      {/* {state.users.tags.map(tag)} */}
        <Button onPress={authContextValue.signOut} title='signout' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default userScreen;
