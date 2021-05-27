import React, { useState,useContext } from 'react';
import { View, StyleSheet, Image, Dimensions} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import {FocusAwareStatusBar} from './statusbar';
import { DarkTheme } from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import main from '../api/main';
import AsyncStorage from '@react-native-async-storage/async-storage';




const LoginForm = ({onSubmit,onNavigate}) => {

    const {dispatch} = useContext(AuthContext);

    const client_id="7G9ugODJhtBbJee4EURnmJFILJUpAFJ2COPKjqCz";
    const client_secret="z3asQ77QYQRsZkaWYX7R7JpAp0kVPo6ifQeGlQX1mXWaNMrqCfVbsRM4jBN2k2SpiZC28EH2uFGEN9YLNgBB69WA9dpZN3NtBj4pl6fW1ps27VC2glU5Ng9tIysQ7mXv"

    WebBrowser.maybeCompleteAuthSession();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '1057006535522-7gp44kt05jk0i9jlqe0l2rbbti53mijc.apps.googleusercontent.com',
        androidClientId: '1057006535522-7gp44kt05jk0i9jlqe0l2rbbti53mijc.apps.googleusercontent.com',
        webClientId: '1057006535522-7gp44kt05jk0i9jlqe0l2rbbti53mijc.apps.googleusercontent.com',
      });

      React.useEffect(() => {
        if (response?.type === 'success') {
          const { authentication } = response;
          const token = authentication.accessToken;
          const signInGoogle = async() =>{
            try{
                console.log(token);
                const googleResponse = await main.post("/api/convert-token/",{ token, backend: "google-oauth2", client_id, client_secret, grant_type: "convert_token" });
                console.log(googleResponse.data);
                console.log(googleResponse.status);
                await AsyncStorage.setItem("token", googleResponse.data.access_token);
                dispatch({type: 'SIGN_IN', token:googleResponse.data.access_token});
              }
              catch(err)
              {
                console.log(err);
              }
          }
          signInGoogle();
          }
      }, [response]);

      

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

    if (!fontsLoaded) {
     return <AppLoading />;
    }

    else

    return (

        <View style={styles.container}>      

            <View style={styles.header}> 

                <Text style={styles.logo}> Converge </Text>

            </View>

                
            <View style={styles.content}>

                <Input
                    inputContainerStyle={{ borderBottomWidth: 0,
                        backgroundColor: 'white',
                        borderRadius:20,
                        height: 60,
                    }}
                    inputStyle={styles.input}
                    value={email}
                    autoCapitalize="none" 
                    onChangeText={setEmail}
                    placeholder='Email' 
                    />
                    
                <Input 
                    inputContainerStyle={{ borderBottomWidth: 0, 
                        backgroundColor: 'white',
                        borderRadius:20,
                        height: 60,
                    }}
                    inputStyle={styles.input}
                    value={password} 
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    placeholder='Password' 
                    secureTextEntry 
                    rightIcon=
                    {password.length<8 &&
                        <Ionicons
                            name='warning'
                            size={24}
                            style={{ marginRight: 15,}}
                            color='red'
                        />    
                    } 
                    
                />

                {/* {password.length<8 && 
                <Text>Please enter password that is longer than 8 characters</Text>
                } */}

                    <Button 
                        disabled={!password}
                        titleStyle={{ 
                            color: 'white',
                        }}  
                        buttonStyle={{
                            backgroundColor: 'black',
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
                        onPress={() => {
                            promptAsync();
                            }}
                        icon={
                            <Ionicons name="md-logo-google" style={{marginRight: 10}} size={24} color="white" />
                        }
                        />  
                     
            </View>

            <View style={styles.footer}>

                    <Button
                        title="New to Converge ? Register now"
                        type="clear"
                        onPress={()=> onNavigate()}
            
                    />
                    
            </View>

            <FocusAwareStatusBar style="auto"/>

        </View>
    )


}

const styles = StyleSheet.create ({

    container:{
        display:'flex',
        width: '100%',
        backgroundColor:'#E5E8EE',
        height: Dimensions.get('screen').height,
    },

    header: {
        flex:1,
        marginTop: 30,
    },

    content:{
        flex: 2,
        marginHorizontal: 10,
        paddingTop: 50,
    },

    footer:{
        flex:1,
        justifyContent: 'center',
    },

    logo: {
        marginTop: 30,
        fontSize: 60,
        textAlign: 'center',
        fontFamily: 'Pacifico_400Regular',
    },

    input: {
        borderRadius:30,
        paddingHorizontal: 20,
        color: 'black',
        backgroundColor: 'white',
    },

    new:{
        color: 'white',
    },   
})

export default LoginForm;