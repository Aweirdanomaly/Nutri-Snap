import React from 'react'
import {View,Text,Button} from 'react-native'


export default ({navigation})=>{
    return (
        <>
            <Text>Welcome</Text>
            <Button onPress={()=>navigation.navigate('mainFlow')} title={"Go to main flow"}/>
        </>
    );
}