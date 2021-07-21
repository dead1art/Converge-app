import React from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements';
import { FocusAwareStatusBar } from '../../components/statusbar'
import { MaterialIcons } from "@expo/vector-icons"
import { theme } from '../../constants/colors';

const createScreen = ({navigation}) => {

    const imageUrl = "https://images.unsplash.com/photo-1592388748465-8c4dca8dd703?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsbGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"  

    return(
        <View behavior="padding" style={styles.container}> 

        <View style={styles.header}>
                <ImageBackground
                    source={require('../../../assets/images/createBackground.jpg')}
                    // source={{uri: imageUrl}}
                    style={{width: '100%', height: '100%'}}
                >

                </ImageBackground>

            </View>

        <View style={styles.content}>

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
        containerStyle={{
            marginTop:20,
            alignSelf:'center',
            backgroundColor: theme.black,
            width:'60%',
            padding:10,
            borderRadius: 20,
        }}
        onPress={() => navigation.navigate('createEvent')}
    />       

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
        containerStyle={{
            marginTop:20,
            alignSelf: 'center',
            backgroundColor: theme.black,
            width:'60%',
            padding:10,
            borderRadius: 20,
        }}
        onPress={() => navigation.navigate('createPost')}
    />      
        
        </View>    

        <FocusAwareStatusBar style="light"/>

        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        display:'flex',
        width: '100%',
        height: Dimensions.get('screen').height,
        backgroundColor:theme.white,
    },

    header: {
        flex:2,
    },

    content:{
        flex: 1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor: theme.white,
        paddingTop:10,
        marginTop:-20,
    },

    title:{
        color:theme.gray, 
        marginLeft:20, 
        marginVertical:20,
    },

    input: {
        paddingHorizontal: 5,
        color: 'black',
        fontSize:16,
    },

})

export default createScreen;
