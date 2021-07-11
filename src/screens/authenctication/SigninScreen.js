import React, { useContext } from 'react'
import { View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import LoginForm from '../../components/authentication/LoginForm'
// import {AuthContext} from '../../App';
import {AuthContext} from '../../context/AuthContext';

const signinScreen = ({navigation})=> {
    
    const {authContextValue} = useContext(AuthContext);

    return (
        <View>
        <KeyboardAvoidingView>
        <LoginForm 
            onSubmit={authContextValue.signIn}
            onNavigate={() => navigation.navigate('registerStack')}
        />
        </KeyboardAvoidingView>
        </View>
    ); 
}

const Style = StyleSheet.create({
});

export default signinScreen;