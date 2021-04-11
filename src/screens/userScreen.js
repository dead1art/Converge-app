import React, { useContext } from 'react';
import { View,Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/authContext';

const userScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
        <Button title="Sign Out" onPress={signout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default userScreen;
