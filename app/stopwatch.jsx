import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useState, useRef } from 'react'
import {Link} from 'expo-router'


import WClock from '../assets/img/wclock.png'
import Alarm from '../assets/img/alarm.png'
import SStopwatch from '../assets/img/stopwatch.png'
import Timer from '../assets/img/timer.png'
//Themed Imports
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedTime from '../components/ThemedTime'

const Stopwatch = () => {
  //elapsed time
  const [time, setTime] = useState(0);
  //boolean if running
  const [running, setRunning] = useState(false);
  //store interval
  const interval = useRef(null);
  //store begin time
  const startTime = useRef(0);
  //laps
  const [laps, setLaps] = useState([]);

  const startStopwatch = () => {
    startTime.current = Date.now() - time * 1000;

    interval.current = setInterval(() => {
      setTime(((Date.now() - startTime.current) / 1000));
    }, 100);

    setRunning(true);
  };
  
  const pauseStopwatch = () => {
    clearInterval(interval.current);

    setRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(interval.current);

    setTime(0);
    setLaps([]);
    setRunning(false);
  };

  const setLap = () => {
    const mins = Math.floor(time/60);
    const secs = Math.floor(time*100)/100 % 60;
    const finalTime = `${mins}:${secs < 10 ? '0' : ''}${secs}${secs > 0 ? '' : '.00'}`;

    setLaps(prevLaps => [finalTime, ...prevLaps]);
  };

  const mins1 = Math.floor(time/60);
  const secs1 = Math.floor(time*100)/100 % 60;
  
  
  const finalTime1 = `${mins1}:${secs1 < 10 ? '0' : ''}${secs1}${secs1 > 0 ? '' : '.00'}`;




  return (
    <ThemedView style={styles.container}>

    <ThemedView style={[{backgroundColor:'white', position:'absolute', justifyContent: 'center', alignItems: 'center', height: '7%', width: '100%'}]}>
      <ThemedText style={[{color: 'black', fontSize: 18}]}>Stopwatch</ThemedText>
      
    </ThemedView>

    <ThemedView style={styles.timeContainer}>
      <ThemedTime style={[{backgroundColor: 'grey'}]}>{finalTime1}</ThemedTime>
      
    </ThemedView>
    <ThemedView style={styles.buttonContainer}>
      {running ? (<>
      <TouchableOpacity style={styles.button} onPress={setLap}><ThemedText>Lap</ThemedText></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pauseStopwatch}><ThemedText>Pause</ThemedText></TouchableOpacity></>) 
      : (<> <TouchableOpacity style={styles.button} onPress={resetStopwatch}><ThemedText>Reset</ThemedText></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={startStopwatch}><ThemedText>Start</ThemedText></TouchableOpacity></>
      )}
      

      
    </ThemedView>

    <ThemedView style={styles.lap}> 
    <ScrollView>
      {laps.map((lap, index) => (
        <ThemedText key={index}>Lap {laps.length - index}: {lap}</ThemedText>
      )
    )}
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
        <Image source={SStopwatch} style={[{width: 32, height: 32}]}/>
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

export default Stopwatch

const styles = StyleSheet.create({
    container: {
    flex: 1,
    
  },
    timeContainer: {
      position: 'absolute',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      top: 200,
      left: -100,
      width: 600,
      height: 50,
      backgroundColor: 'grey'
      
  },
    buttonContainer: {
      position: 'absolute',
      flex:1,
      alignItems: 'center',
      
      top: 300,
      width: '100%',
      height: 15,
      flexDirection: 'row', 
      justifyContent: 'space-around',
      
  },
    button: {
      borderRadius: 30,
      width: 60,
      height: 60,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
  },
    lap: {
      width: 120,
      height: 60,
      left: '39%',
      top: 400,
    }
    
})