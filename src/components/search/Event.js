import React, { useState} from 'react';
import { Dimensions } from 'react-native';
import { View,Text, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';
import { Button, Avatar } from "react-native-elements"
import {  Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { theme } from '../../constants/colors';

function Event({eventdata, press}) {
    
    const { id, title, image, addr, event_date } = eventdata;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

    const d = new Date(event_date)
    const month = monthNames[d.getMonth()]
    const date = d.getDate()

    // console.log(dateString)

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

                        <View style={styles.content__date}>
                            <Text style={{fontWeight:'bold', fontSize: 16, }}>{date}</Text>
                            <Text style={{color:theme.gray}}>{month}</Text>
                        </View>

                    </ImageBackground>
               

                    <View style={styles.content__details}>
                        <Text style={styles.content__name}>{title}</Text> 
                        <Text style={styles.content__location}>{addr}</Text>
                    </View>

        
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:300,
        marginHorizontal:10,
        marginVertical:10,
        backgroundColor: theme.white,
        borderColor: '#eff7fc',
        borderRadius:20,
    },
    
    image:{
        flex:3,
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
        flex:2,
        paddingLeft:10,
        paddingTop: 10,
        // marginHorizontal:10,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        textAlign: 'justify',
    },

    content__name:{
        flex:0.5,
        fontWeight:'bold',
        fontSize: 20,
        color:'black',
    },

    content__location:{
        flex:1,
        justifyContent: 'center',
        color: 'gray',
        maxWidth:'100%',
    },

    content__date:{
        position: 'absolute',
        alignItems: 'center',
        right:10,
        top:10,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:10,
        backgroundColor:theme.white,
        fontSize:14,
        color:'gray',
    }
})

export default Event;