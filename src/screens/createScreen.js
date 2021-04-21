import React from 'react'
import { View, Text } from 'react-native'
import { FocusAwareStatusBar } from '../components/statusbar'

const createScreen = () => {
    return (
        <View>
            <Text></Text>
            <FocusAwareStatusBar style="auto" />
        </View>
    )
}

export default createScreen
