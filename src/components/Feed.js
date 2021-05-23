import React from 'react'
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';

function Feed(props) {
    const {id, avatar, name, caption, img, event} = props.info;
    
    return(


        <View style={styles.feed}>

            <View style={styles.details}> 

            <Image source={{ uri : avatar}}
                   style={styles.avatar}
                   />

            <Text style={styles.name}>{name}</Text>

            </View>


            <View style={styles.content}>
            
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
        borderBottomWidth:1,
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        borderColor: '#ecf1f5',
        marginVertical:10,
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    details:{
        flexDirection: 'row',
    },
    name:{
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 3,
        marginLeft: 15,
    },
    content:{
        marginTop: 10,
        paddingVertical: 10,
    },
    caption:{
        width: '100%',
        color: 'black',
        marginBottom: 10,
    },
    image:{
        width: 280,
        height: 180,
        borderRadius: 5,
        marginVertical: 10,
    },
    event: {
        marginTop: 10,
        color: 'gray',
    },
})

export default Feed;