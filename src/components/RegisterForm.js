import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';


const RegisterForm = ({onSubmit,onNavigation})=> {
    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <SafeAreaView style={styles.container}> 

            <View style={styles.content}> 

            <Text style={styles.title}> Create Your Account </Text>

            <View style={styles.form}>
                
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
            onChangeText={setPassword} 
            placeholder='Password' />            
        
            </View>

            <Button 
            buttonStyle={{ backgroundColor: '#4a5ebd', 
            marginTop: 30,
            borderRadius: 20,
            paddingHorizontal: 20,}}
            title="Sign-Up" 
            onPress={() => onSubmit({ email, password, first_name, last_name })}/>

            </View>    

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
        height: Dimensions.get('screen').height,
    },
    content:{
        marginTop: '20%',
        display: 'flex',
        alignItems: 'center',
    },
    form:{
        alignItems: 'flex-start',
        width: '80%',
        marginTop: 10,
    },
    title:{
        fontSize: 30,
        fontWeight: "700",
        color: "#302b63",
        marginBottom: 40,
    },
    input:{
        padding: 15,
        paddingHorizontal: 20,
        color: '#a7a7a7',
        borderRadius: 20,
        backgroundColor: '#e0dfe9',
    },
})

export default RegisterForm;