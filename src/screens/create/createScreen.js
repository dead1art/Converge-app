import React from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements';
import { FocusAwareStatusBar } from '../../components/statusbar'

const createScreen = ({navigation}) => {

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                    <Button 
                    title="Create An Event"
                    type="clear"
                    titleStyle={{color:'black', fontWeight: 'bold',}}
                    buttonStyle={{
                        marginTop: '50%',
                        alignSelf: 'center',
                        backgroundColor: '#E5E8EE',
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
                    titleStyle={{color:'black', fontWeight: 'bold',}}
                    buttonStyle={{
                        marginTop: '40%',
                        alignSelf: 'center',
                        backgroundColor: '#E5E8EE',
                        width: '60%',
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
        marginBottom: 50,
    },

    header:{
        flex:1,
        width: '90%',
        marginBottom: 20,
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    footer:{
        flex:1,
        backgroundColor: 'white',
        borderRadius: 30,
        width: '90%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    image:{
        width:'100%',
        height:'100%',
    },
})

export default createScreen
