import React, {useContext,useState, useEffect} from 'react'
import { View, StyleSheet,SafeAreaView, Dimensions} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import RegisterForm from '../../components/authentication/RegisterForm';
// import {AuthContext} from '../../App';
import {AuthContext} from '../../context/AuthContext';
import { theme } from '../../constants/colors';
import {FocusAwareStatusBar} from "../../components/statusbar"
import { set } from 'react-native-reanimated';
import main from '../../api/main'
import { showMessage, hideMessage } from "react-native-flash-message";

const registerScreen = ({navigation})=> {

    const {dispatch} = useContext(AuthContext);

    const {authContextValue} = useContext(AuthContext);
    const {state:authState} = useContext(AuthContext);

    // const error = authState.haserror;
    // console.log(error);

    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passError, setPassError] = useState('weak')

    const register = async() => {
        try {
          const response = await main.post("/api/register/", { email, password, first_name, last_name });
          dispatch({ type: 'REGISTER', email:response.data.email });
          navigation.navigate("otp")
        } catch (error) {
            console.log(error);
            showMessage({
                          message:"Error creating your account!" ,
                          type:"danger",
                          floating: true,
                          duration:5000,
                          icon: {icon:"danger" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                   
                        });  
            dispatch({type:'Error', })
        }
    }

    useEffect(() => {
    if(password.length >= 8 )
    {
        setPassError("good")
    }
    else{
        setPassError("weak")
    }
    },[password])

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

            <Text 
            style={passError === "weak" ? styles.weakError : styles.goodError}>
                {passError}
                </Text>

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
            onPress={() => {
                register()
                // {!error && navigation.navigate("otp")}
            }
            }/>
             
        
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

    weakError:{
        color:'red',
    },

    goodError:{
        color:'green',
    }
})

export default registerScreen;