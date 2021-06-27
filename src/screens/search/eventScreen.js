import React, {useContext} from 'react'
import { Dimensions } from 'react-native';
import { View, SafeAreaView, Text, StyleSheet, Image } from 'react-native'
import { Button, Avatar } from 'react-native-elements'
import { FocusAwareStatusBar } from '../../components/statusbar'
import maptheme from '../../../assets/mapTheme'
import main from '../../api/main'
import {AuthContext} from '../../context/AuthContext';
import { MaterialIcons } from "@expo/vector-icons"
import { theme } from '../../constants/colors'
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const eventScreen = ({ route, navigation }) => {

     const { state: authState } = useContext(AuthContext);

    const { id, title, addr, image, event_date, desc, host_image, host_name, max_attendees, location, tags } = route.params.item;

    const host = route.params.item

    const monthNames = ["January", "February", "March", "April", "May", "June",
                           "July", "August", "September", "October", "November", "December"
                        ];

    const d = event_date

    console.log(host)
    
    const joinHandler = async (id) => {
    let url = `https://converge-project.herokuapp.com/api/event/join/${id}/`
    console.log(url)
        try {
            console.log(authState.userToken)
            const response = await axios.post(url , {
                    headers: {
                            'Authorization': `Bearer ${authState.userToken}` 
                         }
                }).catch(err => {
    if (err.response.status === 400) {
      throw new Error(`${JSON.stringify(err.response.data)} error`);
        }
    throw err;
    });
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

                <View style={styles.hosted}>
                <Text style={styles.hostedTitle}>Created By:</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>                        
                        <Avatar
                            rounded
                            size={42}
                            source={{
                                uri: host_image,
                            }}
                            onPress={() => navigation.navigate('profile', {host})}
                            />

                        <Text style={{marginLeft:10,fontWeight: 'bold',}}>{host_name}</Text>
                        </View>
                </View>

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

                <Text style={{fontWeight: 'bold', marginBottom:5}}>Description:</Text>

                <Text style={{color: theme.gray}}>{desc}</Text>

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
                    coordinate={{latitude: location.lat, longitude: location.lon}}
                    >
                    {image && <Image
                        source={{uri : image}}
                        style={{width:40,height:40, borderRadius:30, borderWidth:2, borderColor: theme.gray}}
                    />}
                    {/* // {console.log(location.lat)} */}

                </Marker>    
                    
                </MapView>
                
                </View>

                <View style={styles.tagsView}>

                    {tags.map((item,index) => (
                        <Text style={styles.tags} key={index}>{item}</Text>
                        ))}
                    
                </View>

                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cum, ut veniam debitis, nostrum tempora aliquam repellendus cupiditate culpa ex eius, autem temporibus officiis itaque neque porro ratione expedita accusamus.
                Commodi, labore. Incidunt asperiores perspiciatis obcaecati! Dolore a laborum unde, consequuntur quidem delectus nisi dolorem illo nulla, nostrum eius debitis rem accusamus labore. Veniam nostrum impedit possimus esse doloribus facilis?
                Hic a praesentium ipsam, natus aspernatur, distinctio magni labore vel temporibus, ab beatae quam tempora? Fugit, incidunt ipsa odit esse accusantium iure voluptate, quasi quod provident inventore animi, dicta vel.
                Facere doloremque nesciunt qui? Architecto ab, vel nisi dicta itaque illo quia, aut explicabo dolorem tenetur ad ea non ullam. Mollitia saepe odio ipsum nisi asperiores iure excepturi rerum consequatur?
                Repellendus eum, recusandae magnam distinctio ipsam asperiores eligendi, et obcaecati sequi voluptates unde, id magni placeat molestias error quaerat? Deserunt sint delectus laudantium quibusdam quo nesciunt itaque quidem quisquam velit?</Text>
                

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
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                }}
                title="Join Event"
                onPress={() => joinHandler(id)}
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
        fontSize:15,
    },

    event__placeTitle: {
        marginLeft: 20,
        fontSize:15,
    },

    description:{
        marginVertical:20,
        marginHorizontal: 30,
        // backgroundColor: 'gray',
    },

    // Map

    map:{
        marginTop:20,
        zIndex: -1, 
        marginHorizontal: 20,
        borderRadius: 20, 
        overflow: 'hidden',
    },

    mapView:{
        height:200,
        borderRadius: 20,
    },

    // Tags

    tagsView:{
        marginVertical:40,
        marginHorizontal:20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    tags:{
        margin:10,
        backgroundColor: theme.lightaccent,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:20,
    },

    hosted:{
        marginLeft:20,
        marginBottom:10,
    },

    hostedTitle:{
        marginBottom:5,
    },

})

export default eventScreen;




