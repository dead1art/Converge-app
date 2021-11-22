import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

const forgotPassword = ({navigation}) => {
    return (
        <WebView
            // ref={(ref) => (this.webview = ref)}
            source={{ uri: 'https://converge-project.herokuapp.com/accounts/password_reset/' }}
            // onNavigationStateChange={handleWebViewNavigationStateChange}
        />
    )
}

export default forgotPassword
