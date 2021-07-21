import React from 'react'
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import {theme} from '../../constants/colors'
import { Avatar } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';

function Feed({info, profileNavigate}) {
    const {user_image, name, caption, image} = info;

    const noImage = "https://nursing.matoshri.edu.in/assets/images/no-image-faculty.png"
    
    return(


        <View style={styles.feed}>

            <ImageBackground
            borderRadius={20}
            style={{width:'100%', height: '100%'}}
            source={{uri : image}}
            >
            <LinearGradient locations={[0, 1.0]}  colors= 
                    {['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.80)']} 
                    style={styles.linearGradient}>
            </LinearGradient>

            <View style={styles.content}>

            {/* Avatar */}
                <Avatar
                    avatarStyle={{ borderRadius: 30 }}
                    size={38}
                    source={{
                        uri: 
                            user_image ? user_image : noImage,
                    }}
                    onPress={profileNavigate}
                />

                <View style={styles.details}>

                    <Text style={styles.name}>{name}</Text>      

                    <Text style={styles.caption}>{caption}</Text>

                </View>

            </View>


            </ImageBackground>

        </View>


    )
}


const styles= StyleSheet.create({
    feed:{
        flex:1,
        width:'100%',
        height:400,
        borderBottomWidth:1,
        borderRadius:20,
        borderColor: theme.lightaccent,
        backgroundColor: theme.white,
        marginBottom:10,     
        // paddingVertical:10,
    },

    content:{
        position:'absolute',
        bottom:'10%',
        left:'5%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    details:{
        flexDirection: 'column',
        marginLeft:10,
    },

    name:{
        marginTop:5,
        fontSize: 16,
        fontWeight:'bold',
        color: theme.white,
    },

    caption:{
        fontSize: 14,
        marginTop:5,
        color: 'rgba(255,255,255,0.8)',
    },

    image:{
        marginHorizontal:10,
        borderRadius:20,
        height: 100,
    },
    event: {
        marginTop: 10,
        color: 'gray',
    },
    linearGradient:{
        position:'absolute',
        width:'100%',
        height:'100%',
        borderRadius:20,
    },
})

export default Feed;