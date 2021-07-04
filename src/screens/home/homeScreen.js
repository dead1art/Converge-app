import React from 'react';
import { SafeAreaView } from 'react-native';
import { RefreshControl, View, Text, Button, StyleSheet, Image, Dimensions, StatusBar, FlatList} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico'
import data from '../../../assets/data';
import {theme} from '../../constants/colors'
import { FocusAwareStatusBar } from '../../components/statusbar'
import Feed from '../../components/home/Feed'

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
        backgroundColor:theme.lightaccent,
        height: Dimensions.get('screen').height,
    },

    header: {
        flex:1,
        paddingTop: 20,
        backgroundColor: theme.lightaccent,
        width: '100%',
        height: '100%',
    },

    section: {
        flex: 6,
        marginBottom:60,
    },

    logo:{
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'Pacifico_400Regular',
        marginBottom: 10,
        color: theme.black,
        paddingBottom: 20,
    },
});

export default homeScreen;