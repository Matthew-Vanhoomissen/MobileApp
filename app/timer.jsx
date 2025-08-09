import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
import { useState, useRef } from 'react'

import WClock from '../assets/img/wclock.png'
import Alarm from '../assets/img/alarm.png'
import Stopwatch from '../assets/img/stopwatch.png'
import TTimer from '../assets/img/timer.png'

//Themed Imports
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'



const Timer = () => {
    //elapsed time
    const [time, setTime] = useState(1000);
    
    //boolean if running
    const [running, setRunning] = useState(false);
    //store if the timer has run 
    const [hasRun, setHasRun] = useState(false);
    //store interval
    const interval = useRef(null);
    //store begin time
    const startTime = useRef(0);

    

  const startTimer = () => {
    const currentTime = time;
    startTime.current = Date.now()

    interval.current = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      setTime(currentTime - elapsed);
    }, 1000);

    setRunning(true);
    setHasRun(true);
  };

  const pauseTimer = () => {
    clearInterval(interval.current);

    setRunning(false);
  };

  const cancelTimer = () => {
    clearInterval(interval.current);

    setTime(1000);
    
    setRunning(false);
    setHasRun(false);
  };

  const secs = Math.floor(time);
  const mins = Math.floor(time/60);
    


  return (
    <ThemedView style={styles.container}>

    <ThemedView style={[{backgroundColor:'white', position:'absolute', justifyContent: 'center', alignItems: 'center', height: '7%', width: '100%'}]}>
      <ThemedText style={[{color: 'black', fontSize: 18}]}>Timer</ThemedText>
      
    </ThemedView>
    <ThemedView style={styles.timer}>
      <ThemedText>{secs}</ThemedText>
      <TouchableOpacity onPress={startTimer}><ThemedText>Start</ThemedText></TouchableOpacity>
      <TouchableOpacity><ThemedText>Pause</ThemedText></TouchableOpacity>
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
        <Image source={TTimer} style={[{width: 32, height: 32}]}/>
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

export default Timer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  timer: {
    flex: 1,
    top: '50%',
    left: '50%',
  }
})