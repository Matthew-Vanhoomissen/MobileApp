import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
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
    const [time, setTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    //boolean if running
    const [running, setRunning] = useState(false);
    //store if the timer has run 
    const [hasRun, setHasRun] = useState(false);
    //store interval
    const interval = useRef(null);
    //store begin time
    const startTime = useRef(0);
    //List height
    const ITEM_HEIGHT = 60;
    //list
    const numbers = [...Array.from({ length: 60}, (_, i) => i), null, null];
    const hrs = [...Array.from({ length: 24}, (_, i) => i), null, null];
    //scroll ref
    const scrollRefS = useRef(null);
    const scrollRefM = useRef(null);
    const scrollRefH = useRef(null);
    

    

  const startTimer = () => {
    
    const currentTime = seconds + minutes*60 + hours*3600;
    startTime.current = Date.now();
    
    setTime(currentTime);
    
    

    setTimeout(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      setTime(currentTime - elapsed);
    }, 100);

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

    setTime(0);
    
    setRunning(false);
    setHasRun(false);
    setSeconds(0);
    setMinutes(0);
  };



  const setScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSeconds(numbers[index]);
  }

  const setScrollM = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setMinutes(numbers[index]);
  }

  const setScrollH = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setHours(hrs[index]);
  }

  const secs = Math.floor(time);
  const mins = Math.floor(time/60);
    


  return (
    <ThemedView style={styles.container}>

    <ThemedView style={[{backgroundColor:'white', position:'absolute', justifyContent: 'center', alignItems: 'center', height: '7%', width: '100%'}]}>
      <ThemedText style={[{color: 'black', fontSize: 18}]}>Timer</ThemedText>
      
    </ThemedView>
    {!running && !hasRun ?
    <ThemedView style={styles.timer}>
      <ScrollView ref={scrollRefS} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScroll}>
        {numbers.map((num, idx) => (
        <ThemedView key={idx} style={[{height: 60}]}>
          <ThemedText style={[time === num]}>
            {num}
          </ThemedText>
        </ThemedView>
        ))}
      </ScrollView>
      <ScrollView ref={scrollRefM} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScrollM}>
        {numbers.map((num, idx) => (
        <ThemedView key={idx} style={[{height: 60}]}>
          <ThemedText style={[time === num]}>
            {num}
          </ThemedText>
        </ThemedView>
        ))}
      </ScrollView>
      <ScrollView ref={scrollRefH} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScrollH}>
        {hrs.map((num, idx) => (
        <ThemedView key={idx} style={[{height: 60}]}>
          <ThemedText style={[time === num]}>
            {num}
          </ThemedText>
        </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>

    : <ThemedView style={styles.timer}>
        <ThemedText>{secs}</ThemedText>
      </ThemedView>}
    <ThemedView style={styles.buttons}>
      {running ? (<><TouchableOpacity onPress={pauseTimer}><ThemedText>Pause</ThemedText></TouchableOpacity></>) : (hasRun ? (<><TouchableOpacity onPress={startTimer}><ThemedText>Resume</ThemedText></TouchableOpacity></>):(<><TouchableOpacity onPress={startTimer}><ThemedText>Start</ThemedText></TouchableOpacity></>))}
      
      
      <TouchableOpacity onPress={cancelTimer}><ThemedText>Cancel</ThemedText></TouchableOpacity>
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

    top: '50%',
    left: '30%',
    overflow: 'hidden',
    height: 180,
    width: '50%',
    flexDirection: 'row',
    
    
  },
  buttons: {
  
    top: '0%',
    left: '30%',
  }
})