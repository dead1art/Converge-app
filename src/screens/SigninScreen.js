import React, { useContext } from 'react'
import { View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import LoginForm from '../components/LoginForm';
import AuthContext from '../context/AuthContext';
import { Input, Text, Button } from 'react-native-elements';

const signinScreen = ({navigation})=> {
    
    const {authContextValue} = useContext(AuthContext);

    return (
        <View>
        <KeyboardAvoidingView>
        <LoginForm 
            onSubmit={authContextValue.signIn}
            onNavigate={() => navigation.navigate('register')}
        />
        </KeyboardAvoidingView>
        </View>
    ); 
}

const Style = StyleSheet.create({
});

export default signinScreen;