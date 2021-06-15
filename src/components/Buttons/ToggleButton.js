import * as React from 'react';
import { StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper';
import {theme} from "../../constants/colors"

const ToggleButton = ({title,key,selected,onPress,onClose}) => {

    // const [selected, setSelected] = React.useState(false)
    // const [items, setItems] = React.useState([])

    const toggleHandler = () => {
        setSelected(true)
        setItems(...items,title)
    }

    const closeHandler = () => {
        setSelected(false)
        console.log(items)
    }

    return(
        <Chip
        mode="flat"
        style={styles.button}
        key={key}
        onPress={onPress}
        selected={selected}
        onClose={onClose}

        // Styling
        >
        {title}
        </Chip>
    )
};

const styles = StyleSheet.create({
    button:{
        margin:10,
    }
})

export default ToggleButton;