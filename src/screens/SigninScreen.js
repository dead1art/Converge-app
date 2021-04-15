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
            onSubmit={signin}
            onNavigate={() => navigation.navigate('register')}
        />
        
        </View>
    ); 
}

const Style = StyleSheet.create({
});

export default signinScreen;