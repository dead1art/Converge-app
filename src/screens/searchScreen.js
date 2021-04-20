import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { DarkTheme } from '@react-navigation/native';

const SearchScreen = ()=> {

    const [search, setSearch] = useState('')
    return(
        <SafeAreaView style={styles.container}>


        <View style={styles.header}>

                <SearchBar
                theme={DarkTheme}
                inputStyle={{fontSize: 20, color: 'black'}}
                containerStyle={{
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

            <Text>{search} </Text>
        </View>

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
        display:'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal:10,
    },

    footer:{
        flex:5,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: 'white',
    },
    input:{
        backgroundColor: '#f3f3f3',
        borderRadius: 30,
        color: 'black',
        padding: 5,
        paddingHorizontal:10,
    },  
    button:{
        marginRight:50,
    },
});

export default SearchScreen;