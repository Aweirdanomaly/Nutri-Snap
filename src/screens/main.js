import React, {useState,useEffect}  from 'react'
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,ScrollView,TouchableOpacity} from 'react-native'
//import ProgressBar from '../components/progress'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import {NavigationEvents} from 'react-navigation';
import ProgressBar from '../components/Progress';
import Entry from '../components/Entry';
import {Header,Button} from 'react-native-elements';
import {AntDesign,FontAwesome} from "@expo/vector-icons";
import { DataTable } from 'react-native-paper';

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
    
    reset=async ()=>{
      await AsyncStorage.removeItem('foods');
      setCalories(0)
      setCarbs(0)
      setFat(0)
      setProtein(0)
      setData([]);
    }
  useEffect(()=>{
    (async () => {
      setData(await getData());
    })();

  },[])

    const ButtonReset=()=>{
      return (
        <TouchableOpacity onPress={()=>reset()}>
            <AntDesign name="reload1" size={24} color="white" />
        </TouchableOpacity>
      );
    }
     //console.log(Data);   
    return (
   
     

      <View>
         <Header style={styles.bar} backgroundColor={"#ff4500"} leftComponent={ButtonReset} centerComponent={{text:"NUTRISNAP",style:{color:"#fff",fontSize:30}}} />
         <ProgressBar title={"Calories"} max={2000} progress={Math.round(Calories)} />
         <ProgressBar title={"Carbs"} max={2000} progress={Math.round(Carbs)} />
         <ProgressBar title={"Total Fat"} max={2000} progress={Math.round(Fat)} />
         <ProgressBar title={"Protein"} max={2000} progress={Math.round(Protein)} />
         
        <NavigationEvents onWillFocus={async ()=>{setData(await getData());}} />
        
        <ScrollView>
          <DataTable>
            <DataTable.Header>
            <DataTable.Title>Food</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
            <DataTable.Title numeric>Fat</DataTable.Title>
            </DataTable.Header>
          <FlatList
            data={Data}
            renderItem={({item})=>{

              return (
                <DataTable.Row>
                  <DataTable.Cell>{item["food"]}</DataTable.Cell>
              <DataTable.Cell numeric>{Math.round(item["data"]["fields"]["nf_calories"])}</DataTable.Cell>
              <DataTable.Cell numeric>{Math.round(item["data"]["fields"]["nf_total_fat"])}</DataTable.Cell>
                </DataTable.Row>
               
            );}}
            keyExtractor={item => item["id"]}

          />
          </DataTable>
        </ScrollView>
      </View>
   
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
    bar:{
      fontSize:50
    },
    button:{
      
    }
  });

App.navigationOptions={
  tabBarIcon: ({color,size})=>(
    <FontAwesome name="home" size={40} color="orange" />
  ),
  tabBarOptions:{
    showLabel:false
  }
}

export default App;
