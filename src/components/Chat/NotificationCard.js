import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Button, Avatar} from "react-native-elements"
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/colors';

const NotificationCard = ({cardData}) => {

    const { id, event_image, msg, created_at  } = cardData;

    console.log(event_image)

    const noImage = "https://nursing.matoshri.edu.in/assets/images/no-image-faculty.png"

    return (
        <View style={styles.container}>

            <Avatar
                rounded
                size={42}
                source={{
                    uri:
                    event_image ? event_image : noImage,
                }}
                />

            <View style={{flexDirection:'column',marginLeft:10}}>
                <Text style={{marginTop:1,fontWeight:'bold'}}>{msg}</Text>
                {/* <Text style={{color: theme.gray}}>Sends an invite</Text> */}
            </View>                       

        </View>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'90%',
        paddingVertical:20,
        paddingHorizontal:20,
        borderRadius:20,
        backgroundColor:theme.white,
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:theme.lightaccent,
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:5,
    },
})
