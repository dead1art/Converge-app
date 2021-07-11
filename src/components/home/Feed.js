import React from 'react'
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';
import {theme} from '../../constants/colors'
import { Avatar } from 'react-native-elements'

function Feed({info, profileNavigate}) {
    const {user_image, name, caption, image} = info;
    
    return(


        <View style={styles.feed}>

            <View style={styles.details}> 

            {/* Avatar */}
            <Avatar
                avatarStyle={{ borderRadius: 30 }}
                size={32}
                source={{
                    uri: user_image,
                }}
                onPress={profileNavigate}
            />


            <Text style={styles.name}>{name}</Text>
            
            </View>

            <View style={styles.footer}>

                <Text style={styles.caption}>{caption}</Text>

            </View>
            <View style={styles.content}>

            {image!=null && <Image source={{ uri : image}}
                   style={styles.image}
                   /> }
            {/* <Text style={styles.event}> #{event} </Text> */}
            
            </View>


        

        </View>


    )
}


const styles= StyleSheet.create({
    feed:{
        flex:1,
        width:'100%',
        borderBottomWidth:1,
        borderRadius:20,
        borderColor: theme.lightaccent,
        backgroundColor: theme.white,
        // marginHorizontal:5,
        marginBottom:20,       
    },

    details:{
        flex:1,
        padding:10,
        paddingHorizontal:15,
        flexDirection: 'row',
        alignItems: 'center', 
    },

    content:{
        flex:2,
        width:'100%',
    },

    footer:{
        flex:1,
        paddingVertical:10,
        paddingHorizontal:15,
    },

    name:{
        marginLeft:10,
        fontSize: 14,
    },
    caption:{
        width: '100%',
        color: theme.gray,
    },
    image:{
        width:'100%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        height: 300,
    },
    event: {
        marginTop: 10,
        color: 'gray',
    },
})

export default Feed;