import React, {useState,useEffect}  from 'react'
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Button,ScrollView} from 'react-native'
//import ProgressBar from '../components/progress'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import {NavigationEvents} from 'react-navigation';
import ProgressBar from '../components/Progress';
import Entry from '../components/Entry';

const getData = async () =>{

    let res=await AsyncStorage.getItem("foods");
    //console.log(JSON.parse(res));
    if(res){
        return JSON.parse(res);
    }
    return [] 
}



const App = ({navigation}) => {
    [Data, setData] = useState(null);

    [Calories,setCalories]=useState(0);
    [Carbs,setCarbs]=useState(0);
    [Fat,setFat]=useState(0);
    [Protein,setProtein]=useState(0);
    //[isNew,setNew]=useState(true);

    useEffect(()=>{
        //console.log("Here");
        (async ()=>{
            setData(await getData());
            let cal=0;
            let carbs=0;
            let fat=0;
            let prot=0;
            for(let i=0;i<Data.length;i++){
              cal+=Data[i]["data"]["fields"]["nf_calories"]
              fat+=Data[i]["data"]["fields"]["nf_total_fat"]
              carbs+=Data[i]["nutrients"]["CHOCDF"]
              prot+=Data[i]["nutrients"]["PROCNT"]
            }
           
            setCalories(cal);
            setFat(fat);
            setCarbs(carbs);
            setProtein(prot);
            
        })();
    },[navigation.state.params]);
    
    reset=()=>{

      setCalories(0)
      setCarbs(0)
      setFat(0)
      setProtein(0)

    }
  useEffect(()=>{
    (async () => {
      setData(await getData());
    })();

  },[])

     //console.log(Data);   
    return (

     
    
      <SafeAreaView>
         <ProgressBar title={"Calories"} max={2000} progress={Math.round(Calories)} />
         <ProgressBar title={"Carbs"} max={2000} progress={Math.round(Carbs)} />
         <ProgressBar title={"Total Fat"} max={2000} progress={Math.round(Fat)} />
         <ProgressBar title={"Protein"} max={2000} progress={Math.round(Protein)} />

        <NavigationEvents onWillFocus={async ()=>{setData(await getData());}} />
        <ScrollView>
          <FlatList
            data={Data}
            renderItem={({item})=>{

              return (
                <Entry food={item["food"]} calories={item["data"]["fields"]["nf_calories"]} />

            );}}
            keyExtractor={item => item["id"]}

          />
        </ScrollView>
      </SafeAreaView>
    );
  }






  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#ff4500',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
    },
  });
export default App;
