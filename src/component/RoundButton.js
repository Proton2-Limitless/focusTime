import React from 'react';
import { Text, View,StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../utilities/colorsAndSizes';

export const RoundButton = ({
    size = 125,
    onPress,
    title
})=> {
    return(
        <TouchableOpacity style={styles(size).button} onPress={onPress}>
            <Text style={styles(size).title}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = (size) => StyleSheet.create({
    button:{
        height:size,
        width:size,
        borderRadius:size / 2,
        borderWidth:2,
        borderColor:colors.white,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:size / 4,
        color:colors.white
    }
})