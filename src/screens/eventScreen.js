import React from 'react'
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, Image} from 'react-native'
import { Button } from 'react-native-elements'
import { FocusAwareStatusBar } from '../components/statusbar'
import { MaterialIcons } from "@expo/vector-icons"

const eventScreen = ({route, navigation}) => {

    const {id,name,location,image,date} = route.params.item;

    console.log(route.params.item)


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Button
                type="clear"
                // containerStyle={styles.backIcon}
                icon={
                    <MaterialIcons
                    name="arrow-back"
                    size={30}
                    />
                }
                onPress={() => navigation.goBack()} />
                <Text style={styles.header__name}> {name} </Text>

            </View>

            <View style={styles.content}>
                <Image style={styles.image} source={{uri: image}} />
                <View style={styles.details}>
                    <View style={styles.details__date}>
                        <MaterialIcons
                        name="calendar-today"
                        size={24}
                        color='gray'
                        />
                        <Text> {date} </Text>   
                    </View>

                    <View style={styles.details__place}>
                        <MaterialIcons
                        name="location-pin"
                        size={24}
                        color='gray'
                        />
                        <Text> {location} </Text>   
                    </View>        
                </View>
            </View>

            <View style={styles.footer}>
                <Text>Event Description Goes Here</Text>
                <Text> Event Location goes here</Text>
                
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
        flex:0.3,
        width:'90%',
        justifyContent:'flex-start',
        marginTop:'20%',
        flexDirection:'row',
    },

    content:{
        flex:1,
        width: '80%',
        backgroundColor: 'white',
        borderRadius:30,
        elevation:10,
    },

    footer:{
        flex:1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    
    image:{
        flex:2,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:'100%',
        width:'100%',
    },
    
    details:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:20,
        paddingHorizontal: 20,
    },

    backIcon:{

    },

    header__name:{
        marginLeft: 20,
        marginTop:2,
        fontSize: 30,
    },

})

export default eventScreen

 


