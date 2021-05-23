import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { View, StyleSheet, Dimensions, StatusBar, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons"
import { DarkTheme } from '@react-navigation/native';
import { FocusAwareStatusBar } from '../components/statusbar'
import events from '../../assets/events';
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


const SearchScreen = ({navigation})=> {

    const { state: authState } = useContext(AuthContext);

    const {dispatch} = useContext(eventContext);
    const {state: event} =useContext(eventContext);

    useEffect(()=>{
        const getEvents= async() =>{
            try{
                dispatch({type:"fetch_events_request"})
                const response = await main.get('/api/event/',{
                    headers: {
                      'Authorization': `Bearer ${authState.userToken}` 
                    }
                  })
                // console.log(response);
                dispatch({type:"fetch_events_success",payload:response.data})
            }
            catch(err)
            {
                dispatch({type:"fetch_events_failure"});
                console.log(err);
            }
        }
        getEvents();
    },[authState.userToken]);


    // console.log(event.events);

    const [search, setSearch] = useState('')
    const [eventdata, setEventdata] = useState(event.events)
    const [disabled, setDisabled] = useState('')
    const [identifier, setIdentifier] = useState('')

    const KEYS_TO_FILTER = ['name','location']
    
    const filteredEvents = eventdata.filter(createFilter(search, KEYS_TO_FILTER))

    const toggleHandler = (name,id) => {
        if(name == "All"){
            setEventdata(event.events)
            setDisabled(id)
            setIdentifier(name)
        }
        else{

            setEventdata(event.events.filter(item => item.category === name))
            setDisabled(id)
            setIdentifier(name)
        }
    }  

    return(

        <KeyboardAvoidingView style={styles.container}>

        <View style={styles.header}>

                <SearchBar
                theme={DarkTheme}
                searchIcon={
                    <MaterialIcons name="search" size={26} color={theme.accent} />
                }
                inputStyle={{fontSize: 20, color: theme.accent}}
                containerStyle={{
                    borderTopWidth:0,
                    borderBottomWidth:0,
                    borderRadius:20,
                    marginTop:10,
                    backgroundColor: '#f1eff6',
                    width: '90%',
                    marginHorizontal:20,
                }}     
                inputContainerStyle={styles.input}
                placeholder="Search for any events"
                placeholderTextColor={theme.accentLite}
                onChangeText={setSearch}
                value={search}
                />

        </View>

        <View style={styles.section}>

                <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                >


            <View style={styles.category}> 

            {categorys.map(item => (
                <View style={styles.category__items}> 
                    <Button
                    type="clear"
                    key={item.id}
                    icon={
                    <MaterialIcons
                    name="sports-football"
                    />
                
                }
                    titleStyle={{
                        paddingVertical: 10,
                        paddingHorizontal:10,
                        color: '#1E1F20'}}
                        disabledStyle={{backgroundColor: theme.accent}}
                        disabledTitleStyle={{color:'white'}}
                        containerStyle={{
                            borderRadius:20,
                            backgroundColor: "#e9e8e9",
                        
                        }}
                        disabled={disabled.indexOf(item.id) !== -1}
                        onPress={() => toggleHandler(item.name, item.id)}
                        title={item.name} />
                </View>
            ))}

            </View>

            </ScrollView>
        </View>

        <View style={styles.footer}>

            <Text style={styles.events__header}> Featured Events </Text>

            <View style={styles.events}>
                
                <Carousel
              data={filteredEvents}
              renderItem={({item}) => (
                  <Event key={item.id} eventdata={item} press={() => navigation.navigate('event', {item})} />
              )}
              sliderWidth={320}
              itemWidth={320}
              sliderHeight={500}
            />

            <Text> {identifier} </Text>

            </View>

        </View>

<FocusAwareStatusBar style="auto" />
        </KeyboardAvoidingView>
    );
            
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        height: Dimensions.get('screen').height,
    },
    header:{
        flex:1,
        display:'flex',
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal:10,
        alignItems:'center',
        width: '100%',
        height: '100%',
    },

    section:{
        flex: 1,
        paddingVertical:20,
        backgroundColor: 'brown',
        width: '100%',
        height: '100%',
    },

    footer:{
        flex:4,
        alignItems: 'center',
        paddingTop: 20,
        width: '90%',
        borderRadius:30,
        backgroundColor: 'red',
        marginBottom:80,
    },
    input:{
        borderRadius: 30,
        color: 'white',
        padding: 5,
        paddingHorizontal:10,
    },  
    button:{
        marginRight:50,
    },
    events__header: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    events: {
        marginVertical: 20,
        height: '80%',
        width: '90%',
        backgroundColor: 'yellow',
    },

    category:{
        marginHorizontal: 10,
        flexDirection: 'row',
    },

    category__items:{
        paddingHorizontal:10,
    }
});

export default SearchScreen;