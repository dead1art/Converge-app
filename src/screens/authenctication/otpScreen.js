import React, {useState} from 'react'
import { View,  StyleSheet, Dimensions, ImageBackground, KeyboardAvoidingView } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import main from '../../api/main';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {AuthContext} from '../../context/AuthContext';
import { Input, Text, Button } from 'react-native-elements';
import {FocusAwareStatusBar} from "../../components/statusbar"
import { showMessage, hideMessage } from "react-native-flash-message";
import { theme } from '../../constants/colors'

const otpScreen = ({navigation}) => {

    const {state:authState} = React.useContext(AuthContext);
    const regemail= authState.registerEmail;

    
    
    const setupOtp = async() =>{
        try{
          console.log(regemail);
          console.log(otp);
          const response = await main.post('/api/verifyemail/',{email:regemail,otp:otp})
          console.log(response);
          showMessage({
                          message:"Registered Successfully!" ,
                          type:"success",
                          floating: true,
                          duration:5000,
                          icon: {icon:"danger" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                          
                        });
          navigation.navigate("signin")  
        }
        catch(err)
        {
          showMessage({
                          message:"Invalid OTP!" ,
                          type:"danger",
                          floating: true,
                          duration:5000,
                          icon: {icon:"danger" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                          
                        }); 
          console.log(err);
        }
    }


    const imageUrl = "https://images.unsplash.com/photo-1558038033-2645449ec092?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHRyYXZlbGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"  

    const [otp,setOtp] = React.useState();

    return (
      <KeyboardAvoidingView behavior="padding"style={styles.container}>

        <View style={styles.header}>
                <ImageBackground
                    source={{uri : imageUrl}}
                    style={{width: '100%', height: '100%'}}
                >

                </ImageBackground>

            </View>

        <View style={styles.content}>

          <Text style={styles.title}> Enter Your OTP </Text>  

          <Input
            inputContainerStyle={{ 
                borderBottomWidth: 1,
                borderColor:'#a0a2a7',
                height: 50,
                marginHorizontal:10,
            }}
            rightIcon={
                <MaterialIcons
                    name="phone"
                    size={20}
                    color={theme.black}
                />
            }
            inputStyle={styles.input}
            value={otp}
            onChangeText={setOtp}
            placeholder='OTP' 
            placeholderTextColor={theme.black}
          />

          <View style={{
                marginBottom:30, 
                marginHorizontal:20}}>
                <Text style={{color: 'rgba(0,0,0,0.5)'}}>OTP has been sent to your registered email address</Text>
            </View>
        

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
                title="Verify" 
                type="clear"
                onPress={() => setupOtp()}
            />

        </View>

        <FocusAwareStatusBar style="auto"/>

      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        width: '100%',
        height: Dimensions.get('screen').height,
        backgroundColor:theme.white,
    },

    header: {
        flex:2,
    },

    content:{
        flex: 1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor: theme.white,
        paddingHorizontal:10,
        paddingTop:10,
        marginTop:-20,
    },

    title:{
        color:theme.gray, 
        marginLeft:20, 
        marginVertical:20,
    },

    input: {
        paddingHorizontal: 5,
        color: 'black',
        fontSize:16,
    },

})

export default otpScreen
