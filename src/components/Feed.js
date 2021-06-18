import React from 'react'
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';
import {theme} from '../constants/colors'

function Feed(props) {
    const {id, avatar, name, caption, img, event} = props.info;
    
    return(


        <View style={styles.feed}>

            <View style={styles.details}> 

            <Image source={{ uri : avatar}}
                   style={styles.avatar}
                   />


            </View>

            <View style={styles.content}>

            <Text style={styles.name}>{name}</Text>
            
            <Text style={styles.caption}>{caption}</Text>

            {img!=null && <Image source={{ uri : img}}
                   style={styles.image}
                   /> }
            <Text style={styles.event}> #{event} </Text>
            
            </View>

        

        </View>


    )
}


const styles= StyleSheet.create({
    feed:{
        padding: 20,
        borderTopWidth:1,
        borderColor: theme.lightaccent,
        backgroundColor: theme.white,
        flexDirection:'row',
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    details:{
        flexDirection: 'row',
    },
    content:{
        marginHorizontal:10,
        width: '80%',
        height:'100%',
    },

    name:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    caption:{
        flex:1,
        width: '100%',
        color: 'black',
        marginVertical: 5,
    },
    image:{
        width: 280,
        height: 180,
        borderRadius: 15,
        marginVertical: 10,
    },
    event: {
        marginTop: 10,
        color: 'gray',
    },
})

export default Feed;