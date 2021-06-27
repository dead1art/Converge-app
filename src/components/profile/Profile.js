import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, Modal, Image, useWindowDimensions } from 'react-native';
import { Button, Avatar } from "react-native-elements"
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/colors'
import { TabView, SceneMap } from 'react-native-tab-view';

// TabView

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
    <Text> Hello </Text>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }}>
    <Text> Hello World! </Text>
  </View>
);

function Profile({ signout, data, nav }) {

  const { first_name, last_name, image, bio, dob, email, tags } = data;

  return (
    <View style={styles.container}>

      {/* Profile Photo */}

      <View style={styles.header}>
        {/* <Text style={styles.header__profile}> Profile </Text> */}

        <Avatar
          rounded
          size={150}
          source={{
            uri:
              image == "null" ? "https://images.unsplash.com/photo-1618085220188-b4f210d22703?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8dG93SlpGc2twR2d8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" : image,
          }}
        />
        <Text style={styles.name}> {first_name} {last_name} </Text>
        <Text style={bio == "null" ? styles.nobio : styles.bio}> {bio ? bio : "Edit Your Bio"} </Text>

        <View style={{ flexDirection: 'row' }}>

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
              backgroundColor: theme.lightaccent,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            title="Sign Out"
            onPress={signout}
          />

        </View>
      </View>


      {/* Content */}

      <View style={styles.content}>

        <View style={styles.info}>
          <Text style={{fontWeight:'bold'}}> {dob} </Text>
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

        <View style={styles.interests}>

          <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 24, }}>Interests</Text>
          
          {/* <View style={styles.tagsView}>

          {tags.map((item, index) => (
            <Text key={index} style={styles.tags}>{item}</Text>
            ))} 

          </View> */}

        </View>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    height: Dimensions.get('screen').height,
  },

  header: {
    flex: 2,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingTop: 60,
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderColor: theme.lightaccent,
  },

  content: {
    width: '100%',
    flex: 2,
    borderRadius:20,
    alignItems: 'center',
    paddingHorizontal:20,
  },

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
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
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
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: theme.lightaccent,
    borderRadius: 20,
    alignItems:'center',
    width: '100%',
    padding: 20,
    marginBottom:10,
  },

  interests:{
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