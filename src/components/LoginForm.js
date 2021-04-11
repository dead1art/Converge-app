import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button } from 'react-native-elements';


const LoginForm = ({headerText,onSubmit})=> {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
        <Text h1>{headerText}</Text>
        <Input
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            leftIcon={
             <Icon
                name='user'
                size={24}
                color='black'
        />
         }
        />
        <Input
            secureTextEntry
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            leftIcon={
             <Icon
                name='key'
                size={24}
                color='black'
        />
         }
        />
        <Button
        title="Login"
        onPress={() => onSubmit({ email, password })}
        />
        </>
    );
};

const Style = StyleSheet.create({
});

export default LoginForm;