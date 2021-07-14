import React, {useState,useContext} from 'react'
import {theme} from "../../constants/colors"
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, ActivityIndicator } from 'react-native'
import {Input, Button} from 'react-native-elements'
import ReactChipsInput from 'react-native-chips'
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';
import main from '../../api/main';
import axios from 'axios';
// import { Context as postContext} from '../../context/postContext';
import {AuthContext} from '../../context/AuthContext'
import { TouchableOpacity } from 'react-native'
import { FocusAwareStatusBar } from '../../components/statusbar'
import { showMessage, hideMessage } from "react-native-flash-message";


const createPost = ({navigation}) => {

    const { state: authState } = useContext(AuthContext);

    const token = authState.userToken;

    const tagsData = ["party"]

    const stockImage = "https://discountseries.com/wp-content/uploads/2017/09/default.jpg"

    const [image, setImage] = useState('')
    const [caption, setCaption] = useState('')
    const [tags,setTags] = useState(tagsData);

    // --LoadingScreen

    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null)

    // LoadingScreen--

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

    const addPost = async(image,caption,tags,token) => {

    // FormData and Inferring the type of the image
    
    let localUri = image;
    let filename = localUri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    formData.append('image', { uri: localUri, name: filename, type });
    formData.append('caption',caption);
   
    // formData.append('max_attendees',max_attendees);
    // formData.append('event_date',event_date);
    // formData.append('location',location);
    // formData.append('tagsData',tagsData);
    // formData.append('title',title);

    // console.log(formData);

    // axios({
    //     method: "post",
    //     url: "https://httpbin.org/post",
    //     data: formData,
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         'Authorization': `Bearer ${token}`},
    //   })
    //     .then(function (response) {
    //       //handle success
    //       console.log(response);
    //     })
    //     .catch(function (response) {
    //       //handle error
    //       console.log(response);
    //     });

        // try{
        //     const post_response = await main.post('/api/post/',{image,caption,tags}, {
        //         headers: {
        //    'Authorization': `Bearer ${token}` 
        //    }});
        //    console.log(post_response.data);
            setIsloading(true)
            const path_url = "https://converge-project.herokuapp.com/api/post/";
            console.log(path_url);

            axios({
             method: 'POST',
             url: path_url,
             data: formData,
             headers: {
                 "Content-Type": "multipart/form-data",
                 'Authorization': `Bearer ${token}`
             },
           })
            .then(function (response) {
              //handle success
              console.log(response);
              setIsloading(false)
              showMessage({
                          message:"Your post has been created!" ,
                          type:"success",
                          floating: true,
                          duration:5000,
                          icon: {icon:"success" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                   
                        });  
            })
            .catch(function (response) {
              //handle error
              console.log(response);
              setIsloading(false)
              showMessage({
                          message:"There was an error creating your post!" ,
                          type:"danger",
                          floating: true,
                          duration:5000,
                          icon: {icon:"danger" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                          
                        });  
            });
            setImage('')
            setCaption('')
            setTags(tagsData)

        // }
        // catch(error)
        // {
        //     console.log(error);
        //     setIsloading(false)
        //     showMessage({
        //                   message:"There was an error creating your post!" ,
        //                   type:"danger",
        //                   floating: true,
        //                   duration:5000,
        //                   icon: {icon:"danger" , position: "left"},
        //                   style: {paddingVertical: 20, paddingHorizontal:20}                          
        //                 });  
        // }
           
    }

    if (isloading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="black" />
            <FocusAwareStatusBar style="auto" />
        </View>
        );
    }

    if (error) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
            {error}
            </Text>
            <FocusAwareStatusBar style="auto" />
        </View>
        );
    }

    
    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Button
                        type="clear"
                        containerStyle={{
                            position: 'absolute',
                            left: 15,
                            top: 35,
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

                <Text style={styles.headerTitle}> Create Post </Text>

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
        
            {/* Description */}

            <View style={styles.description}>
            <Text>   caption</Text>
            <Input 
                multiline={true}
                // numberOfLines={3}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={caption}
                onChangeText={setCaption}/>            
            </View> 

    
            {/* Chips */}

            {/* <View style={styles.tags}>

            <Text>   Enter Tags</Text>
            <ReactChipsInput 
                label=" " 
                initialChips={tags} 
                onChangeChips={(chips) => setTags(chips)} 
                chipStyle={styles.chip}     
                inputStyle={styles.chipInput} 
                labelStyle={styles.chipLabel} 
                labelOnBlur={{ color: '#666' }} />

            </View>  */}

            
            <Button 
            titleStyle={{color: "white"}}
            buttonStyle={{ 
                backgroundColor: theme.blue,
                marginTop:20,
                marginLeft:10,
                width:120,
                marginBottom: 80,
                borderRadius: 10,
                paddingHorizontal: 10,}}
                title='Create Post'
                onPress={() => addPost(image,caption,tags,token)}
                />
 

        </ScrollView>


            </View>

            <FocusAwareStatusBar style="auto" />
        </View>
    )
}

export default createPost

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        height: Dimensions.get('screen').height,
    },
    
    header:{
        flex:1,
        backgroundColor:'white',
        alignItems: 'center',
        paddingTop:40,
        // borderBottomWidth:1,
        borderColor:theme.lightaccent,
    },

    headerTitle:{
        fontSize:22,
        fontWeight: 'bold',
    },
  
    content:{
        flex:11,
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



