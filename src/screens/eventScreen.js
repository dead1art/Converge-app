import React from 'react'
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, ImageBackground} from 'react-native'
import { Button } from 'react-native-elements'
import { FocusAwareStatusBar } from '../components/statusbar'
import { MaterialIcons } from "@expo/vector-icons"

const eventScreen = ({route, navigation}) => {

    const {id,title,addr,image,event_date} = route.params.item;

    console.log(route.params.item)


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <ImageBackground style={styles.image} source={{uri: image}} >
                <Button
                type="clear"
                containerStyle={{
                    position:'absolute',
                    left:30,
                    top:50,
                    backgroundColor:'white',
                    borderRadius: 10,
                }}
                icon={
                    <MaterialIcons
                    name="arrow-back"
                    size={28}
                    />
                }
                onPress={() => navigation.goBack()} />
                </ImageBackground>
            </View>

            <View style={styles.content}>
                

                <Text style={styles.event__name}> {title} </Text>
                
                <View style={styles.event__date}>
                    <MaterialIcons
                    name="calendar-today"
                    size={26}
                    color='gray'
                    />
                    <Text> {event_date} </Text>   
                </View>

                <View style={styles.event__place}>
                    <MaterialIcons
                    name="location-pin"
                    size={26}
                    color='gray'
                    />
                    <Text> {addr} </Text>   
                </View>        
          
            </View>


        <FocusAwareStatusBar style="auto"/>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height: Dimensions.get('screen').height,
        width: '100%',
        backgroundColor: '#Eff7fc',
        alignItems: 'center',
    },

    header:{
        flex:1,
        width:'100%',
        height:'100%',
        justifyContent:'flex-start',
        flexDirection:'row',
    },

    content:{
        flex:1,
        width: '100%',
        backgroundColor: 'white',
    },
    
    image:{
        height:'100%',
        width:'100%',
    },
    
    
    event__name:{
        fontSize: 34,
        fontWeight:'bold',
        padding:10,
    },
    
    event__date:{
        flexDirection:'row',
        paddingHorizontal: 20,
        paddingVertical:10,
    },

    event__place:{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical:10,
    },
})

export default eventScreen

 


