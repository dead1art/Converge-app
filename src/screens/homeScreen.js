import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, Button, StyleSheet, Image, Dimensions, StatusBar} from 'react-native';
import { ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico'
import data from '../../assets/data'

const homeScreen = ()=> {

    let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

    if (!fontsLoaded) {
     return <AppLoading />;
    }

    else

    return(

        <SafeAreaView style={styles.container}>
            

            <View style={styles.header}>

                <Text style={styles.logo}> Converge </Text> 
            
            </View>

        

            <View style={styles.section}> 
                
                <Text style={styles.label}> Latest blogs </Text>
                <ScrollView>

                {data.map((data) => (
                    <Feed key={data.id} info={data}/>
                    ))}
                
                </ScrollView>
            </View>

    

        </SafeAreaView>
    );
};

function Feed(props) {
    const {id, avatar, name, caption, img, event} = props.info;
    
    return(


        <View style={styles.feed}>

            <View style={styles.details}> 

            <Image source={{ uri : avatar}}
                   style={styles.avatar}
                   />

            <Text style={styles.name}>{name}</Text>

            </View>


            <View style={styles.content}>
            
            <Text style={styles.caption}>{caption}</Text>

            {img!=null && <Image source={{ uri : img}}
                   style={styles.image}
                   /> }
            <Text style={styles.event}> #{event} </Text>
            
            </View>


        </View>


    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        width: '100%',
        backgroundColor: 'white',
        height: Dimensions.get('screen').height,
    },

    header: {
        flex: 1,
        padding:10,
    },

    section: {
        flex: 8,
        marginBottom:60,
        paddingTop: 20,
    },

    feed:{
        padding: 20,
        marginHorizontal: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#e3eaf4',

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
        fontSize: 40,
        fontFamily: 'Pacifico_400Regular',
        marginBottom: 10,
        color: '#2663FF',
        paddingBottom: 20,
    },
    label:{
        fontSize: 18,
        color: 'gray',
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