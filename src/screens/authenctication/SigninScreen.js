import React, { useContext, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import LoginForm from '../../components/authentication/LoginForm'
// import {AuthContext} from '../../App';
import {AuthContext} from '../../context/AuthContext';
import { WebView } from 'react-native-webview';

const signinScreen = ({navigation}) => {
    
    const {authContextValue} = useContext(AuthContext);
    // const {webViewChange, setWebViewChange} = useState()

    return (
        <View>
        <KeyboardAvoidingView>

        <LoginForm 
            onSubmit={authContextValue.signIn}
            onNavigate={() => navigation.navigate('registerStack')}
            onForgot={() => navigation.navigate('forgot')}
        />
        </KeyboardAvoidingView>


        </View>
    ); 
}

const Style = StyleSheet.create({
});

export default signinScreen;