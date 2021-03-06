import React, { useState} from 'react';
import { Dimensions } from 'react-native';
import { View,Text, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';
import { Button, Avatar } from "react-native-elements"
import {  Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { theme } from '../../constants/colors';

function HostedEvent({eventdata, press}) {
    
    const { id, title, image, addr, event_date } = eventdata;

    let d = new Date(event_date)
    let dateString = d.toDateString().slice(4,10); 

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
                    </ImageBackground>
               

                    <View style={styles.content__details}>
                        <Text style={styles.content__name}>{title}</Text> 
                        {/* <Text style={styles.content__location}>{addr}</Text> */}
                        {/* <Text style={styles.content__date}>{dateString}</Text> */}
                    </View>

        
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        height:180,
        width:95,
        marginHorizontal:10,
        marginVertical:10,
        // backgroundColor: theme.white,
        borderColor: '#eff7fc',
        borderRadius: 20,
    },
    
    image:{
        flex:2,
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
        paddingTop: 10,
        paddingLeft:10,
        // marginHorizontal:10,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        height: 60,
        textAlign: 'justify',
    },

    content__name:{
        flex:1,
        fontSize: 16,
        width:'100%',
        color:'black',
    },

    content__location:{
        flex:1,
        justifyContent: 'center',
        color: 'gray',
        maxWidth:150,
    },

    // content__date:{
    //     flex:1,
    //     justifyContent: 'flex-end',
    //     fontSize:14,
    //     color:'gray',
    // }
})

export default HostedEvent;