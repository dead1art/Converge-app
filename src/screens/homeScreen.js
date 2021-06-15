import React from 'react';
import { SafeAreaView } from 'react-native';
import { RefreshControl, View, Text, Button, StyleSheet, Image, Dimensions, StatusBar, FlatList} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico'
import data from '../../assets/data';
import {theme} from '../constants/colors'
import { FocusAwareStatusBar } from '../components/statusbar'
import Feed from '../components/Feed'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const homeScreen = ()=> {

    let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

    if (!fontsLoaded) {
     return <AppLoading />;
    }

    else

    return(

        <SafeAreaView style={styles.container}>   

            <View style={styles.section}> 
                
                {/* <Text style={styles.label}> Latest blogs </Text> */}

                <FlatList 
                data={data}
                key={data.id}
                renderItem={({item}) => (
                    <Feed info={item}/>
                    )}
                ListHeaderComponent={header}
                snapToAlignment={"start"}
                showsVerticalScrollIndicator={false} 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                />

                {/* {data.map((data) => (
                    <Feed key={data.id} info={data}/>
                ))} */}
                
            </View>

    <FocusAwareStatusBar style="auto" />

        </SafeAreaView>
    );
};

function header(){
    return(
        <View>
            <View style={styles.header}>

                <Text style={styles.logo}> Converge </Text> 
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        width: '100%',
        alignItems: 'center',
        backgroundColor:'#e8ebf3',
        height: Dimensions.get('screen').height,
    },

    header: {
        flex:1,
        paddingTop: 30,
        backgroundColor: theme.white,
        width: '100%',
        height: '100%',
    },

    section: {
        flex: 6,
        marginBottom:60,
    },

    feed:{
        padding: 20,
        marginHorizontal: 10,
        marginBottom:20,
        borderRadius: 20,
        backgroundColor: theme.white,
        borderColor: '#ecf1f5',
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    details:{
        flexDirection: 'row',
    },
    name:{
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 3,
        marginLeft: 15,
    },
    content:{
        marginTop: 10,
        paddingVertical: 10,
    },
    caption:{
        width: '100%',
        color: 'black',
        marginBottom: 10,
    },
    image:{
        width: 280,
        height: 180,
        borderRadius: 5,
        marginVertical: 10,
    },
    logo:{
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'Pacifico_400Regular',
        marginBottom: 10,
        color: theme.black,
        paddingBottom: 20,
    },
    label:{
        fontSize: 18,
        color: '#bab0b0',
        fontWeight: '700',
        marginLeft: 20,
        marginBottom: 20,
    },

    event: {
        marginTop: 10,
        color: 'gray',
    },
});

export default homeScreen;