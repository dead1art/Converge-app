import React from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements';
import { FocusAwareStatusBar } from '../../components/statusbar'
import { MaterialIcons } from "@expo/vector-icons"
import { theme } from '../../constants/colors';

const createScreen = ({navigation}) => {

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                        <Button 
                        title="Create An Event"
                        type="clear"
                        icon={
                            <MaterialIcons
                                name="event"
                                color={theme.white}
                                size={28}
                                style={{marginRight:20}}
                            />
                        }
                        titleStyle={{color:theme.white, fontWeight: 'bold',}}
                        buttonStyle={{
                            marginTop: '80%',
                            alignSelf:'center',
                            backgroundColor: theme.blue,
                            width:'60%',
                            padding:20,
                            borderRadius: 20,
                        }}
                        onPress={() => navigation.navigate('createEvent')}
                    />

            </View>

            <View style={styles.footer}>

                        <Button 
                        title="Create A Post"
                        type="clear"
                        icon={
                            <MaterialIcons
                                name="post-add"
                                color={theme.white}
                                size={28}
                                style={{marginRight:20}}
                            />
                        }
                        titleStyle={{color:theme.white, fontWeight: 'bold',}}
                        buttonStyle={{
                            marginTop: '10%',
                            alignSelf: 'center',
                            backgroundColor: theme.blue,
                            width:'60%',
                            padding:20,
                            borderRadius: 20,
                        }}
                        onPress={() => navigation.navigate('createPost')}
                    />

            </View>

            <FocusAwareStatusBar style="auto" />
        </View>
    )
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        alignItems:'center',
        height: Dimensions.get('screen').height,
    },

    header:{
        flex:1,
        width: '100%',
        backgroundColor: 'white',
    },

    footer:{
        flex:1,
        backgroundColor: 'white',
        width: '100%',
    },

    image:{
        width:'100%',
        height:'100%',
    },
})

export default createScreen
