import React, { useState } from 'react';
import { Text, View,StyleSheet,Platform,Vibration } from 'react-native';
import { Countdown } from '../../component/Countdown';
import { RoundButton } from '../../component/RoundButton';
import { colors, spacing } from '../../utilities/colorsAndSizes';
import { ProgressBar } from 'react-native-paper'
import { Timing } from './Timing';

const CHANGE_TIME = 0.1
export const Timer = ({subject,TimerEnd,clearSubject}) => {
    const [minutes,setMinutes] = useState(CHANGE_TIME)
    const [pause,setpause] = useState(false)
    const [progress,setProgress] = useState(null)

    const onProgress = (progress)=> {
        setProgress(progress)
    }
    const changeTime = (min)=> {
        setMinutes(min)
        setpause(false)
        setProgress(1)
    }
    
    const onEnd =()=> {
        vibrate
        setMinutes(CHANGE_TIME)
        setpause(false)
        setProgress(1)
        TimerEnd()
    }

    const vibrate = ()=>{
        if(Platform.OS === 'ios'){
            const interval = setInterval(()=>Vibration.vibrate(),1000)
            setTimeout(()=>clearInterval(interval),10000)
        }
        else{
            Vibration.vibrate(10000)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown isPause={pause} 
                onProgress={onProgress}
                minutes={minutes}
                onEnd={onEnd} />
            </View>
            <View style={styles.textwrap}>
                <View style={{flex:0.3,alignItems:'center'}}>
                    <Text style={styles.textfocus}>Focusin On</Text>
                    <Text style={styles.focusText}>{subject}</Text>
                </View>
                <View style={{flex:0.2}}>
                    <ProgressBar 
                    progress={progress} 
                    color='#5e48e2' 
                    style={{height:10}} />
                </View>
                <View style={{flex:0.5,paddingBottom:16,flexDirection:'row'}}>
                    <Timing changeTime={changeTime} />
                </View>
            </View>
            <View style={{flex:0.25,alignItems:'center'}}>
                {
                    pause ? (
                    <RoundButton title='pause' onPress={()=>{
                        setpause(false)}} /> ) : (
                    <RoundButton title='start' onPress={()=>{
                        setpause(true)}} /> )
                }
            </View>
            <View >
                <RoundButton title='-' size={50}
                 onPress={()=>clearSubject()}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    countdown:{
        flex:0.4,
        justifyContent:'center',
        alignItems:'center'
    },
    textwrap:{
        flex:0.3,
    },
    textfocus:{
        fontSize:spacing.md,
        color:colors.white
    },
    focusText:{
        fontSize:spacing.md,
        color:colors.white,
        fontWeight:'bold'
    }
})