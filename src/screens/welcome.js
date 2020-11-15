import React from 'react'
import {Text,View,Button,StyleSheet,SafeAreaView,Image} from 'react-native'

export default function App({navigation}) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.image}>
        </View>
        <View style={styles.header}>
          <Text>NutriSnap</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.steps}>1. Snap a picture of your food</Text>
          <Text style={styles.steps}>
            2. NutriSnap recognizes the food and tracks calories, carbs, fats,
            protein
          </Text>
          <Text style={styles.steps}>
            3. Get notified when reaching your limits
          </Text>
        </View>
        <View>
          <Button onPress={() => {navigation.navigate('mainFlow')}} title="Start" />
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E88B3C",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {},
    image: {
      flex: 1,
      width: 50,
      resizeMode: "contain",
    },
    header: {},
    card: {
      alignItems: "center",
      color: "white",
      fontSize: 40,
    },
    steps: {
      fontSize: 20,
      alignContent: "center",
      color: "white",
    },
  });