import React from 'react'
import { Dimensions } from 'react-native';
import { View, SafeAreaView, Text, StyleSheet, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import { FocusAwareStatusBar } from '../components/statusbar'
import { MaterialIcons } from "@expo/vector-icons"
import { theme } from '../constants/colors'
import { ScrollView } from 'react-native-gesture-handler';

const eventScreen = ({ route, navigation }) => {

    const { id, title, addr, image, event_date } = route.params.item;

    console.log(route.params.item)


    return (
        <SafeAreaView style={styles.container}>


            <View style={styles.header}>
                <ImageBackground style={styles.image} source={{ uri: image }} >
                    <Button
                        type="clear"
                        containerStyle={{
                            position: 'absolute',
                            left: 30,
                            top: 50,
                            backgroundColor: 'white',
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
                </ImageBackground>
            </View>

            <View style={styles.content}>


                <Text style={styles.event__name}> {title} </Text>

                <View style={styles.event__date}>
                    <Button
                        type="clear"
                        containerStyle={{
                            backgroundColor: theme.lightblue,
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
                            backgroundColor: theme.lightblue,
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

                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, incidunt tenetur, reiciendis dolor repudiandae necessitatibus illum consequatur quisquam modi aliquid esse odit culpa provident! Voluptas cum dolores sunt facilis! Cupiditate.
                Ut consectetur voluptates ducimus officia eveniet cumque? Cum rerum excepturi culpa suscipit ut recusandae unde praesentium tempora ex tenetur sint dolorem cumque perspiciatis commodi iusto minima in, reprehenderit facere. Doloribus.</Text>

            </View>


            <Button
                type="clear"
                containerStyle={{
                    position: 'absolute',
                    left: '10%',
                    right: '10%',
                    width: '80%',
                    bottom: 30,
                    backgroundColor: theme.blue,
                    borderRadius: 30,
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
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },

    content: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },

    image: {
        height: '100%',
        width: '100%',
    },


    event__name: {
        fontSize: 34,
        fontWeight: 'bold',
        padding: 10,
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

    event__dateTitle: {
        marginLeft: 20,
    },

    event__placeTitle: {
        marginLeft: 20,
    },
})

export default eventScreen




