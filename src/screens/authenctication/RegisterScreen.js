import React, {useContext,useState, useEffect} from 'react'
import { View, StyleSheet,KeyboardAvoidingView, Dimensions, ImageBackground} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
    const imageUrl = "https://images.unsplash.com/photo-1558038033-2645449ec092?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHRyYXZlbGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"  

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
        <KeyboardAvoidingView behavior="padding" style={styles.container}> 

        <View style={styles.header}>
                <ImageBackground
                    source={{uri : imageUrl}}
                    style={{width: '100%', height: '100%'}}
                >

                </ImageBackground>

            </View>

        <View style={styles.content}>

            <Text style={styles.title}> Create Your Account</Text>  
                
            <Input 
            inputContainerStyle={{ 
                borderBottomWidth: 1,
                borderColor:'#a0a2a7',
                height: 50,
                marginHorizontal:10,
            }}
            rightIcon={
                <MaterialIcons
                    name="person"
                    size={20}
                    color={theme.black}
                />
            }
            inputStyle={styles.input}
            placeholderTextColor={theme.black}
            placeholder='First Name' 
            value={first_name}
            onChangeText={setFname} 
            /> 

            <Input 
            inputContainerStyle={{ 
                borderBottomWidth: 1,
                borderColor:'#a0a2a7',
                height: 50,
                marginHorizontal:10,
            }}
            rightIcon={
                <MaterialIcons
                    name="person"
                    size={20}
                    color={theme.black}
                />
            }
            inputStyle={styles.input}
            placeholderTextColor={theme.black}
            placeholder='Last Name' 
            value={last_name}
            onChangeText={setLname} 
            /> 

            <Input 
            inputContainerStyle={{ 
                borderBottomWidth: 1,
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
            placeholderTextColor={theme.black}
            placeholder='Email' 
            value={email}
            onChangeText={setEmail} 
            /> 

            <Input 
            inputContainerStyle={{ 
                borderBottomWidth: 1,
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
            placeholderTextColor={theme.black}
            placeholder='Password' 
            value={password}
            onChangeText={setPassword}
            secureTextEntry 
            /> 

            <View style={{
                flexDirection:'row', 
                alignItems:'center', 
                marginBottom:30, 
                marginHorizontal:20}}>
                <MaterialIcons name="warning" size={16} color={'rgba(0,0,0,0.5)'} />
                <Text style={{color: 'rgba(0,0,0,0.5)'}}> Minimum password length must be of 8 characters!</Text>
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
                title="Register" 
                type="clear"
                onPress={() => register()}
            />             
        
        </View>    
        
        <FocusAwareStatusBar style="auto"/>

        </KeyboardAvoidingView>
    );
};

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
        flex: 3,
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

    weakError:{
        color:'red',
    },

    goodError:{
        color:'green',
    }
})

export default registerScreen;