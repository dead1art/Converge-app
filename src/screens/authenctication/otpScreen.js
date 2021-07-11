import React from 'react'
import { View,  StyleSheet } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import main from '../../api/main';
import {AuthContext} from '../../context/AuthContext';
import { TextInput } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

const otpScreen = ({navigation}) => {

    const {state:authState} = React.useContext(AuthContext);

    const regemail= authState.registerEmail;
    
    
    const setupOtp = async() =>{
        try{
          console.log(regemail);
          console.log(otp);
            const response = await main.post('/api/verifyemail/',{email:regemail,otp:otp})
            console.log(response);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const [otp,setOtp] = React.useState();

    return (
      <View>
        <Input 
        value={otp}
        onChangeText={setOtp} 
        placeholder='Enter otp'
        />
        <Button 
        buttonStyle={{ backgroundColor: '#1e5eff', 
        padding:10,
        marginTop: 30,
        borderRadius: 20,
        width:110,}}
        title="Verify"
        onPress={()=>{
          setupOtp();
          navigation.navigate("signin");
        }}
        />
      </View>
    )
}

const styles = StyleSheet.create({
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
