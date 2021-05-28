import React, { useState} from 'react';
import { Dimensions } from 'react-native';
import { View,Text, StyleSheet, Modal, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Avatar } from "react-native-elements"
import {  Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

function Event({eventdata, press}) {
    const { id, title, image, addr, event_date, dateMonth } = eventdata;

    return(
        <SafeAreaView style={styles.container}>

            <TouchableOpacity
            onPress={press}
            >

            <ImageBackground
            borderRadius={20}
            blurRadius={0.5}
            resizeMode="cover"
            style={styles.image}
            source={{uri : image}}
            >

                    <View style={styles.content__details}>
                        <Text style={[styles.content__name,{color: 'white',
                         fontWeight: 'bold'
                        }]}>{title}</Text> 
                        <Text style={[styles.content__location,{color: 'white'}]}>{addr}</Text>
                    </View>

                    <View style={styles.content__date}>
                        <Text style={{
                            fontSize:18,
                            fontWeight: 'bold',
                        }}>{event_date}</Text>
                        <Text style={{
                            fontSize:18,
                        }}>{dateMonth} </Text>
                    </View>

            </ImageBackground>
        
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    
    image:{
        margin: 10,
        width: 300,
        height: 280,
        alignItems: 'center',
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
        position: 'absolute',
        top: 200,
        left: 20,
    },

    content__name:{
        fontSize: 30,
    },

    content__date:{
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal:10,
        borderRadius:10,
        position: 'absolute',
        top: 20,
        right:20,
        backgroundColor: 'white',
    },

})

export default Event;