import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button } from 'react-native-elements';


const RegisterForm = ({headerText, onSubmit})=> {
    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
        <Text h1>{headerText}</Text>
        <Input
            placeholder='First Name'
            value={first_name}
            onChangeText={setFname}
        />
        <Input
            placeholder='Last name'
            value={last_name}
            onChangeText={setLname}
        />
        <Input
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
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
        title="Register"
        onPress={() => onSubmit({ email, password, first_name, last_name })}
        />
        </>
    );
};

const Style = StyleSheet.create({
});

export default RegisterForm;