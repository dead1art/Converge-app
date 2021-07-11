
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FocusAwareStatusBar } from '../../components/statusbar'
import { Input, Avatar, Button } from "react-native-elements"
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import ReactChipsInput from 'react-native-chips'
import * as ImagePicker from 'expo-image-picker';
import main from '../../api/main';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import * as Location from 'expo-location';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { theme } from '../../constants/colors';
 
const editScreen = ({route, navigation}) => {

      const { state: authState } = React.useContext(AuthContext);

  //ChipInput

  const tagsData = ["sports","health","celebration"]

  // location access
  
  const [current,setCurrent] = useState(null); 
  const [location, setLocation] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(()=>{
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        alert("Location is not turned on")
        return;
      }

      let current = await Location.getCurrentPositionAsync({});

      let log = current.coords.longitude;
      var lat = current.coords.latitude;

      setLocation([log,lat]);

      setCurrent(current);

      console.log(lat,log)

    })();
  },[])

  console.log(location);


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [editScreen]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

     console.log(result.uri)
    // if (!result.cancelled) {
    // }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
  let localUri = result.uri;
  let filename = localUri.split('/').pop();

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  console.log(filename)
  console.log(type)
  setImage(result.uri)

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  formData.append('image', { uri: localUri, name: filename, type });

//   await fetch("https://converge-project.herokuapp.com/api/profile/", {
//     method: 'PUT',
//     body: formData,
//     headers: {
//       'content-type': 'multipart/form-data',
//     },
//   });

axios({
    method: "put",
    url: "https://converge-project.herokuapp.com/api/profile/",
    data: formData,
    headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${authState.userToken}`},
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);

    });

  };

  //date picker logic
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
    // console.log(date);
    
    const date_str = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()

    console.log(date_str);

    let formData = new FormData();

    formData.append('dob',date_str);

    axios({
        method: "put",
        url: "https://converge-project.herokuapp.com/api/profile/",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${authState.userToken}`},
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
    
        });
    
  };

    // Image Picker
    const {userInfo} = route.params;

    const [image, setImage] = useState(userInfo.image)
    const [first_name, setFirst_name] = useState(userInfo.first_name)
    const [last_name, setLast_name] = useState(userInfo.last_name)
    const [bio, setBio] = useState(userInfo.bio)
    const [email, setEmail] = useState(userInfo.email)
    const [tags,setTags] = useState(userInfo.tags);

    // {image && console.log(image)}
    const noImage = "https://nursing.matoshri.edu.in/assets/images/no-image-faculty.png"

    const editProfileHandler = async(first_name, last_name, bio, email, tags) => {
        try {
            const response = await main.put("/api/profile/", { first_name, last_name, bio, email, tags, location}, {
                 headers: {
            'Authorization': `Bearer ${authState.userToken}` 
            }
            });
            console.log(response.data)
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        
        <SafeAreaView style={styles.container}>


        <ScrollView>

    <View style={styles.content}>


        <Text style={styles.header__profile}> Edit Profile </Text>
        <Avatar
        rounded
        containerStyle={{
            marginTop:20,
            backgroundColor: 'white',
        }}
        size={150}
        source={{
            uri:
            image ? image : noImage,
        }}
        />

    <Button 
            titleStyle={{color: "white"}}
            buttonStyle={{ 
                backgroundColor: theme.blue,
                marginTop: 40,
                marginBottom: 20,
                borderRadius: 10,
                paddingHorizontal: 20,}}
                title='Update Picture'
                onPress={pickImage}
                />
                
            <View style={styles.info}>
                <Text>   First Name </Text>  
                <Input 
                disabled
                inputContainerStyle={{ 
                    marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: theme.lightaccent,
                    borderRadius:10,
                    height: 50,
                }}
                style={styles.input}
                value={first_name} 
                onChangeText={setFirst_name} /> 
            </View>

            <View style={styles.info}>
                <Text>   Last Name</Text>  
                <Input
                disabled 
                inputContainerStyle={{ 
                    marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: theme.lightaccent,
                    borderRadius:10,
                    height: 50,
                }}
                style={styles.input}
                value={last_name} 
                onChangeText={setLast_name} /> 
            </View>

            <View style={styles.info}> 
                 <Text>   Bio</Text>
                <Input 
                textAlign="left"
                inputContainerStyle={{ 
                    marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: theme.lightaccent,
                    borderRadius:10,
                    height: 50,
                }}
                style={styles.input}
                value={bio} 
                onChangeText={setBio} />
            </View>
            
            <View style={styles.info}> 
                <Text>   Date Of Birth</Text>
                <Button 
                // title="Show Date Picker"
                icon={
                  <MaterialIcons
                    name="calendar-today"
                    size={26}
                    color={theme.black}
                  />
                }
                type="clear" 
                onPress={showDatePicker} 
                containerStyle={{
                  marginTop:10,
                  borderRadius:10,
                  borderBottomWidth: 0, 
                  backgroundColor: theme.lightaccent,
                  marginHorizontal:10,
                }} 
                titleStyle={{color:theme.black}}
                />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
            </View>

            <View style={styles.tags}>

            <Text>   Enter Interests</Text>
            <ReactChipsInput 
                label=" " 
                initialChips={tags} 
                onChangeChips={(chips) => setTags(chips)} 
                // alertRequired={true} 
                chipStyle={styles.chip}     
                inputStyle={styles.chipInput} 
                labelStyle={styles.chipLabel} 
                labelOnBlur={{ color: '#666' }} />

            </View> 
            
            <View style={styles.info}>
                <Text>   Email</Text>
                <Input
                disabled
                inputContainerStyle={{ 
                     marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: theme.lightaccent,
                    borderRadius:10,
                    height: 50,
                }}
                style={styles.input}
                value={email} 
                onChangeText={setEmail} />
            </View>          

            <Button 
            containerStyle={{
                borderRadius: 20,
                position: 'absolute',
                top: 20,
                right: 30,
            }}
            buttonStyle={{
                padding: 10,
                backgroundColor: 'white',
            }}   
            icon={ 
            <Ionicons
            name="checkmark-outline"
            size={30}
            />
            }
           onPress={()=>{
            editProfileHandler(first_name, last_name, bio, email, tags)
           }}
            />


    {/* SignOut Button */}

    <FocusAwareStatusBar style="auto" />

    </View>
       

</ScrollView>

</SafeAreaView>
    
    )};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.white,
        height: Dimensions.get('screen').height,
    },
    
    content: {
        width: '100%',
        marginTop: 30,
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },

    header__profile: {
        marginTop: 10,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },


    bio: {
        color: 'gray',
        marginTop: 10,
        marginBottom: 10,
    },

    nobio: {
        color: 'gray',
        marginVertical: 10,
    },

    info: {
        width: '100%',
        paddingVertical: 10,
    },

    input: {
        borderRadius:0,
        paddingHorizontal: 20,
        color: 'gray',
    },

    tags:{
        marginTop:20,
        paddingVertical:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    
    chipInput:{
        width: 330,
        marginLeft:10,
        marginTop:-20,
        marginBottom:20,
        borderBottomWidth: 0, 
        color:'gray',
        backgroundColor: theme.lightaccent,
        borderRadius:10,
        paddingHorizontal:20,
        height:50,
        borderColor: theme.gray,
    },
    
    chip:{
        marginTop:10,
        marginLeft:10,
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
        borderWidth:0,
        backgroundColor: theme.lightaccent, 
    },


})

export default editScreen
