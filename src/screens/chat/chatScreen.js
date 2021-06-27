import React from 'react'
import { Dimensions } from 'react-native'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import data from "../../../assets/chatroom"
import { FocusAwareStatusBar } from '../../components/statusbar'
import { MaterialIcons } from "@expo/vector-icons"
import { Button } from 'react-native-elements'
import { theme } from '../../constants/colors'
import ChatRoom from '../../components/Chat/ChatRoom'

const chatScreen = () => {
    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.headerTitle}> Chats </Text>

                <View style={styles.button}>

                <Button
                type="clear"
                containerStyle={styles.bellContainer}
                style={styles.search}
                icon={
                    <MaterialIcons
                    name="notifications"
                    size={30}
                    color={theme.blue}
                    />
                }
                />

                <Button
                type="clear"
                containerStyle={styles.searchContainer}
                style={styles.search}
                icon={
                    <MaterialIcons
                    name="search"
                    size={30}
                    color={theme.blue}
                    />
                }
                />

                </View>

            </View>

            <View style={styles.section}>

                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <ChatRoom chatData={item} />
                    )}
                />

            </View>

            <FocusAwareStatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        height: Dimensions.get('screen').height,
    },

    header:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        width: '100%',
        paddingHorizontal:10,
        backgroundColor: theme.white,
        elevation:10,
    },

    section:{
        flex:5,
        width:'100%',
    },

    headerTitle:{
        color: theme.back,
        marginTop:70,
        fontSize:36,
        fontWeight:'bold',
    },

    button:{
        marginTop:75,
        flexDirection:'row',
        marginRight:10,
    },

    bellContainer:{     
        marginRight:10,
        borderRadius:10,
    },

    searchContainer:{     
        borderRadius:10,
    }


})

export default chatScreen
