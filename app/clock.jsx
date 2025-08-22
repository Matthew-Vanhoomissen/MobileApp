import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import {React, useState, useRef} from 'react'
import {Link} from 'expo-router'

import WClock from '../assets/img/wclock.png'
import Alarm from '../assets/img/alarm.png'
import Stopwatch from '../assets/img/stopwatch.png'
import Timer from '../assets/img/timer.png'
//Themed Imports
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'


const Clock = () => {

  const APIKey = "AIzaSyC6U2_01lYxMxl_nWr2XCCLBvB95duuVNc";
  //constants for name, time, and error
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [fTime, setFTime] = useState("");
  const interval = useRef(null);
  

  //function to get time
  const getTime = async () => {
    
    try {
      
      const geoLoad = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          city
        )}&key=${APIKey}`);
      const geoData = await geoLoad.json();

      if(!geoData.results.length) {
        throw new Error("No City Found");
      }
      const { lat, lng} = geoData.results[0].geometry.location;
      
      const currentTime = Math.floor(Date.now() /1000);
      const timeLoad = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${currentTime}&key=${APIKey}`
      );
      const timeData = await timeLoad.json();
      
      if(timeData.status !== "OK") {
        throw new Error("Timezone API Error");
      }
      const nowTime = (currentTime + timeData.dstOffset + timeData.rawOffset) * 1000;
      
      const locationTime = new Date(
        (nowTime))
      //setTime(locationTime.toLocaleDateString());
      setTime(nowTime);
      const secs = Math.floor(nowTime/1000) % 60;
      const mins = Math.floor(Math.floor(nowTime/1000)/60) % 60;
      const hours = Math.floor(Math.floor(Math.floor(nowTime/1000)/60)/60) % 12;
      setFTime(`${hours}:${mins < 10 ? "0" : ""}${mins}`);
      
      
      
      
      setError("");

    } catch (err) {
      setError(err.message);
      setTime("");
    }
  } 
  const startClock = () => {
    if(interval.current) {
      clearInterval(interval.current);
    }
    getTime();
    interval.current = setInterval(() => {
        getTime();
      }, 1000);
    }
  return (
    <ThemedView style={styles.container}>

    <ThemedView style={[{backgroundColor:'white', position:'absolute', justifyContent: 'center', alignItems: 'center', height: '7%', width: '100%'}]}>
      <ThemedText style={[{color: 'black', fontSize: 18}]}>World Clock</ThemedText>
      
    </ThemedView>
    <ThemedView style={styles.time}>
      
      <TextInput
        type="text"
        value={city}
        onChangeText={setCity}
        placeholder="City Name"
        style={styles.timeText}/>
      <ThemedText>   </ThemedText>
      <TouchableOpacity onPress={startClock}><ThemedText style={styles.timeText2}>Enter</ThemedText></TouchableOpacity>

      
    </ThemedView>
    <ThemedView style={styles.time2}>
      <ThemedText style={styles.clockList}>{city}</ThemedText>
      <ThemedText style={styles.clockList}>{fTime}</ThemedText>
      
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
      top: '10%',
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
      backgroundColor: 'light-grey'
    },
    time2: {
      top: '50%',
      left: '40%',
      flexDirection: 'row',
      width: 300,
    },
    clockList: {
      fontSize: 30,
    },

})