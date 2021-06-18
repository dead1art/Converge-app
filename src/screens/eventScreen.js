import React from 'react'
import { Dimensions } from 'react-native';
import { View, SafeAreaView, Text, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { FocusAwareStatusBar } from '../components/statusbar'
import { MaterialIcons } from "@expo/vector-icons"
import { theme } from '../constants/colors'
import { ScrollView } from 'react-native-gesture-handler';

const eventScreen = ({ route, navigation }) => {

    const { id, title, addr, image, event_date, desc, max_attendees } = route.params.item;

    console.log(route.params.item)

    const monthNames = ["January", "February", "March", "April", "May", "June",
                           "July", "August", "September", "October", "November", "December"
                        ];

    const d = event_date

    

    return (
        <SafeAreaView style={styles.container}>

        <ScrollView>

            <View style={styles.header}>

                    <Image 
                        style={styles.image} 
                        source={{ uri: image }} 
                    />

                    <Button
                        type="clear"
                        containerStyle={{
                            position: 'absolute',
                            left: 30,
                            top: 50,
                            backgroundColor: 'rgba(255,255,255,0.75)',
                            borderRadius: 10,
                        }}
                        icon={
                            <MaterialIcons
                                name="arrow-back"
                                size={28}
                                color={'black'}
                            />
                        }
                        onPress={() => navigation.goBack()} />
  
            </View>

            <View style={styles.content}>


                <Text style={styles.event__name}> {title} </Text>

                <View style={styles.event__date}>
                    <Button
                        type="clear"
                        containerStyle={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                        }}
                        icon={
                            <MaterialIcons
                                name="calendar-today"
                                size={26}
                                color={theme.blue}
                            />
                        }
                    />
                    <Text style={styles.event__dateTitle}> {event_date} </Text>
                </View>

                <View style={styles.event__place}>
                    <Button
                        type="clear"
                        containerStyle={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                        }}
                        icon={
                            <MaterialIcons
                                name="location-pin"
                                size={26}
                                color={theme.blue}
                            />
                        }
                    />
                    <Text style={styles.event__placeTitle}> {addr} </Text>
                </View>

                <View style={styles.event__attendees}>                    
                    <Button
                        type="clear"
                        containerStyle={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                        }}
                        icon={
                            <MaterialIcons
                                name="person"
                                size={26}
                                color={theme.blue}
                            />
                        }
                    />
                    <Text style={styles.event__placeTitle}> Max Members: {max_attendees} </Text>                        
                </View>

                <Text style={styles.description}>{desc}</Text>

            </View>

            </ScrollView>

            <Button
                type="clear"
                containerStyle={{
                    position: 'absolute',
                    left: '10%',
                    right: '10%',
                    width: '80%',
                    bottom: 20,
                    backgroundColor: theme.black,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                }}
                title="Join Event"
                titleStyle={{ color: 'white' }}
            />

            <FocusAwareStatusBar style="auto" />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('screen').height,
        backgroundColor: 'white',
    },

    header: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    content: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },

    image: {
        height: 300,
        width: '100%',
    },

    event__name: {
        fontSize: 34,
        fontWeight: 'bold',
        padding: 10,
        marginVertical:10,
    },

    event__date: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    event__place: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    event__attendees: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    event__dateTitle: {
        marginLeft: 20,
        fontSize:15,
    },

    event__placeTitle: {
        marginLeft: 20,
        fontSize:15,
    },

    description:{
        padding:20,
        marginTop: 10,
        // backgroundColor: 'gray',
    },
})

export default eventScreen




