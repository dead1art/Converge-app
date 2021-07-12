import React, {useState} from 'react'
import { View,  StyleSheet, Dimensions } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import main from '../../api/main';
import {AuthContext} from '../../context/AuthContext';
import { TextInput } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { showMessage, hideMessage } from "react-native-flash-message";

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

    const [otp,setOtp] = React.useState();

    return (
      <View style={styles.container}>

        <View style={styles.content}>
          <Input 
          value={otp}
          onChangeText={setOtp} 
          placeholder='Enter otp'
          />
        </View>

        <Button 
        buttonStyle={{ backgroundColor: '#1e5eff', 
        alignSelf:'center',
        padding:10,
        marginTop: 30,
        borderRadius: 20,
        width:110,}}
        title="Verify"
        onPress={()=>{
          setupOtp();
        }}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    contaner:{
      width: '100%',
      alignItems:'center',
      height: Dimensions.get('screen').height,  
    },

    content:{
      marginHorizontal:20,
      marginTop:'30%',
    },

    borderStyleBase: {
      width: 30,
      height: 45
    },
   
    borderStyleHighLighted: {
      borderColor: "#03DAC6",
    },
   
    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
    },
   
    underlineStyleHighLighted: {
      borderColor: "#03DAC6",
    },
  });

export default otpScreen
