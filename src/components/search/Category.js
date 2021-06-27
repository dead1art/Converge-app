import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { theme,tabBar } from '../../constants/colors'

const Category = ({id,name,toggle,disabled}) => {
    return (
        <View style={styles.container}> 
                    <Button
                    type="clear"
                    key={id}
                    // icon={
                    // <MaterialIcons
                    // name="sports-football"
                    // />
                
                    //     }
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
                        disabled={disabled}
                        onPress={toggle}
                        title={name} />
                </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
    },
})

export default Category
