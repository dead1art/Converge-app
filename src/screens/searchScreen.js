import React, { useEffect, useState } from 'react'
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
import Carousel from 'react-native-snap-carousel';
import { createFilter } from 'react-native-search-filter';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';


const SearchScreen = ()=> {

    const [search, setSearch] = useState('')
    const [eventdata, setEventdata] = useState(events)
    const [disabled, setDisabled] = useState('')

    const KEYS_TO_FILTER = ['name','location']
    
    const filteredEvents = eventdata.filter(createFilter(search, KEYS_TO_FILTER))

    const toggleHandler = (name,id) => {
        if(name == "All"){
            setEventdata(events)
            setDisabled(id)
        }
        else{

            setEventdata(events.filter(item => item.category === name))
            setDisabled(id)
        }
    }  

    return(

        <KeyboardAvoidingView style={styles.container}>

        <View style={styles.header}>

                <SearchBar
                theme={DarkTheme}
                searchIcon={
                    <MaterialIcons name="search" size={26} />
                }
                inputStyle={{fontSize: 20, color: 'black'}}
                containerStyle={{
                    backgroundColor:'#E5E8EE',
                    borderTopWidth:0,
                    borderBottomWidth:0,
                    width: '100%',
                }}
                inputContainerStyle={styles.input}
                placeholder="Search for any events"
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
                    titleStyle={{
                        paddingVertical: 10,
                        paddingHorizontal:10,
                        color: 'black'}}
                        containerStyle={{
                            borderRadius:10,
                            backgroundColor: 'white'
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

            <Text style={styles.events__header}> Events </Text>

            <View style={styles.events}>
                
                <Carousel
              data={filteredEvents}
              renderItem={({item}) => (
                  <Event eventdata={item} />
              )}
              keyExtractor={item => item.id}
              sliderWidth={400}
              itemWidth={300}
                sliderHeight={500}
            />

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
        backgroundColor: '#E5E8EE',
        height: Dimensions.get('screen').height,
    },
    header:{
        flex:1,
        display:'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 30,
        marginHorizontal:10,
    },

    section:{
        flex: 1,
    
        marginVertical:20,
    },

    footer:{
        flex:5,
        alignItems: 'center',
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
    },
    input:{
        backgroundColor: '#E5E8EE',
        borderRadius: 30,
        color: 'black',
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
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
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