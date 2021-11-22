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
                size={42}
                source={{
                    uri:
                    image ? image : noImage,
                }}
                />

            <View style={{flexDirection:'column',marginLeft:10}}>
                <Text style={{marginTop:1,fontWeight:'bold'}}>{name}</Text>
                <Text style={{color: theme.gray}}>Sends an invite</Text>
            </View>            

            </View>


            <View style={{flexDirection:'row',alignItems:'flex-start'}}>
            <Button
                type="clear"
                icon={
                    <Ionicons
                        name="close-outline"
                        size={32}
                        color={theme.black}
                    />
                }
                onPress={reject}
            />

            <Button
                type="clear"
                icon={
                    <Ionicons
                        name="checkmark-outline"
                        size={32}
                        color={theme.black}
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
        flex:1,
        width:'92%',
        paddingVertical:20,
        paddingHorizontal:20,
        borderRadius:20,
        backgroundColor:theme.white,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:5,
    },
})
