import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ActivityIndicator, FlatList } from 'react-native'
import MapView, { Marker, Circle, Callout, Cus } from 'react-native-maps';
import {theme} from '../../constants/colors'
import main from '../../api/main'
import { Button } from 'react-native-elements'
import { MaterialIcons } from "@expo/vector-icons"
import { AuthContext } from '../../context/AuthContext';
import { Context as eventContext } from '../../context/eventContext';
import maptheme from '../../../assets/mapTheme'
import { FocusAwareStatusBar } from '../../components/statusbar'
import * as Location from 'expo-location';
import { ImageBackground } from 'react-native';

const mapScreen = ({navigation}) => {

    const { state: event } = useContext(eventContext);
    const { dispatch } = useContext(eventContext);

    const eventData = event.events

    // eventData.map(item => (
    //     console.log(item.id)
    // ))

    // Radius 

    const [radius, setRadius] = useState(0)

    const buttons = [20, 50, 100, 200, 500, 1000, 2000]

    const [disabled, setDisabled] = useState('')

    const updateRadius = (item, index) => {
        setRadius(item)
        setDisabled(index)
    }

    // location access

    const loc = event.location

    //loading screen

    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null)
  
  const [current,setCurrent] = useState(null); 
  const [location, setLocation] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const [ latitude, setLatitude] = useState(loc[0])
  const [ longitude, setLongitude] = useState(loc[1])
//   console.log(longitude)

//   console.log(location[0])
//   console.log(location[1])

  useEffect(()=>{
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        alert("Location is not turned on")
        return;
      }
      try{
        setIsloading(true)
        let current = await Location.getCurrentPositionAsync({});

        let lat = current.coords.latitude;
        let lon = current.coords.longitude;

        dispatch({type:'fetch_location_success',location:[lat,lon]});
        setIsloading(false)
      }
      catch (err){
          setIsloading(false)
          console.log(err)
          setError(err)
      }


    })();
  },[])

    // if (isloading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color="black" />
    //             <FocusAwareStatusBar style="auto" />
    //         </View>
    //     );
    // }

    // if (error) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <Text style={{ fontSize: 18 }}>
    //                 Error fetching data... Please check your network connection!
    //                 <FocusAwareStatusBar style="auto" />
    //             </Text>
    //         </View>
    //     );
    // }
  


    return (
        <View>

            {/* <Button
                        type="clear"
                        containerStyle={{
                            position: 'absolute',
                            left: 20,
                            top: 50,
                            backgroundColor: theme.white,
                            borderRadius: 30,
                        }}
                        icon={
                            <MaterialIcons
                                name="arrow-back"
                                size={25}
                                color={theme.black}
                            />
                        }
                        // title="Back"
                        titleStyle={{ color: 'white', marginLeft: 5 }}
                        onPress={() => navigation.goBack()} /> */}

            <View style={styles.header}>
                <FlatList
                        data={buttons}
                        keyExtractor={index => index.toString()}
                        renderItem={({ item, index }) => (
                            <Button
                                type="clear"
                                containerStyle={{
                                    borderRadius: 10,
                                    backgroundColor:theme.white,
                                    marginTop: 20,
                                    marginBottom: 10,
                                    marginHorizontal: 10,
                                }}
                                titleStyle={{
                                    color: theme.black,
                                    marginHorizontal: 5,
                                }}
                                disabled={disabled === index}
                                disabledStyle={{
                                    backgroundColor: theme.blue,
                                }}
                                disabledTitleStyle={{
                                    color: theme.white,
                                }}
                                title={`${item} km`}
                                onPress={() => updateRadius(item, index)}
                            />
                        )}
                        ListHeaderComponent={
                            <Button
                        type="clear"
                        containerStyle={{
                            borderRadius: 30,
                            backgroundColor: theme.white,
                            marginTop: 20,
                            marginHorizontal: 10,
                        }}
                        icon={
                            <MaterialIcons
                                name="arrow-back"
                                size={23}
                                color={theme.black}
                            />
                        }
                        // title="Back"
                        titleStyle={{ color: 'white', marginLeft: 5 }}
                        onPress={() => navigation.goBack()} />
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
            </View>

            <MapView
                    style={styles.mapView}
                    customMapStyle={maptheme}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.9, 
                    }}
                >

                    <Circle
                        center={{latitude: latitude, longitude: longitude}}
                        radius={radius * 1000}
                        fillColor="rgba(0, 106, 255, 0.1)"
                        strokeColor="rgba(0, 106, 255, 0.1)"
                    />

                    <Marker
                            coordinate={{ latitude: latitude, longitude: longitude}}
                        />


                    {eventData.map((item, index) => (
                            <Marker
                                coordinate={{ latitude: item.location.lat, longitude: item.location.lon }}
                                title={item.title}
                                description={item.desc}
                                key={item.id}
                                onCalloutPress={() => navigation.navigate("event", {item})}
                                
                            >
    
                                {item.image && <Image
                                    source={{ uri: item.image }}
                                    style={{ width: 40, height: 40, borderRadius: 30, borderWidth: 2, borderColor: theme.gray }}
                                />}
                       
                                {/* <Callout
                                 
                                tooltip={true}
                                onPress={() => navigation.navigate("event", {item})}
                                >
                                <View> 
                                    <View style={styles.callout}>

                                        <Text style={{marginBottom:-20,padding:5,textAlign:'center'}}>{item.title}</Text>
                                        <Text style={{marginTop:-40}}>
                                            <Image
                                                source={{uri : item.image}}
                                                style={styles.image}
                                            />
                                        </Text>

                                    </View>
                                    <View style={styles.arrowBorder} />
                                    <View style={styles.arrow} />
                                </View>
                                
                                </Callout> */}

                            </Marker>
                    ))}

            </MapView>

            <FocusAwareStatusBar style="auto" />
        </View>
    )
}

export default mapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('screen').height,
        backgroundColor: 'white',
    },

    mapView: {
        zIndex:-1,
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },

    callout:{
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        width: 150,
    },

    header:{
        position: 'absolute',
        top:30,
    },

    image:{
        borderRadius:20,
        width: 150,
        height: 150,
    },

    arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },

})