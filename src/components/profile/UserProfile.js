import React, { useState} from 'react';
import { Dimensions } from 'react-native';
import { View,Text, StyleSheet, Modal, Image, SafeAreaView, ScrollView} from 'react-native';
import { Button, Avatar } from "react-native-elements"
import {  Ionicons, MaterialIcons } from '@expo/vector-icons';
import {theme} from '../../constants/colors'
import HostedEvent from './HostedEvent'

function UserProfile({ data, back }) {

  const { first_name, last_name, image, bio, dob, tags, hosted_events } = data;

  const noImage = "https://nursing.matoshri.edu.in/assets/images/no-image-faculty.png"


  return(
    <SafeAreaView style={styles.container}>

    <ScrollView>

    <View style={styles.header}>
        {/* <Text style={styles.header__UserProfile}> UserProfile </Text> */}
    <Button
            type="clear"
            containerStyle={{
                position: 'absolute',
                left: 30,
                top: 30,
                borderRadius: 10,
            }}
            icon={
                <MaterialIcons
                    name="arrow-back"
                    size={28}
                    color={'black'}
                />
            }
            onPress={back} />

    <Avatar
  rounded
  size={150}
  source={{
    uri:
      image ? image : noImage,
  }}
/>
        <Text style={styles.name}> {first_name} {last_name} </Text> 
      <Text style={bio=="null" ? styles.nobio : styles.bio}> {bio ? bio : "Edit Your Bio"} </Text>
    
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

        <View style={styles.interests}>

          <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 24, }}>Interests</Text>
          
          <View style={styles.tagsView}>

          {tags ? tags.map((item, index) => (
            <Text key={index} style={styles.tags}>{item}</Text>
            ))
          : <Text style={{marginVertical:10,marginHorizontal:'25%',color:theme.gray}}>Please add your intrests</Text>
          } 

        </View>

        <View style={styles.hostedEvents}>

          <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 24, }}>Hosted Events</Text>

          <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:10}}>

            {hosted_events && hosted_events.map((item) => (
              <HostedEvent key={item.id} eventdata={item} />
            ))}

          </View>

        </View>

        </View>

      </View>

     </ScrollView>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    height: Dimensions.get('screen').height,
  },

  header: {
    flex: 2,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    paddingTop: 40,
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
    marginBottom:0,
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
    marginVertical:20,
    width:'100%',
  },

  hostedEvents:{
    marginVertical:20,
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

export default UserProfile;