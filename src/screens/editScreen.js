
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FocusAwareStatusBar } from '../components/statusbar'
import { Input, Avatar, Button } from "react-native-elements"
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
 
const editScreen = ({route, navigation}) => {


    // Image Picker

    const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [editScreen]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

    // Image Picker

    const {userInfo} = route.params;

    const [picture, setPicture] = useState(userInfo.profile_picture)
    const [fname, setFname] = useState(userInfo.first_name)
    const [lname, setLname] = useState(userInfo.last_name)
    const [bio, setBio] = useState(userInfo.bio)
    const [dob, setDob] = useState(userInfo.dob)
    const [email, setEmail] = useState(userInfo.email)

    {image && console.log(image)}

    return (
        
        <SafeAreaView style={styles.container}>


        <ScrollView>

    <View style={styles.content}>


        <Text style={styles.header__profile}> Edit Profile </Text>


        <Avatar
        rounded
        size={150}
        source={{
            uri:
            picture=="null" ? "https://images.unsplash.com/photo-1618085220188-b4f210d22703?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8dG93SlpGc2twR2d8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" : picture,
        }}
        />

    <Button 
            titleStyle={{color: "white"}}
            buttonStyle={{ 
                backgroundColor: '#2663FF',
                marginTop: 40,
                marginBottom: 20,
                borderRadius: 20,
                paddingHorizontal: 20,}}
                title='Update Picture'
                onPress={pickImage}
                />
                
            <View style={styles.info}>
                <Text> First Name </Text>  
                <Input 
                inputContainerStyle={{ 
                    marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: 'white',
                    borderRadius:20,
                    height: 50,
                }}
                style={styles.input}
                value={fname} 
                onChangeText={setFname} /> 
            </View>

            <View style={styles.info}>
                <Text> Last Name </Text>  
                <Input 
                inputContainerStyle={{ 
                    marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: 'white',
                    borderRadius:20,
                    height: 50,
                }}
                style={styles.input}
                value={lname} 
                onChangeText={setLname} /> 
            </View>

            <View style={styles.info}> 
                 <Text> Bio </Text>
                <Input 
                textAlign="left"
                inputContainerStyle={{ 
                    marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: 'white',
                    borderRadius:20,
                    height: 50,
                }}
                style={styles.input}
                value={bio} 
                onChangeText={setBio} />
            </View>
            
            <View style={styles.info}> 
                <Text> Date Of Birth </Text>
                <Input 
                inputContainerStyle={{ 
                    marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: 'white',
                    borderRadius:20,
                    height: 50,
                }}
                style={styles.input}
                value={dob} 
                onChangeText={setDob} />
            </View>
            
            <View style={styles.info}>
                <Text> Email </Text>
                <Input
                disabled
                inputContainerStyle={{ 
                    marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: 'white',
                    borderRadius:20,
                    height: 50,
                }}
                style={styles.input}
                value={email} 
                onChangeText={setEmail} />
            </View>          

    


    {/* SignOut Button */}

      <Button 
            titleStyle={{
                color: 'white',
            }}
            buttonStyle={{
                backgroundColor: '#2663FF',
                marginTop: 30,
                borderRadius: 20,
                paddingHorizontal: 20,}}
                title="Save Changes" 
                />

    </View>


const editScreen = ({navigation, route}) => {
    console.log(route.params);
    const bio = route.params;

    // console.log(bio);

    return (
        <View>
            <MaterialIcons
            name="arrow-back"
            size={24}
            style={{
                position: 'absolute',
                top:50,
                left:20,
            }}
            onPress={() => navigation.goBack()}
            />

            
            <FocusAwareStatusBar style="auto" />

            </ScrollView>
           
    </SafeAreaView>


            <Text> Edit Screen </Text>
            <Text> {bio.userInfo.bio} </Text>
            <Image
                    source={{uri:bio.userInfo.profile_picture}}
                    style={{
                        width: '100%',
                        height: '100%',}
                    }
                    />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#E5E8EE',
        height: Dimensions.get('screen').height,
    },
    
    content: {
        width: '100%',
        borderRadius: 40,
        marginTop: 20,
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },

    header__profile: {
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },


    bio: {
        color: 'gray',
        marginTop: 10,
        marginBottom: 10,
    },

    nobio: {
        color: 'gray',
        marginVertical: 10,
    },

    info: {
        borderRadius: 30,
        width: '100%',
        paddingVertical: 10,
    },

    input: {
        borderRadius:30,
        paddingHorizontal: 20,
        color: 'black',
        backgroundColor: 'white',
    },

})

export default editScreen
