import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { theme } from '../../constants/colors';
import {FocusAwareStatusBar} from '../statusbar';


const RegisterForm = ({onSubmit})=> {
    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <SafeAreaView style={styles.container}> 

        <View style={styles.header}>

            <Text style={styles.title}> Create Your Account </Text>

        </View>

        <View style={styles.content}> 
                
            <Input 
            inputStyle={styles.input} 
            inputContainerStyle={{borderBottomWidth:0}}
            value={first_name}
            onChangeText={setFname} 
            placeholder='First Name' />

            <Input 
            inputStyle={styles.input} 
            inputContainerStyle={{borderBottomWidth:0}}
            value={last_name}
            onChangeText={setLname} 
            placeholder='Last Name' />

            <Input 
            inputStyle={styles.input} 
            inputContainerStyle={{borderBottomWidth:0}}
            value={email}
            onChangeText={setEmail} 
            placeholder='Email' />

            <Input 
            inputStyle={styles.input} 
            inputContainerStyle={{borderBottomWidth:0}}
            value={password}
            secureTextEntry
            onChangeText={setPassword} 
            placeholder='Password' /> 

            <Button
            type="clear" 
            containerStyle={{ 
                backgroundColor: '#1e5eff', 
                paddingVertical:5,
                paddingHorizontal:10,
                marginTop: 30,
                borderRadius: 10,
                
            }}
            titleStyle={{color: theme.white}}
            title="Sign-Up" 
            onPress={() => onSubmit({ email, password, first_name, last_name })}/>
             
        
        </View>    

        <View style={styles.footer}>

            
        </View>

        <FocusAwareStatusBar style="auto"/>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: theme.white,
        width: '100%',
        height: Dimensions.get('screen').height,
    },

    header:{
        flex:1,
        // alignItems: 'center',
        marginTop:50,
    },

    content:{
        flex:11,
        marginHorizontal:20,
        alignItems: 'center',
    },

    title:{
        fontSize: 30,
        fontWeight: "700",
        color: "black",
        marginBottom: 40,
    },
    input:{
        padding: 15,
        paddingHorizontal: 20,
        color: 'black',
        borderRadius: 20,
        backgroundColor: theme.lightaccent,
    },
})

export default RegisterForm;