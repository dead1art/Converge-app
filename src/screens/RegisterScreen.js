import React, {useContext} from 'react'
import { View, Text, Button, StyleSheet} from 'react-native';
import RegisterForm from '../components/RegisterForm';
import { Context } from '../context/authContext';

const registerScreen = ()=> {
    const {register} = useContext(Context);
    return(
        <View>
            <RegisterForm 
                headerText = "Register"
                onSubmit={register}
            />
        </View>
    );
};

const Style = StyleSheet.create({
});

export default registerScreen;