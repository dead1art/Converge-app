import React, { useState,useContext } from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import {FocusAwareStatusBar} from '../statusbar';
import {theme} from "../../constants/colors"
import {AuthContext} from '../../context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import main from '../../api/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';




const LoginForm = ({onSubmit,onNavigate}) => {

    const {dispatch} = useContext(AuthContext);

    const client_id="7G9ugODJhtBbJee4EURnmJFILJUpAFJ2COPKjqCz";
    const client_secret="z3asQ77QYQRsZkaWYX7R7JpAp0kVPo6ifQeGlQX1mXWaNMrqCfVbsRM4jBN2k2SpiZC28EH2uFGEN9YLNgBB69WA9dpZN3NtBj4pl6fW1ps27VC2glU5Ng9tIysQ7mXv"

    WebBrowser.maybeCompleteAuthSession();
    // 1057006535522-7gp44kt05jk0i9jlqe0l2rbbti53mijc.apps.googleusercontent.com

    const useProxy = true;

    const redirectUri = AuthSession.makeRedirectUri({
        useProxy,
      });

    //   console.log(redirectUri);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '1057006535522-7gp44kt05jk0i9jlqe0l2rbbti53mijc.apps.googleusercontent.com',
        androidClientId: '1057006535522-tcrubkaerism29irmamo96jplrg8uckb.apps.googleusercontent.com',
        webClientId: '1057006535522-7gp44kt05jk0i9jlqe0l2rbbti53mijc.apps.googleusercontent.com',
        redirectUri,
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
                  const streamresponse = await main.get('/api/chat/token',{
                    headers: {
                      'Authorization': `Bearer ${googleResponse.data.access_token}` 
                    }
                  });
                  await AsyncStorage.setItem("stream", streamresponse.data.token);
                  const userResponse = await main.get('/api/profile/', {
                    headers: {
                      'Authorization': `Bearer ${googleResponse.data.access_token}` 
                    }         
                })
                dispatch({ type: 'SIGN_IN', token:googleResponse.data.access_token, stream:streamresponse.data.token, user: userResponse.data });
              }
              catch(err)
              {
                console.log(err);
              }
          }
          signInGoogle();
          }
      }, [response]);

    const imageUrl = "https://images.unsplash.com/photo-1558038033-2645449ec092?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHRyYXZlbGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"  

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
                <ImageBackground
                    source={{uri : imageUrl}}
                    style={{width: '100%', height: '100%'}}
                >

                <Text style={styles.logo}> Converge </Text>

                </ImageBackground>

            </View>

                
            <View style={styles.content}>

                <Text style={{color:theme.gray, marginLeft:20, marginVertical:20}}> Sign in to continue </Text>

                <Input
                    inputContainerStyle={{ 
                        borderBottomWidth: 2,
                        borderColor:'#a0a2a7',
                        height: 50,
                        marginHorizontal:10,
                    }}
                    rightIcon={
                        <MaterialIcons
                            name="email"
                            size={20}
                            color={theme.black}
                        />
                    }
                    inputStyle={styles.input}
                    value={email}
                    autoCapitalize="none" 
                    onChangeText={setEmail}
                    placeholder='Email' 
                    placeholderTextColor={theme.black}
                    />
                    
                <Input 
                    inputContainerStyle={{
                        borderBottomWidth: 2,
                        borderColor:'#a0a2a7',
                        height: 50,
                        marginHorizontal:10,
                    }}
                    rightIcon={
                        <MaterialIcons
                            name="lock"
                            size={20}
                            color={theme.black}
                        />
                    }
                    inputStyle={styles.input}
                    value={password} 
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    placeholder='Password' 
                    placeholderTextColor={theme.black}
                    secureTextEntry 
                    // rightIcon=
                    // {password.length<8 &&
                    //     <Ionicons
                    //         name='warning'
                    //         size={24}
                    //         style={{ marginRight: 15,}}
                    //         color='red'
                    //     />    
                    // } 
                    
                />

                {/* {password.length<8 && 
                <Text>Please enter password that is longer than 8 characters</Text>
                } */}

                    <Button 
                        titleStyle={{ 
                            color: 'white',
                        }}  
                        buttonStyle={{
                            backgroundColor: theme.blue,
                            padding:15,
                            borderRadius: 10,
                            marginHorizontal: 10,
                        }}
                         title="Login" type="clear"
                         onPress={() => onSubmit({ email, password })}
                         />    

                    <Button
                        disabled={!request}
                        buttonStyle={{
                            borderRadius: 10,
                            marginTop: 20,
                            padding: 15,
                            backgroundColor: theme.black,
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
                    
                    <Button
                        containerStyle={{marginTop:25}}
                        title="New to Converge ? Register now"
                        type="clear"
                        titleStyle={{color: theme.gray}}
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
        height: Dimensions.get('screen').height,
    },

    header: {
        flex:2,
    },

    content:{
        flex: 2.5,
        elevation:10,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor: theme.white,
        paddingHorizontal:10,
        paddingTop:10,
        marginTop:-20,
    },

    logo: {
        marginTop: 80,
        fontSize: 60,
        color:theme.white,
        textAlign: 'center',
        fontFamily: 'Pacifico_400Regular',
    },

    input: {
        paddingHorizontal: 5,
        color: 'black',
        fontSize:16,
    },

})

export default LoginForm;