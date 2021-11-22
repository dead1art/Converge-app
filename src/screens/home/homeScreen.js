import React, {useState, useEffect, useContext, useRef} from 'react';
import { SafeAreaView } from 'react-native';
import { RefreshControl, View, Text, ActivityIndicator, StyleSheet, Image, Dimensions, StatusBar, FlatList} from 'react-native';
import { Button } from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico'
import data from '../../../assets/data';
import main from '../../api/main';
import {AuthContext} from '../../context/AuthContext';
import {theme} from '../../constants/colors'
import * as Location from 'expo-location';
import { FocusAwareStatusBar } from '../../components/statusbar'
import Feed from '../../components/home/Feed'
import { showMessage, hideMessage } from "react-native-flash-message";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  NavigationContainer,
  useIsFocused,
} from '@react-navigation/native';
import axios from 'axios'
//Noifications
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const homeScreen = ({navigation})=> {

    const {dispatch} = useContext(AuthContext);

    const { state: authState } = useContext(AuthContext);

    // location access
  
  // const [current,setCurrent] = useState(null); 
  // const [location, setLocation] = useState([]);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(()=>{
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       alert("Location is not turned on")
  //       return;
  //     }

  //     let current = await Location.getCurrentPositionAsync({});

  //     let lat = current.coords.latitude;
  //     let log = current.coords.longitude;

  //     setLocation([lat,log]);
  //     setCurrent(current);
  //     console.log(lat,log)
  //   })

  //   ();

  //   },[refreshing])


    //Notifications 

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    dispatch({type: 'ExpoToken', expo:token})
    const tokenUrl = "https://converge-project.herokuapp.com/api/expotoken/"

    await axios({
      method: 'POST',
      url: tokenUrl,
      data:{
        token: token,
      },
      headers:{
        'Authorization': `Bearer ${authState.userToken}`
      },
    })
    .then(function (response){
      // console.log(response)
    })
    .catch(function (response){
      // console.log(response)
    })

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token
    }

    useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    //Notifications

    let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

    // const isFocused = useIsFocused();

    const [post, setPost] = useState([])

    // --LoadingScreen

    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null)

    // LoadingScreen--
    let url = "https://converge-project.herokuapp.com/api/post/";

    useEffect(()=> {
    const getUser = async() =>{
      try{
        setIsloading(true)
        const response= await axios.get(url,{
          headers: {
            'Authorization': `Bearer ${authState.userToken}` 
          }
          
        });
        // console.log(response.data);
        setPost(response.data)
        setIsloading(false)
      }
      catch(err){
        setIsloading(false)
        console.log(err);
        setError(err)
      }
    }

    getUser();
  },[]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async() => {
      setRefreshing(true);
      try {
          const response = await axios.get(url,{
            headers: {
                        'Authorization': `Bearer ${authState.userToken}`
                    },
                })
                setPost(response.data)       
                setRefreshing(false)
                showMessage({
                          message:"Posts Updated!" ,
                          type:"success",
                          floating: true,
                          duration:5000,
                          icon: {icon:"info" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                          
                        });  
            
      } catch (error) {
          console.log(error)
          setRefreshing(false)
      }
    }, [refreshing]);

    // Post user current location

  //   useEffect(()=> {
  //   const postLocation = async() => {
  //    try {
  //     const response = await main.put('/api/profile/', {location},{
  //                headers: {
  //           'Authorization': `Bearer ${authState.userToken}` 
  //         }
  //           })
  //           console.log(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  //   postLocation()
  //   },[])


    function header(){
    return(
        <View>
            <View style={styles.header}>

                <Text style={styles.logo}> Converge </Text> 

                <Button
                    type="clear"
                    icon={
                        <MaterialIcons
                            name="chat"
                            size={26}
                            color={theme.black}
                        />
                    }
                    containerStyle={{
                        position:'absolute',
                        right:10,
                        top:45,
                    }}
                    onPress={()=>navigation.navigate("room")}
                />
            
            </View>
        </View>
    )
}

    if (!fontsLoaded) {
     return <AppLoading />;
    }

    if (isloading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>
                    Error fetching data... Please check your network connection!
                </Text>
            </View>
        );
    }

    else

    return(

        <SafeAreaView style={styles.container}> 

            <View style={styles.section}> 
                
                {/* <Text style={styles.label}> Latest blogs </Text> */}

                <FlatList 
                data={post}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <Feed info={item} profileNavigate={() => navigation.navigate('profile', { item })}/>
                    )}
                ListHeaderComponent={header}
                snapToAlignment={"start"}
                showsVerticalScrollIndicator={false} 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                />

            </View>

    <FocusAwareStatusBar style="auto" />

        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    container:{
        flex:1,
        width: '100%',
        backgroundColor:theme.white,
        height: Dimensions.get('screen').height,
    },

    header: {
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        // borderBottomWidth:1,
        borderColor:theme.lightaccent,
        paddingTop: 25,
        paddingBottom:20,
        backgroundColor: theme.white,
        width: '100%',
    },

    section: {
        flex: 9,
        marginHorizontal:10,
    },

    logo:{
        textAlign: 'center',
        fontSize: 38,
        fontFamily: 'Pacifico_400Regular',
        color: theme.black,
    },
});

export default homeScreen;