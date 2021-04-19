import React, {useContext} from 'react'
import { View, Text, Button, StyleSheet} from 'react-native';
import RegisterForm from '../components/RegisterForm';
// import {AuthContext} from '../../App';
import AuthContext from '../context/AuthContext';


const registerScreen = ({navigation})=> {
    const {authContextValue} = useContext(AuthContext);
    return(
        <View>
            <RegisterForm 
                onSubmit={authContextValue.register}
                // onNavigation={navigation.navigate('signin')}
            />
        </View>
    );
};

const Style = StyleSheet.create({
});

export default registerScreen;