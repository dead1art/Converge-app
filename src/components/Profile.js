import React, { useState} from 'react';
import { Dimensions } from 'react-native';
import { View,Text, StyleSheet, Modal, Image} from 'react-native';
import { Button, Avatar } from "react-native-elements"
import {  Ionicons, MaterialIcons } from '@expo/vector-icons';

function Profile({signout, data, nav}) {

  const { first_name, last_name, profile_picture, bio, dob, email } = data;

  return(
    <View style={styles.container}>

    {/* Profile Photo */}

    <View style={styles.header}>
        {/* <Text style={styles.header__profile}> Profile </Text> */}

    <Avatar
  rounded
  size={150}
  source={{
    uri:
      profile_picture=="null" ? "https://images.unsplash.com/photo-1618085220188-b4f210d22703?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8dG93SlpGc2twR2d8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" : profile_picture,
  }}
/>
        <Text style={styles.name}> {first_name} {last_name} </Text> 
      <Text style={bio=="null" ? styles.nobio : styles.bio}> {bio ? bio : "Edit Your Bio"} </Text>
    <Button 
            icon={
                <Ionicons
                name="pencil-sharp"
                size={24}
                />
            }
            titleStyle={{color: "black"}}
            type="outline"
            containerStyle={{
                            marginTop: 20,
                            borderRadius: 20,
            }}
            buttonStyle={{ 
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 20,
                paddingHorizontal: 20,}}
                title="Edit Profile" 
                onPress={nav}
                />
        </View>


    {/* Content */}

    <View style={styles.content}>

            <View style={styles.info}>  
                <Text> Date Of Birth </Text>
                <Text> {dob} </Text>
            </View>
            <View style={styles.info}>
                <Text> Email </Text>
                <Text> {email} </Text> 
            </View>          


    {/* SignOut Button */}

      <Button 
            icon={
                <Ionicons
                name="exit"
                size={24}
                />
            }
            titleStyle={{color: "black"}}
            type="outline"
            containerStyle={{
                            marginTop: 20,
                            borderRadius: 20,
            }}
            buttonStyle={{ 
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 20,
                paddingHorizontal: 20,}}
                title="Sign Out" 
                onPress={signout}
                />

    </View>

</View>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: Dimensions.get('screen').height,
    },

    header: {
        flex: 2,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        paddingTop:60,
        backgroundColor: 'white',
        paddingBottom: 60,
    },
    
    content: {
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 40,
        flex: 2,
        padding: 20,
        alignItems: 'center',
    },

    header__profile: {
        position: 'absolute',
        color:'#2663FF',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },

    image: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        height: '100%',
    },

    name :{
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        color:'black',
        fontSize: 30,
        fontWeight: 'bold',
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
        backgroundColor: 'white',
        borderRadius: 30,
        width: '100%',
        paddingVertical: 10,
    },

})

export default Profile;