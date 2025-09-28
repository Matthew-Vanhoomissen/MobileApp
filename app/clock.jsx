import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import {React, useState, useRef, useEffect} from 'react'
import { Swipeable } from "react-native-gesture-handler";
import {Link} from 'expo-router'

import WClock from '../assets/img/wclock.png'
import Alarm from '../assets/img/alarm.png'
import Stopwatch from '../assets/img/stopwatch.png'
import Timer from '../assets/img/timer.png'
//Themed Imports
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

/* Clock page that utilizes Google Maps API to generate time from input city
*/
const Clock = () => {

  const APIKey = "AIzaSyC6U2_01lYxMxl_nWr2XCCLBvB95duuVNc";
  //constants for name, time, and error
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [fTime, setFTime] = useState("");
  const interval = useRef(null);
  const [tList, settList] = useState([]);
  const [cList, setcList] = useState([]);
  const [remoteTime, setRemoteTime] = useState("");
  const [remoteTimeM, setRemoteTimeM] = useState("");
  
  //Start and set a time to current location
  useEffect(() => {

    interval.current = setInterval(() => {
      const temp = new Date(Date.now());
      setRemoteTimeM(temp.getMinutes());
      setRemoteTime(temp.getHours());
      }, 1000);
  }, []);
  //function to get time based on city
  const getTime = async () => {
    
    try {
      
      //Retrieves city data latitude and longitude from city name
      //@throws no city found if nothing is returned
      const geoLoad = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          city
        )}&key=${APIKey}`);
      const geoData = await geoLoad.json();

      if(!geoData.results.length) {
        console.log("No City");
        throw new Error("No City Found");
      }

      const { lat, lng} = geoData.results[0].geometry.location;
      
      //sends lat and lng to google maps API and returns json file which is formatted and returned as data
      const currentTime = Math.floor(Date.now() /1000);
      const timeLoad = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${currentTime}&key=${APIKey}`
      );
      const timeData = await timeLoad.json();
      
      if(timeData.status !== "OK") {
        throw new Error("Timezone API Error");
      }
      
      //Current location time
      const nowTime = (currentTime + timeData.dstOffset + timeData.rawOffset) * 1000;
      
      
      //setTime(locationTime.toLocaleDateString());
      setTime(nowTime);
      
      
      const hours = Math.floor(Math.floor(Math.floor(nowTime/1000)/60)/60) % 24;
      
      //subtracts hours off input city to current time to return offset
      const temp = getHourOffset(remoteTime, hours);
      console.log(temp);
      
      //Offset is stored in an array with the adjacent city String
      settList(prev => [...prev, temp]);
      setcList(prev => [...prev, city]);
      
      
      
      
      
      
      setError("");

    } catch (err) {
      setError(err.message);
      setTime("");
    }
  } 

  //Returns offset of two hours with clock wrapping 
  //@params baseHour is the input city hour and targetHour is the current hour
  //@returns the diff
  function getHourOffset(baseHour, targetHour) {
    
    let diff = (targetHour - baseHour); 

    // if difference is > 12, take the negative shorter path
    if (diff > 12) {
      diff -= 24; 
    }
    if (diff < -12) {
      diff += 24;
    }

    return diff;
  }

  //Removes city and time from their arrays
  //@params city and time
  
  const deleteCity = (inputCity, inputTime) => {
    setcList(prev => prev.filter(item => item !== inputCity))
    settList(prev => prev.filter(item => item !== inputTime))
    
  }

  //Renders delete button when swiped left
  //@params input city and time to be passed in the delete function
  const renderRightActions = (inputCity, inputTime) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCity(inputCity, inputTime)}>
        <ThemedText>Delete</ThemedText>
    </TouchableOpacity>

  )
  

  return (
    <ThemedView style={styles.container}>

    <ThemedView style={[{backgroundColor:'white', position:'absolute', justifyContent: 'center', alignItems: 'center', height: '7%', width: '100%'}]}>
      <ThemedText style={[{color: 'black', fontSize: 18}]}>World Clock</ThemedText>
      
    </ThemedView>
    <ThemedView style={styles.topTime}>
      <ThemedText style={styles.clockList}>Current Time: {remoteTime > 12 ? remoteTime - 12 : remoteTime}:{remoteTimeM < 10 ? "0" : ""}{remoteTimeM}{remoteTime >= 12 ? "pm" : "am" }</ThemedText>
    </ThemedView>
    
    <ThemedView style={styles.time}>
      
      <TextInput
        type="text"
        value={city}
        onChangeText={setCity}
        placeholder="City Name"
        style={styles.timeText}/>
      <ThemedText>   </ThemedText>
      <TouchableOpacity onPress={() => {getTime()}}><ThemedText style={styles.timeText2}>Enter</ThemedText></TouchableOpacity>

      
    </ThemedView>

    <ThemedView style={styles.time2}>
      
      <ScrollView>
      
      {Array.isArray(tList) && tList.map((h, i) => (
        <Swipeable key={i} renderRightActions={() => renderRightActions(cList[i], h)}>
          <ThemedView style={styles.list}>
            <ThemedText style={styles.clockList}>{cList[i]}</ThemedText>
            <ThemedText key={i} style={styles.clockList}>     {h + remoteTime > 12 ? (h + remoteTime > 24 ? h + remoteTime - 24 : (h + remoteTime - 12)) : h + remoteTime}:{remoteTimeM < 10 ? "0" : ""}{remoteTimeM}{h + remoteTime > 23 ? (h + remoteTime - 24 >= 12 ? "pm" : "am") : (h + remoteTime >= 12 ? "pm" : "am")}      </ThemedText>
          
          </ThemedView>
        </Swipeable>
      ))}
      </ScrollView>
      
    </ThemedView>

    <ThemedView style={[{position: 'absolute', height:'10%', width: '100%', bottom:0, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}]}>

    
      <Link href="/clock">
      <View style={[{alignItems: 'center'}]}>
        <Image source={WClock} style={[{width: 32, height: 32}]}/>
        <ThemedText style={[{color: 'black'}]}>Clock</ThemedText>
      </View>
      </Link>
      
    
    
      <Link href="/timer">
      <View style={[{alignItems: 'center'}]}>
        <Image source={Timer} style={[{width: 32, height: 32}]}/>
        <ThemedText style={[{color: 'black'}]}>Timer</ThemedText>
      </View>
      </Link>
    
      <Link href="/stopwatch">
      <View style={[{alignItems: 'center'}]}>
        <Image source={Stopwatch} style={[{width: 32, height: 32}]}/>
        <ThemedText style={[{color: 'black'}]}>Stopwatch</ThemedText>
      </View>
      </Link>
    
      <Link href="/">
      <View style={[{alignItems: 'center'}]}>
        <Image source={Alarm} style={[{width: 32, height: 32}]}/>
        <ThemedText style={[{color: 'black'}]}>Alarm</ThemedText>
      </View>
      </Link>
    

    </ThemedView>
      
    
    </ThemedView>
  )
}

export default Clock

const styles = StyleSheet.create({
    container: {
    flex: 1,
   
  },
    time: {
      top: '5%',
      left: '3%',
      width: '100%',
      flexDirection: 'row',
      
      
    },
    timeText: {
      fontSize: 20,
      
      borderColor: 'black', // Outline color
      borderWidth: 1,      // Outline width
      borderRadius: 5,
      paddingHorizontal: 5,
      backgroundColor: 'light-grey',
      width: 300,
    },
    timeText2: {
      fontSize: 20,
      
      borderColor: 'black', // Outline color
      borderWidth: 1,      // Outline width
      borderRadius: 5,
      paddingHorizontal: 5,
      backgroundColor: 'light-grey',
      
    },
    time2: {
      top: '20%',
      left: '10%',
      flexDirection: 'row',
      width: 350,
      height: 450,
    },
    clockList: {
      fontSize: 30,
      marginBottom: 10,

    },
    topTime: {
      top: '15%',
      left: '3%',
    },
    list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    deleteButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
    }

})