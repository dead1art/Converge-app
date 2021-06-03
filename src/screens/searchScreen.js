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

    const Header = () => {
    return(
        <View style={styles.header}>

                <Text style={styles.header__title}>Discover the most amazing events</Text>

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

            <Text style={styles.events__header}> Featured Events </Text>

        </View>
    )
}

    return(

        <SafeAreaView style={styles.container}>          
     
        <View style={styles.section}>
                
                <FlatList
              data={filteredEvents}
              ListHeaderComponent={Header}
              renderItem={({item}) => (
                  <Event key={item.id} eventdata={item} press={() => navigation.navigate('event', {item})} />
              )}
            />

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
        height: Dimensions.get('screen').height,
    },

    header:{
        flex:1,
        marginTop: 10,
        alignItems:'center',
        width: '100%',
        height: '100%',
    },

    section:{
        flex:1,
        marginTop: 20,
        width: '100%',
        height:'100%',
        marginBottom:70,
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
        marginBottom:10,
    },
    events: {
        height: '100%',
        width: '100%',
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