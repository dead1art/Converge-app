import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const editScreen = ({navigation}) => {

    return (
        <View>
            {/* <Text> {data.bio} </Text> */}
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
        </View>
    )
}

export default editScreen
