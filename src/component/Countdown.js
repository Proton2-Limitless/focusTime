import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { colors, spacing } from '../utilities/colorsAndSizes';

const minToMilliSec = (min) => min * 1000 * 60

export const Countdown = ({
    minutes=0.1,
    isPause,
    onProgress,
    onEnd
}) => {
    const [millis,setMillis] = useState(null)

    const min = Math.floor(millis/1000/60) % 60
    const sec = Math.floor(millis/1000) % 60

    const formatTime = time => time < 10 ? `0${time}` : time

    const interVal = React.useRef(null)

    const countdown = ()=>{
        setMillis((min)=>{
            if(min === 0){
                clearInterval(interVal.current)
                return min
            }
            const minLeft = min - 1000
            return minLeft
        })
    }

    
    useEffect(()=>{
        setMillis(minToMilliSec(minutes))
    },[minutes])

    useEffect(()=>{
        if(!isPause){
            if(interVal.current) clearInterval(interVal.current)
            return 
        }
        interVal.current = setInterval(countdown,1000)
        return ()=> clearInterval(interVal.current)
    },[isPause])

    useEffect(()=>{
        if(millis === 0) {
            onEnd()
        }
        onProgress(millis / minToMilliSec(minutes))
    },[millis])

    return (
    <View>
        <Text style={styles.textWrapper}>{formatTime(min)}:{formatTime(sec)}</Text>
    </View>
    )
};
const styles = StyleSheet.create({
    textWrapper:{
        fontSize:spacing.xxxl,
        backgroundColor:colors.lightBlue,
        color:colors.white,
        padding:8,
        fontWeight:'bold'
    }
})
