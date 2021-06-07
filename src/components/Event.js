import React, { useState} from 'react';
import { Dimensions } from 'react-native';
import { View,Text, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';
import { Button, Avatar } from "react-native-elements"
import {  Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';

function Event({eventdata, press}) {
    const { id, title, image, addr, event_date, dateMonth } = eventdata;

    return(
            <TouchableOpacity
            onPress={press}
            style={styles.container}
            >

                    <ImageBackground
                    borderRadius={20}
                    style={styles.image}
                    source={{uri : image}}
                    >
               

                    <View style={styles.content__details}>
                        <Text style={styles.content__name}>{title}</Text> 
                        <Text style={styles.content__location}>{addr}</Text>
                        <Text style={{ fontSize:14,  color:'gray',}}>{event_date}</Text>
                    </View>

                    </ImageBackground>
        
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        height:280,
        marginHorizontal:10,
        marginVertical:10,
        backgroundColor: 'white',
        borderColor: '#eff7fc',
        borderRadius: 20,
    },
    
    image:{
        width: '100%',
        height: '100%',
    },

    // content:{
    //     backgroundColor: 'white',
    //     width: '88%',
    //     height: '30%',
    //     marginTop: '60%',
    //     borderRadius: 10,
    //     paddingVertical: 10,
    //     paddingHorizontal:15,
    //     flexDirection:'row',
    //     justifyContent: 'space-between',
    // },

    content__details:{
        paddingLeft:20,
        color: 'white',
        marginTop:'50%',
        paddingTop: 10,
        // marginHorizontal:10,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        height: 94,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        textAlign: 'justify',
    },

    content__name:{
        fontWeight:'bold',
        fontSize: 20,
        color:'white',
    },

    content__location:{
        color: 'gray',
    },
})

export default Event;