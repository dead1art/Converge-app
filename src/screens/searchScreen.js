import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { View, StyleSheet, Dimensions, StatusBar, FlatList, ActivityIndicator} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons"
import { DarkTheme } from '@react-navigation/native';
import { FocusAwareStatusBar } from '../components/statusbar'
import categorys from '../../assets/category'
import Event from '../components/Event'
import {theme,tabBar} from '../../src/constants/colors'
import Carousel from 'react-native-snap-carousel';
import { createFilter } from 'react-native-search-filter';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Context as eventContext} from '../context/eventContext';
import main from '../api/main';
import {AuthContext} from '../context/AuthContext';
// import Category from '../components/Category'


const SearchScreen = ({navigation})=> {

    const { state: authState } = useContext(AuthContext);

    const {dispatch} = useContext(eventContext);
    const {state: event} =useContext(eventContext);

    // --LoadingScreen

    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null)

    // LoadingScreen--

    const [search, setSearch] = useState('')
    const eventdata = event.events
    const [disabled, setDisabled] = useState('')

    const KEYS_TO_FILTER = ['title', 'location']
    
    const filteredEvents = eventdata.filter(createFilter(search, KEYS_TO_FILTER))

    // const toggleHandler = (name,id) => {
    //     if(name == "All"){
    //         setEventdata(event.events)
    //         setDisabled(id)
    //     }
    //     else{
    //         setEventdata(event.events.filter(item => item.category === name))
    //         setDisabled(id)
    //     }
    // }  

    // Fetching Events data from The API

    useEffect(()=>{
        const getEvents= async() =>{
            try{
                setIsloading(true)
                dispatch({type:"fetch_events_request"})
                const response = await main.get('/api/event/',{
                    headers: {
                      'Authorization': `Bearer ${authState.userToken}` 
                    }
                  })
                // console.log(response);
                dispatch({type:"fetch_events_success",payload:response.data})
                setIsloading(false)
            }
            catch(err)
            {
                setIsloading(false)
                dispatch({type:"fetch_events_failure"});
                console.log(err);
                setError(err)
            }
        }
        getEvents();
    },[]);

    const Header = () => {

        return(

        <View style={styles.header}>

                <Text style={styles.header__title}>Discover the most amazing events</Text>

            <View style={styles.category}> 

            <Text> Slider Comes to here </Text>

            {/* <FlatList
            data={categorys}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                <Category name={item.name} id={item.id} toggle={() => toggleHandler(item.name, item.id)} disabled={disabled.indexOf(item.id) !== -1}/>
            )}
            />       */}

            </View>

            <Text style={styles.events__header}> Featured Events </Text>

        </View>    
        )   
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
            <Text style={{ fontSize: 18}}>
            Error fetching data... Please check your network connection!
            </Text>
        </View>
        );
    }

    return(

        <SafeAreaView style={styles.container}>    
  
            <SearchBar
                theme={DarkTheme}
                searchIcon={
                    <MaterialIcons name="search" size={26} color={theme.gray} />
                }
                inputStyle={{fontSize: 20, color: "black"}}
                containerStyle={{
                    borderTopWidth:0,
                    borderBottomWidth:0,
                    borderRadius:20,
                    marginTop:60,
                    backgroundColor: '#e8ebf3',
                    width: '90%',
                    marginHorizontal:20,
                }}     
                inputContainerStyle={styles.input}
                placeholder="Search for any events"
                placeholderTextColor="black"
                onChangeText={setSearch}
                value={search}
                />

            <View style={styles.events}>
                   
                <FlatList
              data={filteredEvents}
              keyExtractor={item => item.id.toString()}           
              ListHeaderComponent={Header}
              ListfooterComponent={ <View style={{height: 40}}> Footer </View> }
              renderItem={({item}) => (
                  <Event eventdata={item} press={() => navigation.navigate('event', {item})} />
              )}
            />
            </View>

<FocusAwareStatusBar style="auto" />
        </SafeAreaView>
    );

};


// StyleSheet

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
    },

    header:{
        flex:1,
        marginTop: 10,
        alignItems:'center',
        width: '100%',
        height: '100%',
    },

    header__title:{
        // width:'80%',
        textAlign:'left',
        fontWeight: 'bold',
        fontSize:30,
        marginVertical:20,
        marginHorizontal:20,
    },

    input:{
        borderRadius: 30,
        color: 'white',
        paddingHorizontal:10,
    },  
    button:{
        marginRight:50,
    },
    events__header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom:20,
    },
    events: {
        flex:1,
        marginBottom: 50,
    },

    category:{
        marginTop: 10,
        marginBottom:30,
        flexDirection: 'row',
    },

    category__items:{
        paddingHorizontal:10,
    }
});

export default SearchScreen;