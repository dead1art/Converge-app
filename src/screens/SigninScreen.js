import React, { useContext } from 'react'
import { View, StyleSheet} from 'react-native';
import LoginForm from '../components/LoginForm';
import { Context } from '../context/authContext';
import { Input, Text, Button } from 'react-native-elements';

const signinScreen = ({navigation})=> {

    const {signin} = useContext(Context);

    return (
        <View>
        <LoginForm 
            headerText="Login"
            onSubmit={signin}
        />
        <Button
            title="Not a registered Member? Register now"
            type="clear"
            onPress={()=>{
                navigation.navigate('register');
            }}
        />
        </View>
    ); 
}

const Style = StyleSheet.create({
});

export default signinScreen;