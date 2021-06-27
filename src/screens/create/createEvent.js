import React, {useState,useContext} from 'react'
import {theme} from "../../constants/colors"
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView, Image, Modal } from 'react-native'
import {Input, Button} from 'react-native-elements'
import ReactChipsInput from 'react-native-chips'
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Context as eventContext} from '../../context/eventContext';
import {AuthContext} from '../../context/AuthContext'
import { TouchableOpacity } from 'react-native'


const createEvent = ({navigation}) => {

    const {addEvent} = useContext(eventContext);

    const { state: authState } = React.useContext(AuthContext);

    const token = authState.userToken;

    const tagsData = ["sports","health","celebration"]

    const stockImage = "https://discountseries.com/wp-content/uploads/2017/09/default.jpg"

    const [image, setImage] = useState('')
    const [title,setTitle] = useState()
    const [addr,setAddr] = useState()
    const [desc,setDesc] = useState()
    const [max_attendees,setMax_attendees] = useState()

    const [tags,setTags] = useState(tagsData);

    const [lat, setLat] = useState(12.8181202);
    const [lon, setLon] = useState(74.8459375);

    const [location,setLocation] = useState([74.85657,12.91071])

    // Success Modal

    const [modalvisible, setModalvisible] = useState(false)

    // Help Popup

    const [visible, setVisible] = useState(false)

    // console.log(location);

    // console.log(tagsData)

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

            <View style={styles.header}>

                <Button
                        type="clear"
                        containerStyle={{
                            position: 'absolute',
                            left: 15,
                            top: 15,
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

                <Text style={styles.headerTitle}> Create Event </Text>

            </View>


            <View style={styles.content}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >

            <View style={styles.imageContainer}>

            <TouchableOpacity onPress={pickImage}>

                <Image
                style={styles.image}
                source={{uri : image ? image : stockImage}}
                />

            </TouchableOpacity>

            <Text style={{marginLeft:10, flexWrap: 'wrap',textAlign: 'left', width: 160, color: theme.gray}}> 
                    <MaterialIcons 
                    name="info"
                    color={theme.blue}
                    size={18}
                    />
                    Click the image to update an image.</Text>

            </View>

            {/* Event Title */}

            <View style={styles.title}>
            <Text>   Event Title </Text>
            <Input 
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={title}
                onChangeText={setTitle}/>            
            </View>

            {/* Address */}

            <View style={styles.address}>
            <Text>   Event Address </Text>
            <Input 
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={addr}
                onChangeText={setAddr}/>            
            </View>

            {/* Date */}

            <View style={styles.date}>

            <View style={{flexDirection:'column',width:'50%'}}>
            <Text>   Event Date</Text>
                {/* <View style={{flexDirection:'row'}}> */}
            <Input 
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                disabled
                value={event_date}
                onChangeText={setEvent_date}
                rightIcon={
                    <Ionicons 
                    name="calendar-outline"
                    onPress={showDatePicker} 
                    size={22}
                    color={theme.black}
                    />
                }
                />   
            
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                />         
                {/* </View> */}
            </View>
                {/* Max Attendees */}


            <View style={{flexDirection:'column',width:'50%', justifyContent:'space-between'}}>
                <Text>   Max Attendees </Text>
            <Input 
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={max_attendees}
                onChangeText={setMax_attendees}/>      

            </View>

            </View>

            {/* Description */}

            <View style={styles.description}>
            <Text>   Description</Text>
            <Input 
                multiline={true}
                // numberOfLines={3}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={desc}
                onChangeText={setDesc}/>            
            </View> 

    
            {/* Chips */}

            <View style={styles.tags}>

            <Text>   Enter Tags</Text>
            <ReactChipsInput 
                label=" " 
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

            <View style={styles.mapView}> 

            <View style={{flexDirection:'row'}}>

            <Text style={{marginTop:10}}>   Set your location </Text>

            {/* Help Popup */}

            <Button
                type="clear"
                icon={
                    <MaterialIcons
                    name="info"
                    size={18}
                    color={theme.blue}
                    />
                }
                onPress={() => setVisible(true) }
                />

                <Dialog
                visible={visible}
                onTouchOutside={() => setVisible(false)}
                dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
                })}
                >

                <DialogContent style={{width:'50%'}}>
                  <Text style={{padding:10}}> Hold and drag the marker wherever you want to set the location. </Text>
                </DialogContent>

            </Dialog>

            </View>
            
            <MapView 
            initialRegion={{latitude: lat,
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

            </View>
            
            <Button 
            titleStyle={{color: "white"}}
            buttonStyle={{ 
                backgroundColor: theme.blue,
                marginTop:10,
                marginLeft:20,
                width:80,
                marginBottom: 80,
                borderRadius: 10,
                paddingHorizontal: 10,}}
                title='Create'
                onPress={() => {
                    addEvent({addr,max_attendees,desc,event_date,image,location,tags,title,token})
                    setTimeout(() => { setModalvisible(true) }, 5000)
                }}
                />

            </View>  

        </ScrollView>

            {/* Success Modal */}

            <Modal visible={modalvisible}>

                <View>
                    <Button
                    type="outline"
                    title="close"
                    onPress={() => navigation.navigate("search")}
                    />
                    <Text> You have successfully created an event! </Text>
                </View>

            </Modal>

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
    
    header:{
        flex:0.5,
        backgroundColor:'white',
        alignItems: 'center',
        paddingTop:20,
        borderBottomWidth:1,
        borderColor:theme.lightaccent,
    },

    headerTitle:{
        fontSize:22,
        fontWeight: 'bold',
    },
  
    content:{
        flex:5.5,
        backgroundColor:'white',
        paddingHorizontal:20,
    },
    
    inputContainer:{
        // borderRadius:10,
        // backgroundColor:theme.lightaccent,
        borderColor:theme.lightaccent,
    },
    
    imageContainer:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical:30,
    },

    image:{
        width: 200,
        height: 150,
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
        width: 330,
        marginLeft:10,
        marginBottom:20,
        borderBottomWidth:1,
        borderColor: theme.lightaccent,
    },
    
    chipLabel:{
        width: 120,
        marginLeft:10,
        color: theme.gray,
        fontSize:16,
    },
    
    chip:{
        marginTop:10,
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
        borderWidth:0,
        backgroundColor: theme.lightaccent, 
    },

    mapView:{
        marginVertical:20,
    },

    map:{
        width:300,
        height:200,
        alignItems:'center',
        margin:30,
    },

    info: {
        borderRadius: 30,
        width: '100%',
        paddingVertical: 10,
    },

    date:{
        flexDirection:'row',
        
    },
})

export default createEvent

