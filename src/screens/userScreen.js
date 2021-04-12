import React, { useContext } from 'react';
import { View,Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/authContext';
import main from '../api/main';
import AsyncStorage from '@react-native-async-storage/async-storage';


const userScreen = () => {

  const { signout } = useContext(AuthContext);

  // const token = await AsyncStorage.getItem("token");
  // console.log(token);

  // const res = await main.get('/api/profile/',{
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // })
  // console.log(res);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
        <Button title="Sign Out" onPress={signout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default userScreen;
