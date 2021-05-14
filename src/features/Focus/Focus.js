import React, { useState } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundButton } from '../../component/RoundButton';
import { colors, spacing } from '../../utilities/colorsAndSizes';

export const Focus = ({addFocusObject}) => {
    const [item,setItem] = useState(null)
    
    return (
    <View style={styles.container}>
        <Text style={styles.textHeader}>What would you like to focus on?</Text>
        <View style={{paddingTop:spacing.md,flexDirection:'row',alignItems:'center'}}>
            <TextInput style={{flex:1}}
            onChangeText={(event)=>{
                setItem(event)
            }} />
            <View style={{paddingLeft:8}}>
                <RoundButton title='+' size={50} onPress={()=>addFocusObject(item)} />
            </View>
        </View>
        {/* <Text style={styles.textHeader}>{arrayItem}</Text> */}
    </View>
)};

const styles = StyleSheet.create({
    container:{
        flex:0.5,
        padding:spacing.sm,
        justifyContent:'center'
    },
    textHeader:{
        fontSize:spacing.lg,
        color:colors.white
    }
})