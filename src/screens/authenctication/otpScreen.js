import React, {useState, useEffect} from 'react'
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
    const [otp,setOtp] = React.useState();
    const regemail= authState.registerEmail;

    //OTP Timer

    const RESEND_OTP_TIME_LIMIT = 60; // 30 secs
    const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

    let resendOtpTimerInterval;
    let autoSubmitOtpTimerInterval;

    const [resendButtonDisabledTime, setResendButtonDisabledTime] =  useState(RESEND_OTP_TIME_LIMIT);

    const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }

    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };
    
    useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

    // OTP Timer
    

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
                          icon: {icon:"success" , position: "left"},
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

    const resendOtp = async() =>{
        try{
          const response = await main.get('/api/resend-otp/',{
              params:{
                  email: regemail,
              }
            })
          console.log(response);
          showMessage({
                          message:"OTP will be sent to your mail!" ,
                          type:"success",
                          floating: true,
                          duration:5000,
                          icon: {icon:"success" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                          
                        }); 
        }
        catch(err)
        {
          showMessage({
                          message:"There was a problem in sending your otp!" ,
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
                    name="phone-android"
                    size={20}
                    color={theme.black}
                />
            }
            inputStyle={styles.input}
            autoFocus
            value={otp}
            keyboardType="number-pad"
            onChangeText={setOtp}
            placeholder='' 
            placeholderTextColor={theme.black}
          />

            <View style={{
                marginBottom:30, 
                marginTop:-10,
                marginHorizontal:20}}>
                <Text style={{color: 'rgba(0,0,0,0.5)'}}>OTP has been sent to your registered email address</Text>
            </View>

            { resendButtonDisabledTime > 0 ? (
                <Text style={{textAlign:'center',marginVertical:10,marginHorizontal:10,color: theme.gray}}> Resend OTP in {resendButtonDisabledTime}s </Text> 
            ) : (
            <Button 
                titleStyle={{ 
                    color: theme.black,
                }}  
                buttonStyle={{
                    borderRadius: 10,
                    marginHorizontal: 10,
                }}
                title="Resend OTP" 
                type="cleat"
                onPress={() => {
                    resendOtp()
                    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
                    startResendOtpTimer();
                }}
            />
            )
            }
        
        <Button 
                titleStyle={{ 
                    color: 'white',
                }}  
                buttonStyle={{
                    backgroundColor: theme.blue,
                    padding:15,
                    borderRadius: 10,
                    marginHorizontal: 10,
                    marginTop:'30%',
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
        flex: 2,
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
