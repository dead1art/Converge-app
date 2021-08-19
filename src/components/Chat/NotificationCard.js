import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Button, Avatar} from "react-native-elements"
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/colors';

const NotificationCard = ({cardData}) => {

    const { id, event_image, msg, created_at  } = cardData;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

    const d = new Date(created_at)
    const month = monthNames[d.getMonth()]
    const date = d.getDate()

    // const day = date.getDay()
    // const month = date.getMonth()
    // const year = date.getYear()
    
    // const today = new Date()
    // const todayDay = today.getDay()
    // const todayMonth = today.getMonth()
    // const todayYear = today.getYear()

    // if(day === todayDay && month === todayMonth && year === todayYear)
    // {
    //     setDate("Today")
    // }


    // console.log(d1)

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

            <View style={{flexDirection:'column'}}>
                <Text style={{marginTop:1,fontWeight:'500',width:250,marginHorizontal:10}}>{msg}</Text>
                {/* <Text style={{color: theme.gray}}>Sends an invite</Text> */}
            </View>  

            <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight:'bold', fontSize: 16, color:theme.black }}>{date}</Text>
                <Text style={{color:theme.gray}}>{month}</Text>    
            </View>                     

        </View>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
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
