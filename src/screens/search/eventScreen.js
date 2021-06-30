import React, { useContext, useState, useEffect } from 'react'
import { Dimensions } from 'react-native';
import { View, SafeAreaView, Text, StyleSheet, Image, FlatList } from 'react-native'
import { Button, Avatar } from 'react-native-elements'
import { FocusAwareStatusBar } from '../../components/statusbar'
import maptheme from '../../../assets/mapTheme'
import Recommended from '../../components/search/Recommended';
import main from '../../api/main'
import { AuthContext } from '../../context/AuthContext';
import { MaterialIcons } from "@expo/vector-icons"
import { theme } from '../../constants/colors'
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const eventScreen = ({ route, navigation }) => {

    const { state: authState } = useContext(AuthContext);

    const { id, title, addr, image, event_date, desc, host_image, host_name, attendees, max_attendees, location, tags } = route.params.item;

    const host = route.params.item

    console.log(host)

    const [recommended, setRecommended] = useState([])
    const [full, setFull] = useState(false)

    if (attendees.length >= max_attendees) {
        setFull(true)
    }


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const d = event_date

    // console.log(host)

    //Recommended

    useEffect(() => {
        const abortController = new AbortController()
        let url = "/api/event/recommended"

        const getRecommended = async () => {
            try {
                // dispatch({ type: "fetch_events_request" })
                const response = await main.get(
                    url,
                    {
                        headers: {
                            'Authorization': `Bearer ${authState.userToken}`
                        },
                        params: {
                            event: id,
                        }
                    })
                setRecommended(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }

        getRecommended()

        return () => {
            abortController.abort()
        }

    }, [host])


    const joinHandler = async (id) => {

        let url = `https://converge-project.herokuapp.com/api/event/join/${id}/`
        console.log(url)
        try {
            console.log(authState.userToken)
            const response = await axios.post(url, null, {
                headers: {
                    'Authorization': bearer,
                }
            })
                .catch(err => {
                    if (err.response.status === 400) {
                        throw new Error(`${JSON.stringify(err.response.data)} error`);
                    }
                    throw err;
                });
            console.log(response.data)
        }

        // console.log(response.data)
        catch (err) {
            console.log(err.message)
        }
    }


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
                            left: 20,
                            top: 40,
                            // backgroundColor: 'rgba(0,0,0,0.25)',
                            borderRadius: 10,
                        }}
                        icon={
                            <MaterialIcons
                                name="arrow-back"
                                size={28}
                                color={'white'}
                            />
                        }
                        title="Back"
                        titleStyle={{ color: 'white', marginLeft: 5 }}
                        onPress={() => navigation.goBack()} />

                </View>

                <View style={styles.content}>

                    <View style={styles.hosted}>
                        <View style={{ flexDirection: 'row' }}>
                            <Avatar
                                avatarStyle={{ borderRadius: 30 }}
                                size={42}
                                source={{
                                    uri: host_image,
                                }}
                                onPress={() => navigation.navigate('profile', { host })}
                            />

                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>CREATED BY</Text>
                                <Text style={{ color: theme.gray }}>{host_name}</Text>
                            </View>
                        </View>

                        <Button
                            type="clear"
                            containerStyle={{
                                backgroundColor: theme.blue,
                                borderRadius: 20,
                                paddingHorizontal: 10,

                            }}
                            title={full ? "Event Full" : "Join Event"}
                            disabled={full}
                            onPress={() => joinHandler(id)}
                            titleStyle={{ color: theme.white }}
                        />
                    </View>

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

                    <View style={styles.description}>

                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Event Details:</Text>

                        <Text style={{ color: theme.gray }}>{desc}</Text>

                    </View>

                    <View style={styles.map}>


                        <MapView
                            style={styles.mapView}
                            customMapStyle={maptheme}
                            initialRegion={{
                                latitude: location.lat,
                                longitude: location.lon,
                                latitudeDelta: 0.04,
                                longitudeDelta: 0.05,
                            }}
                        >

                            <Marker
                                coordinate={{ latitude: location.lat, longitude: location.lon }}
                            >
                                {image && <Image
                                    source={{ uri: image }}
                                    style={{ width: 40, height: 40, borderRadius: 30, borderWidth: 2, borderColor: theme.gray }}
                                />}
                                {/* // {console.log(location.lat)} */}

                            </Marker>

                        </MapView>

                    </View>

                    <View style={{ margin: 20, }}>

                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Category</Text>

                        <View style={styles.tagsView}>

                            {tags.map((item, index) => (
                                <Text style={styles.tags} key={index}>{item}</Text>
                            ))}

                        </View>

                    </View>

                    <View style={{ marginBottom: 10 }}>

                        <Text style={{ marginLeft: 20, fontWeight: 'bold', marginBottom: 20, fontSize: 18 }}>Recommended Events</Text>

                        {recommended != null ?

                            <FlatList
                                data={recommended}
                                keyExtractor={item => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <Recommended eventdata={item} press={() => navigation.navigate('event', { item })} />
                                )}
                            />

                            :
                            <Text> Sorry! No recommendations for you </Text>

                        }

                    </View>

                </View>

            </ScrollView>

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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10,
        elevation: 15,
        marginTop: -30,
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
        marginVertical: 10,
    },

    event__date: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
    },

    event__place: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },

    event__attendees: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },

    event__dateTitle: {
        marginLeft: 20,
        fontSize: 15,
    },

    event__placeTitle: {
        marginLeft: 20,
        fontSize: 15,
    },

    description: {
        marginVertical: 20,
        marginHorizontal: 30,
        // backgroundColor: 'gray',
    },

    // Map

    map: {
        marginVertical: 10,
        zIndex: -1,
        marginHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },

    mapView: {
        height: 200,
        borderRadius: 20,
    },

    // Tags

    tagsView: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    tags: {
        margin: 10,
        backgroundColor: theme.lightaccent,
        color: theme.black,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    hosted: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },

})

export default eventScreen;




