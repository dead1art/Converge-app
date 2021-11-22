import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, Modal, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Button, Avatar } from "react-native-elements"
import HostedEvent from './HostedEvent'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/colors'


function Profile({ signout, data, nav }) {
  
  const { first_name, last_name, image, bio, dob, email, tags, hosted_events, location } = data;
  
  const noImage = "https://nursing.matoshri.edu.in/assets/images/no-image-faculty.png"

  console.log(location)

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>

    

      {/* Profile Photo */}

      <View style={styles.header}>
        {/* <Text style={styles.header__profile}> Profile </Text> */}

        <Avatar
          rounded
          size={150}
          source={{
            uri:
              image ? image : noImage,
          }}
        />
        <Text style={styles.name}> {first_name} {last_name} </Text>
        <Text style={bio ? styles.bio : styles.nobio}>{bio ? bio : "Edit Your Bio"}</Text>

        <View style={{ flexDirection: 'row', marginBottom:10 }}>

          {/* Edit Profile */}

          <Button
            icon={
              <Ionicons
                name="pencil-sharp"
                size={22}
                color={"white"}
              />
            }
            titleStyle={{ marginLeft: 10, color: "white" }}
            type="clear"
            containerStyle={{
              marginTop: 20,
              borderRadius: 10,
              backgroundColor: theme.blue,
              paddingHorizontal: 10,
              marginRight: 10,
            }}
            title="Edit Profile"
            onPress={nav}
          />

          {/* SignOut Button */}
          
          <Button
            icon={
              <Ionicons
                name="exit"
                size={22}
              />
            }
            titleStyle={{ marginLeft: 10, color: "black" }}
            type="clear"
            containerStyle={{
              marginTop: 20,
              backgroundColor: theme.white,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            title="Sign Out"
            onPress={signout}
          />

        </View>


      {/* Content */}

        <View style={styles.info}>
          <Text style={{fontWeight:'bold'}}> {dob ? dob : "Date not provided"} </Text>
          <MaterialIcons
            name="calendar-today"
            size={24}
          />
        </View>
        <View style={styles.info}>
          <Text style={{fontWeight:'bold'}}> {email} </Text>
          <MaterialIcons
            name="email"
            size={24}
            />
        </View>

        </View>
        {/* <View style={styles.interests}>

          <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 24, }}>Interests</Text>
          
          <View style={styles.tagsView}>

          {tags ? tags.map((item, index) => (
            <Text key={index} style={styles.tags}>{item}</Text>
            ))
          : <Text style={{marginVertical:10,marginHorizontal:'25%',color:theme.gray}}>Please add your intrests</Text>
          } 

        </View>

        </View> */}
        {/* <View style={styles.hostedEvents}>

          <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 24, }}>Hosted Events</Text>

          <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:10}}>

            {hosted_events && hosted_events.map((item) => (
              <HostedEvent key={item.id} eventdata={item} press={() => props.navigate("invite", {item} )} />
            ))}

          </View> 

        </View> */}

     </ScrollView>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  header: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal:20,
    // borderBottomWidth: 1,
    // borderColor: theme.lightaccent,
  },

  // content: {
  //   width: '100%',
  //   flex: 2,
  //   borderRadius:20,
  //   alignItems: 'center',
  //   paddingHorizontal:20,
  // },

  header__profile: {
    position: 'absolute',
    color: '#2663FF',
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

  name: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },

  bio: {
    marginHorizontal:10,
    color: 'gray',
    textAlign:'justify',
    marginVertical: 10,
  },

  nobio: {
    color: 'gray',
    marginVertical: 10,
  },


  info: {
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: theme.lightaccent,
    borderRadius: 20,
    alignItems:'center',
    width: '100%',
    padding: 20,
    marginTop:20,

  },

  interests:{
    marginVertical:10,
    width:'100%',
  },

  hostedEvents:{
    marginVertical:10,
    width:'100%',
  },

  tagsView:{
        marginVertical:10,
        marginHorizontal:0,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

  tags:{
        marginTop:10,
        marginRight:10,
        backgroundColor: theme.lightaccent,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:20,
    },
    
})

export default Profile;