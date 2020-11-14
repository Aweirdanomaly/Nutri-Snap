import React from 'react'
import {View,Text,Button} from 'react-native'


export default ({navigation})=>{
    return (
        <>
            <Button onPress={()=>navigation.navigate("mainFlow")} title={"Go to main flow"}/>
        </>
    );
}