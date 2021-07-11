import React, {useState, useEffect, useContext} from 'react';
import { SafeAreaView } from 'react-native';
import { RefreshControl, View, Text, ActivityIndicator, StyleSheet, Image, Dimensions, StatusBar, FlatList} from 'react-native';
import { Button } from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico'
import data from '../../../assets/data';
import {AuthContext} from '../../context/AuthContext';
import {theme} from '../../constants/colors'
import { FocusAwareStatusBar } from '../../components/statusbar'
import Feed from '../../components/home/Feed'
import { showMessage, hideMessage } from "react-native-flash-message";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  NavigationContainer,
  useIsFocused,
} from '@react-navigation/native';
import axios from 'axios'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const homeScreen = ({navigation})=> {

    const { state: authState } = useContext(AuthContext);

    let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

    const isFocused = useIsFocused();

    const [post, setPost] = useState([])
    const [newPost, setNewPost] = useState([])

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
  },[isFocused]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async() => {
      setRefreshing(true);
      try {
          const response = await axios.get(url,{
            headers: {
                        'Authorization': `Bearer ${authState.userToken}`
                    },
                })
            setNewPost(response.data)
            
            if(newPost.length !== post.length)
            {
                setPost(response.data)         
                setRefreshing(false)
            }
            else
            {
                setRefreshing(false)
                showMessage({
                          message:"These are the latest Posts!" ,
                          type:"success",
                          floating: true,
                          duration:5000,
                          icon: {icon:"info" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                          
                        });  
            }
      } catch (error) {
          console.log(error)
          setRefreshing(false)
      }
    }, [refreshing]);

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
                        marginTop:20,
                    }}
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
                        marginTop:20,
                    }}
                />
            
            </View>  

            <View style={styles.section}> 
                
                {/* <Text style={styles.label}> Latest blogs </Text> */}

                <FlatList 
                data={post}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <Feed info={item} profileNavigate={() => navigation.navigate('profile', { item })}/>
                    )}
                // ListHeaderComponent={header}
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
        alignItems:'flex-start',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:theme.lightaccent,
        paddingTop: 20,
        paddingHorizontal:10,
        backgroundColor: theme.white,
        width: '100%',
    },

    section: {
        flex: 7,
        marginBottom:60,
    },

    logo:{
        textAlign: 'center',
        fontSize: 34,
        fontFamily: 'Pacifico_400Regular',
        color: theme.black,
    },
});

export default homeScreen;