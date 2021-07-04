import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import {theme} from '../../constants/colors'

function ChatRoom({chatData}) {
    const {id, avatar, name, message, time} = chatData;
    
    return(


        <TouchableOpacity style={styles.chat}>

            <View style={styles.image}>
                <Image source={{ uri : avatar}}
                       style={styles.avatar}
                       />
            </View>

            <View style={styles.content}>

            <Text style={styles.name}>{name}</Text>
            
            <Text style={styles.message}>{message}</Text>

            </View>     
               
            <Text style={styles.time}> {time} </Text>

        </TouchableOpacity>


    )
}


const styles= StyleSheet.create({
    chat:{
        flex:1,
        height: '100%',
        width: '100%',
        flexDirection:'row',
        padding: 20,
        borderBottomWidth:1,
        borderColor: theme.lightaccent,
        backgroundColor: theme.white,
    },

    image:{
        flex:1,
    },

    avatar:{
        width: 50,
        height: 50,
        borderRadius: 30,
    },

    content:{
        flex:4,
        marginLeft:10,
    },

    name:{
        fontSize: 16,
        fontWeight: 'bold',
    },

    message:{
        flex:1,
        width: '100%',
        color: 'gray',
        marginVertical: 5,
    },

    time: {
        flex:1,
        color: 'gray',
        fontSize: 12,
    },
})

export default ChatRoom;