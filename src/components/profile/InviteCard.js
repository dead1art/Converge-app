import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Button, Avatar} from "react-native-elements"
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/colors';

const InviteCard = ({cardData,reject,accept}) => {

    const { image, name } = cardData;

    const noImage = "https://nursing.matoshri.edu.in/assets/images/no-image-faculty.png"

    return (
        <View style={styles.container}>

            <View style={{flexDirection:'row',alignItems:'flex-start'}}>
            <Avatar
                rounded
                size={40}
                source={{
                    uri:
                    image ? image : noImage,
                }}
                />

            <View style={{flexDirection:'column',marginLeft:20,}}>
                <Text style={{marginTop:1,fontWeight:'bold'}}>{name}</Text>
                <Text>wants to join</Text>
            </View>            

            </View>


            <View style={{flexDirection:'row',alignItems:'flex-start'}}>
            <Button
                type="clear"
                icon={
                    <Ionicons
                        name="close-circle-outline"
                        size={32}
                        color={'#ff0000'}
                    />
                }
                onPress={reject}
            />

            <Button
                type="clear"
                icon={
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={32}
                        color={'#008000'}
                    />
                }
                onPress={accept}
            />
            </View>

        </View>
    )
}

export default InviteCard

const styles = StyleSheet.create({
    container:{
        width:'90%',
        marginVertical:10,
        padding:10,
        borderRadius:20,
        backgroundColor:theme.lightaccent,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
})
