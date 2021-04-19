import React, { useState } from 'react';
import { View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button } from 'react-native-elements';
import { SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginForm = ({onSubmit,onNavigate}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(password.length);

    return (
        <SafeAreaView  style={styles.container}>

            <StatusBar barStyle="light-content"/>

            <View style={styles.content}>


                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    />
                
                <View style={styles.login}> 

                <Input
                    inputContainerStyle={{ borderBottomWidth: 0,}}
                    inputStyle={styles.input}
                    value={email}
                    autoCapitalize="none" 
                    onChangeText={setEmail}
                    placeholder='Email' 
                    // leftIcon={
                    //     // <Icon
                    //     //     name='key'
                    //     //     size={24}
                    //     //     color='black'
                    //     // />
                    //          }
                    />
                <Input 
                    inputContainerStyle={{ borderBottomWidth: 0}}
                    inputStyle={styles.input}
                    value={password} 
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    placeholder='Password' 
                    secureTextEntry 
                    rightIcon=
                    {password.length<8 &&
                        <Icon
                            name='exclamation'
                            size={24}
                            color='red'
                        />    
                    } 
                />
                {/* {password.length<8 && 
                <Text>Please enter password that is longer than 8 characters</Text>
                } */}
                    <Button 
                        
                        titleStyle={{ 
                            color: 'white',
                        }}  
                        buttonStyle={{
                            backgroundColor: '#4a5ebd',
                            padding:15,
                            borderRadius: 20,
                            marginHorizontal: 10,
                        }}
                         title="Login" type="clear"
                         onPress={() => onSubmit({ email, password })}
                         />    

                    <Button
                        buttonStyle={{
                            borderRadius: 20,
                            marginTop: 25,
                            padding: 15,
                            marginHorizontal: 10,
                        }}
                        title="Sign-in with Google"
                        titleStyle={{ color: 'white'}}
                        
                        icon={
                            <Ionicons name="md-logo-google" style={{marginRight: 10}} size={24} color="white" />
                        }
                        />  
                    
                
                </View>

                <View style={styles.signup}>

                    <Button
                        title="New to Converge ? Register now"
                        type="clear"
                        onPress={()=> onNavigate()}
            
                    />
                    
                </View>

            </View>

        </SafeAreaView>
    )


}

const styles = StyleSheet.create ({

    container:{
        width: '100%',
        height: Dimensions.get('screen').height,
        backgroundColor: '#e3eaf4',
    },
    content:{
        height: Dimensions.get('screen').height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    logo: {
        position: 'absolute',
        top: 100,
    },
    login:{
        width: '80%',
        margin: 20,
        position: 'absolute',
        bottom: 220,
    },
    input: {
        padding: 15,
        paddingHorizontal: 20,
        color: 'black',
        borderRadius: 20,
        backgroundColor: 'white',
    },
    signup:{
        position: 'absolute',
        bottom: 120,
    },
    new:{
        color: 'white',
    },   
})

export default LoginForm;