import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { View, StyleSheet, Dimensions, StatusBar, FlatList} from 'react-native';
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
    },[]);


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

        <SafeAreaView style={styles.container}>

        <View style={styles.header}>

                <Text style={styles.header__title}> Discover the Most Amazing Events </Text>

                <SearchBar
                theme={DarkTheme}
                searchIcon={
                    <MaterialIcons name="search" size={26} color={theme.gray} />
                }
                inputStyle={{fontSize: 20, color: theme.blue}}
                containerStyle={{
                    borderTopWidth:0,
                    borderBottomWidth:0,
                    borderRadius:20,
                    marginTop:10,
                    backgroundColor: theme.lightblue,
                    width: '90%',
                    marginHorizontal:20,
                    marginVertical:30,
                }}     
                inputContainerStyle={styles.input}
                placeholder="Search for any events"
                placeholderTextColor={theme.gray}
                onChangeText={setSearch}
                value={search}
                />

            <View style={styles.category}> 

            <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >

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
                        color: theme.gray}}
                        disabledStyle={{backgroundColor: theme.blue}}
                        disabledTitleStyle={{color:'white'}}
                        containerStyle={{
                            borderRadius:20,
                            backgroundColor: theme.lightblue,
                        
                        }}
                        disabled={disabled.indexOf(item.id) !== -1}
                        onPress={() => toggleHandler(item.name, item.id)}
                        title={item.name} />
                </View>
            ))}

            </ScrollView>

            </View>


        </View>

               
     
        <View style={styles.footer}>

            <Text style={styles.events__header}> Featured Events </Text>

            <View style={styles.events}>
                
                <Carousel
              data={filteredEvents}
              renderItem={({item}) => (
                  <Event key={item.id} eventdata={item} press={() => navigation.navigate('event', {item})} />
              )}
              sliderWidth={350}
              itemWidth={350}
              sliderHeight={300}
            />

            <Text> {identifier} </Text>

            </View>

        </View>

<FocusAwareStatusBar style="auto" />
        </SafeAreaView>
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
        marginTop: 30,
        marginHorizontal:10,
        alignItems:'center',
        width: '100%',
        height: '100%',
    },

    footer:{
        flex:1.5,
        justifyContent: 'flex-start',
        paddingTop: 10,
        width: '100%',
        height:'100%',
    },

    header__title:{
        textAlign:'left',
        fontWeight: 'bold',
        fontSize:30,
        margin:20,
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
    },
    events: {
        marginVertical: 20,
        height: '80%',
        width: '90%',
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