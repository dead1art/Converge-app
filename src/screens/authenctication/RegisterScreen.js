import React, {useContext,useState} from 'react'
import { View, StyleSheet,SafeAreaView, Dimensions} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import RegisterForm from '../../components/authentication/RegisterForm';
// import {AuthContext} from '../../App';
import {AuthContext} from '../../context/AuthContext';
import {FocusAwareStatusBar} from "../../components/statusbar"

const registerScreen = ({navigation})=> {
    const {authContextValue} = useContext(AuthContext);
    const {state:authState} = useContext(AuthContext);

    const error = authState.haserror;
    console.log(error);

    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View>
            {/* <RegisterForm 
                onSubmit={authContextValue.register}
            />
             */}
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


</View>    

<View style={styles.footer}>

    <Button 
    buttonStyle={{ backgroundColor: '#1e5eff', 
    padding:10,
    marginTop: 30,
    borderRadius: 20,
    width:110,}}
    title="Sign-Up" 
    onPress={() => {authContextValue.register({ email, password, first_name, last_name })
                 navigation.navigate("otp")
    }}/>

</View>

<FocusAwareStatusBar style="auto"/>

</SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        backgroundColor: '#f1f4fa',
        width: '100%',
        height: Dimensions.get('screen').height,
    },

    header:{
        flex:0.8,
        alignItems: 'center',
        marginTop:'20%',
    },

    content:{
        flex:2,
        marginHorizontal:20,
        alignItems: 'center',
    },

    footer:{
        flex:1,
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
        backgroundColor: '#ffffff',
    },
});

export default registerScreen;