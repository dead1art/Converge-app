import React, { useState} from 'react';
import { Dimensions } from 'react-native';
import { View,Text, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';
import { Button, Avatar } from "react-native-elements"
import {  Ionicons, MaterialIcons } from '@expo/vector-icons';

function Event({eventdata, press}) {
    const { id, title, image, addr, event_date, dateMonth } = eventdata;

    return(
            <TouchableOpacity
            onPress={press}
            style={styles.container}
            >

                    <Image
                    style={styles.image}
                    source={{uri : image}}
                    />
               

                    <View style={styles.content__details}>
                        <Text style={styles.content__name}>{title}</Text> 
                        <Text style={styles.content__location}>{addr}</Text>
                        <Text style={{ fontSize:14,  color:'gray',}}>{event_date}</Text>
                    </View>
        
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#f1f4fa',
        borderRadius:10,
        marginBottom:10,
    },
    
    image:{
        width: 100,
        height: 100,
        borderRadius: 20,
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
        marginTop:10,
        marginLeft:10,
        textAlign: 'justify',
    },

    content__name:{
        fontWeight:'bold',
        fontSize: 20,
        color:'black',
    },

    content__location:{
        color: 'gray',
    },
})

export default Event;