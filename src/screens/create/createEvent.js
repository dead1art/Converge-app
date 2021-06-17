import React, {useState,useContext} from 'react'
import { TextInput } from 'react-native'
import {theme} from "../../constants/colors"
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import {Input, Button} from 'react-native-elements'
import { Chip } from 'react-native-paper';
import ToggleButton from '../../components/Buttons/ToggleButton'
import ReactChipsInput from 'react-native-chips'
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Context as eventContext} from '../../context/eventContext';
import {AuthContext} from '../../context/AuthContext';


const createEvent = () => {

    const {addEvent} = useContext(eventContext);

    const { state: authState } = React.useContext(AuthContext);

    const token = authState.userToken;

    const tagsData = ["sports","health","celebration"]

    const stockImage = "https://discountseries.com/wp-content/uploads/2017/09/default.jpg"

    const [image, setImage] = useState(stockImage)
    const [title,setTitle] = useState()
    const [addr,setAddr] = useState()
    const [desc,setDesc] = useState()
    const [max_attendees,setMax_attendees] = useState()

    const [tags,setTags] = useState(tagsData);

    const [lat, setLat] = useState(12.8181202);
    const [lon, setLon] = useState(74.8459375);

    const [location,setLocation] = useState([74.85657,12.91071])

    console.log(location);

    console.log(tagsData)

    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //  console.log(result.uri)
       setImage(result.uri)
    // if (!result.cancelled) {
    // }

  };

  //setting map location

//   date picker

  //date picker logic
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const today = new Date;
  const today_date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()
  const [event_date, setEvent_date] = useState(today_date);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    const date_str = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
    setEvent_date(date_str);
    hideDatePicker();
  }

    
    return (
        <View style={styles.container}>

           
            <View style={styles.content}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >

            <Text style={{fontSize:20,textAlign:'center', fontWeight:'bold'}}> Create an event </Text>

            <Image
            style={styles.image}
            source={{uri : image}}
            />

            <Button 
            titleStyle={{color: "white"}}
            buttonStyle={{ 
                backgroundColor: '#2663FF',
                marginTop: 40,
                marginHorizontal:'20%',
                marginBottom: 10,
                borderRadius: 10,
                paddingHorizontal: 10,}}
                title='Upload Picture'
                onPress={pickImage}
                />


            <Input 
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Event Name" />

            <Input 
                inputContainerStyle={styles.inputContainer}
                value={addr}
                onChangeText={setAddr}
                placeholder="Event Address" />

            <Input 
                inputContainerStyle={styles.inputContainer}
                value={event_date}
                onChangeText={setEvent_date}
                placeholder="Event Date" />

            <Input 
                inputContainerStyle={styles.inputContainer}
                value={desc}
                onChangeText={setDesc}
                placeholder="Event Description" /> 

            <Input 
                inputContainerStyle={styles.inputContainer}
                value={max_attendees}
                onChangeText={setMax_attendees}
                placeholder="Max Attendess" />  

            <View style={styles.tags}>

            <ReactChipsInput 
                label="Enter Tags" 
                initialChips={tags} 
                onChangeChips={(chips) => setTags(chips)} 
                // alertRequired={true} 
                chipStyle={styles.chip} 
                inputStyle={styles.chipInput} 
                labelStyle={styles.chipLabel} 
                labelOnBlur={{ color: '#666' }} />

            {/* {list.map((item, index) => { 
                return (
                <Button
                type="ouline"
                onPress={() => toggleHandler()}
                // onClose={() => closeHandler(index)}
                // selected={selected}
                title={item}
                />
            )
            }
            )} */}

            <MapView initialRegion={{latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05}}
                        style={styles.map}>
            <Marker
                draggable
                coordinate={{latitude: lat,
                    longitude: lon,}}
                onDragEnd={(e)=>{
                    const coords = e.nativeEvent.coordinate;
                    setLat(coords.latitude);
                    setLon(coords.longitude);
                    setLocation([coords.longitude,coords.latitude]);
                }}
            />
            </MapView>

            {/* datepicker */}

            <View style={styles.info}> 
                {/* <Input 
                inputContainerStyle={{ 
                    marginTop:10,
                    borderBottomWidth: 0, 
                    backgroundColor: 'white',
                    borderRadius:10,
                    height: 50,
                }}
                style={styles.input}
                value={dob} 
                onChangeText={setDob} /> */}
                <Button title="Pick event date" onPress={showDatePicker} style={{borderRadius:20,height:50,backgroundColor:"#2663FF"}
                } />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
            </View>
            
            <Button 
            titleStyle={{color: "white"}}
            buttonStyle={{ 
                backgroundColor: '#2663FF',
                marginTop: 40,
                marginHorizontal:'20%',
                marginBottom: 10,
                borderRadius: 10,
                paddingHorizontal: 10,}}
                title='Create event'
                onPress={()=>{addEvent({addr,max_attendees,desc,event_date,image,location,tags,title,token})}}
                />

            </View>  

        </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        height: Dimensions.get('screen').height,
    },
    info: {
        borderRadius: 30,
        width: '100%',
        paddingVertical: 10,
    },
    
    content:{
        flex:1,
        backgroundColor:'white',
        margin:20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 50,
    },

    inputContainer:{
        marginTop:20,
        borderBottomWidth:1,
    },

    image:{
        marginTop: 30,
        width: 300,
        height: 200,
        borderRadius:20,
    },

    input:{
        fontSize:16,
    },

    tags:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    chipInput:{
        width: 295,
        marginLeft:10,
        borderBottomWidth:1,
    },

    chipLabel:{
        width: 120,
        marginLeft:10,
    },

    chip:{
        marginTop:40,
        borderWidth:0,
        backgroundColor: theme.gray 
    }
    ,
    map:{
        width:250,
        height:300,
        alignItems:'center',
        margin:30,
    }
})

export default createEvent

