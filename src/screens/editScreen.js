import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const editScreen = ({navigation, route}) => {
    console.log(route.params);
    const bio = route.params;

    // console.log(bio);

    return (
        <View>
            <MaterialIcons
            name="close"
            size={24}
            style={{
                position: 'absolute',
                top:20,
                right:20,
            }}
            onPress={() => navigation.goBack()}
            />
            <Text> Edit Screen </Text>
            <Text> {bio.userInfo.bio} </Text>
            <Image
                    source={{uri:bio.userInfo.profile_picture}}
                    style={{
                        width: '100%',
                        height: '100%',}
                    }
                    />
        </View>
    )
}

export default editScreen
