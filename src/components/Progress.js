import React from 'react'
import {View,StyleSheet,Text,SafeAreaView} from 'react-native'
//import * as Progress from 'react-native-progress';
import { ProgressBar, Colors } from 'react-native-paper';
export default ({title,progress,max})=>{
    return (
        <SafeAreaView>
            <ProgressBar style={styles.progress} progress={(progress/max)} color={Colors.orange50} />
            <Text style={styles.text}>{title} {progress}/{max}</Text>
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    text:{
        color: "#E88B3C",
        fontSize:20,
        marginHorizontal:10
    },
    progress:{
        width:360,
        height:40,
        borderRadius:50

    }
})
/*
export default ({title,progress,max})=>{
    return (
        <SafeAreaView>
            <Progress.bar progress={progress/max} width={300} />
            <Text>{title}   {progress}/{max}</Text>
        </SafeAreaView>
    );
}

*/