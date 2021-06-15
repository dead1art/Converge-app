import React, {useState} from 'react'
import { TextInput } from 'react-native'
import {theme} from "../../constants/colors"
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import {Input, Button} from 'react-native-elements'
import { Chip } from 'react-native-paper';
import ToggleButton from '../../components/Buttons/ToggleButton'
import ReactChipsInput from 'react-native-chips'
import * as ImagePicker from 'expo-image-picker';

const createEvent = () => {

    const tagsData = []

    const stockImage = "https://discountseries.com/wp-content/uploads/2017/09/default.jpg"

    const [image, setImage] = useState(stockImage)
    const [title,setTitle] = useState()
    const [addr,setAddr] = useState()
    const [event_date,setEvent_date] = useState()
    const [desc,setDesc] = useState()
    const [max_attendees,setMax_attendees] = useState()

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
                initialChips={tagsData} 
                onChangeChips={(chips) => console.log(chips)} 
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
})

export default createEvent

