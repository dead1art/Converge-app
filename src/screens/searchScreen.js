import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons"
import { DarkTheme } from '@react-navigation/native';
import { FocusAwareStatusBar } from '../components/statusbar'

const SearchScreen = ()=> {

    const [search, setSearch] = useState('')
    return(
        <SafeAreaView style={styles.container}>


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
                placeholder="Search"
                onChangeText={setSearch}
                value={search}
            />

        </View>

        <View style={styles.footer}>

            <Text style={styles.events}> Events </Text>
        </View>

<FocusAwareStatusBar style="auto" />
        </SafeAreaView>
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

    footer:{
        flex:5,
        alignItems: 'center',
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
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
    events: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});

export default SearchScreen;