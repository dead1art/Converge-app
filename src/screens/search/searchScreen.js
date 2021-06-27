import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { RefreshControl, View, StyleSheet, Dimensions, StatusBar, FlatList, ActivityIndicator, Modal } from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons"
import { DarkTheme } from '@react-navigation/native';
import { FocusAwareStatusBar } from '../../components/statusbar'

import Event from '../../components/search/Event'
import { theme, tabBar } from '../../../src/constants/colors'
import { createFilter } from 'react-native-search-filter';
import { Context as eventContext } from '../../context/eventContext';
import main from '../../api/main';
import { AuthContext } from '../../context/AuthContext';
// import Slider from '@react-native-community/slider';
// import Category from '../components/Category'


const SearchScreen = ({ navigation }) => {

    const { state: authState } = useContext(AuthContext);

    const { dispatch } = useContext(eventContext);
    const { state: event } = useContext(eventContext);

    // Slider

    const [radius, setRadius] = useState()

    const buttons = [20, 40, 60, 80, 100, 150, 200, 300, 400, 500]

    const [disabled, setDisabled] = useState('')


    const updateRadius = (item, index) => {
        setRadius(item)
        setDisabled(index)
    }

    // Slider

    // --LoadingScreen

    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null)

    // LoadingScreen--

    const [search, setSearch] = useState('')
    const eventdata = event.events
    // console.log(eventdata)

    const KEYS_TO_FILTER = ['title', 'addr', 'event_date']

    const filteredEvents = eventdata.filter(createFilter(search, KEYS_TO_FILTER))

    // Search Modal

    const [isvisible, setIsvisible] = useState(false)

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

    // Refreshing

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    // Refreshing

    const url = '/api/event/'

    // Fetching Events data from The API

    useEffect(() => {
        const abortController = new AbortController()
        const getEvents = async () => {
            try {
                setIsloading(true)
                dispatch({ type: "fetch_events_request" })
                const response = await main.get(url, {
                    headers: {
                        'Authorization': `Bearer ${authState.userToken}`
                    },
                    params: {
                        radius: radius,
                    }
                })
                // console.log(response);
                dispatch({ type: "fetch_events_success", payload: response.data })
                setIsloading(false)
                setRadius()
            }
            catch (err) {
                setIsloading(false)
                dispatch({ type: "fetch_events_failure" });
                console.log(err);
                setError(err)
            }
        }
        getEvents();

        return () => {
            abortController.abort()
        }
    }, [radius]);


    const Header = () => {

        return (
            <View style={styles.header}>

                <Text style={styles.header__title}>Discover the most amazing events</Text>

                <Button
                    type="clear"
                    icon={
                        <MaterialIcons name="search" size={28} color={theme.black}
                            style={{ marginRight: 10, }}
                        />
                    }
                    onPress={() => setIsvisible(true)}

                    containerStyle={{
                        flexDirection: 'row',
                        borderRadius: 20,
                        padding: 10,
                        paddingHorizontal: 10,
                        marginTop: 20,
                        justifyContent: 'flex-start',
                        backgroundColor: theme.lightaccent,
                        marginHorizontal: 10,
                    }}
                    inputContainerStyle={styles.input}
                    title="Search for any events"
                    titleStyle={{ color: theme.gray }}
                    onChangeText={setSearch}
                    value={search}
                />

                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={50}
                    style={{
                        backgroundColor: theme.blue,
                        color: theme.white,
                        top: 136,
                        padding: 7,
                        borderRadius: 20,
                        right: 10,
                        position: 'absolute',
                    }}
                    onPress={() => setIsvisible(true)}
                />

                {/* ButtonGroup */}

                <Text style={styles.eventsRadiusTitle}> Filter by Distance </Text>

                <View style={styles.buttonGroup}>

                    <FlatList
                        data={buttons}
                        keyExtractor={index => index.toString()}
                        renderItem={({ item, index }) => (
                            <Button
                                type="clear"
                                containerStyle={{
                                    borderRadius: 10,
                                    borderWidth: 0,
                                    backgroundColor: theme.lightaccent,
                                    marginTop: 20,
                                    marginHorizontal: 10,
                                }}
                                titleStyle={{
                                    color: theme.gray,
                                    marginHorizontal: 5,
                                }}
                                disabled={disabled === index}
                                disabledStyle={{
                                    backgroundColor: theme.blue,
                                }}
                                disabledTitleStyle={{
                                    color: theme.white,
                                }}
                                title={`${item} km`}
                                onPress={() => updateRadius(item, index)}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />

                </View>

                {/* ButtonGroup */}

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
                <Text style={{ fontSize: 18 }}>
                    Error fetching data... Please check your network connection!
                </Text>
            </View>
        );
    }

    return (

        <SafeAreaView style={styles.container}>

            <Modal
                visible={isvisible}
                animationType="slide"
            >

                <SearchBar
                    theme={DarkTheme}
                    clearIcon={false}
                    searchIcon={
                        <MaterialIcons name="search" size={28} color={theme.black} />
                    }
                    inputStyle={{ fontSize: 20, color: "black" }}
                    onFocus={() => setIsvisible(true)}
                    autoFocus
                    containerStyle={{
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        backgroundColor: theme.lightaccent,
                        borderRadius: 20,
                        marginVertical: 20,
                        marginHorizontal: 10,
                    }}
                    inputContainerStyle={styles.input}
                    placeholder="Search for any events"
                    placeholderTextColor="black"
                    onChangeText={setSearch}
                    value={search}
                />


                <Button
                    type="clear"
                    containerStyle={{
                        position: 'absolute',
                        right: 30,
                        top: 30,
                        borderRadius: 10,
                    }}
                    icon={
                        <MaterialIcons
                            name="close"
                            size={28}
                            color={'black'}
                        />
                    }
                    onPress={() => setIsvisible(false)} />

                <FlatList
                    data={filteredEvents}
                    keyExtractor={item => item.id.toString()}
                    numColumns={1}
                    ListfooterComponent={<View style={{ height: 40 }}> Footer </View>}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item }) => (
                        <Event eventdata={item} press={() => navigation.navigate('event', { item })} />
                    )}
                />

            </Modal>

            <View style={styles.events}>

                <FlatList
                    data={filteredEvents}
                    ListHeaderComponent={Header}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    ListfooterComponent={<View style={{ height: 40 }}> Footer </View>}
                    //   refreshControl={
                    //         <RefreshControl
                    //             refreshing={refreshing}
                    //             onRefresh={onRefresh}
                    //         />
                    //     }
                    renderItem={({ item }) => (
                        <Event eventdata={item} press={() => navigation.navigate('event', { item })} />
                    )}
                />
            </View>

            <FocusAwareStatusBar style="auto" />
        </SafeAreaView>
    );

};


// StyleSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.white,
        height: Dimensions.get('window').height,
    },

    header: {
        flex: 1,
        marginTop: 10,
        paddingBottom: 20,
        width: '100%',
        height: '100%',
    },

    header__title: {
        // width:'80%',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 40,
        marginHorizontal: 20,
    },

    input: {
        borderRadius: 30,
        color: 'white',
        paddingHorizontal: 10,
    },

    button: {
        marginRight: 50,
    },

    buttonGroup: {
        flexDirection: 'row',
    },

    events__header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 20,
    },

    eventsRadiusTitle: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',

    },

    events: {
        flex: 3,
        marginBottom: 50,
    },

    category: {
        marginTop: 10,
        marginBottom: 30,
        flexDirection: 'row',
    },

    category__items: {
        paddingHorizontal: 10,
    }
});

export default SearchScreen;