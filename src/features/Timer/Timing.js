import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import { RoundButton } from '../../component/RoundButton'

export const Timing = ({changeTime})=>{
    return (
        <>
            <View style={{flex:1,paddingLeft:28}}>
                <RoundButton title='10' size={75} 
                onPress={()=>changeTime(10)} 
                />
            </View>
            <View style={{flex:1,paddingLeft:28}}>
                <RoundButton title='15' size={75} 
                onPress={()=>changeTime(15)} 
                />
            </View>
            <View style={{flex:1,paddingLeft:28}}>
                <RoundButton title='20' size={75} 
                onPress={()=>changeTime(20)} 
                />
            </View>
        </>
    )
}

// const style = StyleSheet.create({

// })