import React from 'react'
import { View,Text,FlatList,SafeAreaView,StyleSheet } from 'react-native'
import { RoundButton } from '../../component/RoundButton'
import { colors, spacing } from '../../utilities/colorsAndSizes'

export const FocusHistory = ({focusHistory,Clear})=>{

    const HistoryItem = ({item,index}) => {
        return (
            <Text style={styles.title(item.status)}>{item.subject}</Text>
        )
    }
    return (
        <>
        <SafeAreaView style={{flex:0.5,alignItems:'center'}}>
            {
                !!focusHistory.length && 
                <>
                    <Text style={styles.text}>Items Selected</Text>
                    <FlatList 
                    style={{flex:1}}
                    contentContainerStyle={{flex:1}}
                    data={focusHistory} 
                    renderItem={HistoryItem} />
                    <View>
                        <RoundButton title='Clear' onPress={()=>Clear()} />
                    </View>
                </>
            }
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    text:{
        color:colors.white,
        fontWeight:'bold',
        fontSize:spacing.lg
    },
    title: (status)=>({
        color:status > 1 ? 'red' : 'green',
        fontSize:spacing.md
    })
})