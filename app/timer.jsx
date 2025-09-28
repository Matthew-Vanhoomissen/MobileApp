import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
import { useState, useRef, useEffect } from 'react'
import { Audio } from 'expo-audio'

import WClock from '../assets/img/wclock.png'
import Alarm from '../assets/img/alarm.png'
import Stopwatch from '../assets/img/stopwatch.png'
import TTimer from '../assets/img/timer.png'


//Themed Imports
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'


//Timer that can take input time and count down then alerts when finished
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
    const numbers = [null, ...Array.from({ length: 60}, (_, i) => i), null, null];
    const hrs = [null, ...Array.from({ length: 24}, (_, i) => i), null, null];
    //scroll ref
    const scrollRefS = useRef(null);
    const scrollRefM = useRef(null);
    const scrollRefH = useRef(null);
    
    //sound
    const [sound, setSound] = useState();

    //Plays sound when timer finishes
    const playSound = async () => {
      const {sound: loadedSound } = await Audio.Sound.createAsync(
        require('../assets/birds.mp3'),
        { shouldPlay: true}
      );
      setSound(loadedSound);
      
    };

    useEffect(() => {
      
      return sound
        ? () => {
            sound.unloadAsync(); // cleanup
          }
        : undefined;
    }, [sound]);

    useEffect(() => {
      if (time <= 0 && hasRun) {
        playSound();
      }
    }, [time, hasRun]);

    
  //Starts timer based off input and starts interval
  const startTimer = () => {
    
    const currentTime = time > 0 ? time : seconds + minutes*60 + hours*3600;
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

  //Paused interval
  const pauseTimer = () => {
    clearInterval(interval.current);

    setRunning(false);
  };

  //Cancels timer and resets variables
  const cancelTimer = () => {
    clearInterval(interval.current);

    setTime(0);
    
    setRunning(false);
    setHasRun(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };



  //Scrolling references 
  //adds to the array when submitted
  const setScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSeconds(numbers[index + 1]);
  }

  const setScrollM = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setMinutes(numbers[index + 1]);
  }

  const setScrollH = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setHours(hrs[index + 1]);
  }



  //Calculating and formatting
  const secs = Math.floor(time) % 60;
  const mins = Math.floor(time/60) % 60;
  const hour = Math.floor(time/3600);

  const mins2 = `${mins < 10 ? '0' : ''}${mins}`;
  const secs2 = `${secs < 10 ? '0' : ''}${secs}`;
  

  const formattedTime = `${hour > 0 ? hour : '00'}:${mins > 0 ? mins2 : '00'}:${secs > 0 ? secs2 : '00'}`


  return (
    <ThemedView style={styles.container}>

    <ThemedView style={[{backgroundColor:'white', position:'absolute', justifyContent: 'center', alignItems: 'center', height: '7%', width: '100%'}]}>
      <ThemedText style={[{color: 'black', fontSize: 18}]}>Timer</ThemedText>
      
    </ThemedView>
    {!running && !hasRun ?
    <ThemedView style={styles.timer}>
      
      <ScrollView ref={scrollRefH} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScrollH}>
        {hrs.map((num, idx) => (
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
      <ScrollView ref={scrollRefS} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScroll}>
        {numbers.map((num, idx) => (
        <ThemedView key={idx} style={[{height: 60}]}>
          <ThemedText style={[time === num]}>
            {num}
          </ThemedText>
          
        </ThemedView>
        ))}
      </ScrollView>
      <ThemedView style={styles.label1}>
        <ThemedText>hours</ThemedText>
      </ThemedView>
      <ThemedView style={styles.label2}>
        <ThemedText>mins</ThemedText>
      </ThemedView>
      <ThemedView style={styles.label3}>
        <ThemedText>secs</ThemedText>
      </ThemedView>
    </ThemedView>

    : <ThemedView style={styles.timeLabel}>
        <ThemedText style={[{fontSize: 40}]}>{formattedTime}</ThemedText>
      </ThemedView>}
    <ThemedView style={styles.buttonContainer}>
      <TouchableOpacity onPress={cancelTimer} style={styles.buttons}><ThemedText>Cancel</ThemedText></TouchableOpacity>
      {running ? (<><TouchableOpacity onPress={pauseTimer} style={styles.buttons}><ThemedText>Pause</ThemedText></TouchableOpacity></>) : (hasRun ? (<><TouchableOpacity onPress={startTimer} style={styles.buttons}><ThemedText>Resume</ThemedText></TouchableOpacity></>):(<><TouchableOpacity onPress={startTimer} style={styles.buttons}><ThemedText>Start</ThemedText></TouchableOpacity></>))}
      
      
      
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
    position: 'absolute',
    top: '25%',
    left: '25%',
    overflow: 'hidden',
    height: 180,
    width: '70%',
    flexDirection: 'row',
    
    
    
  },
  buttons: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    top: '0%',
    left: '0%',
  },
  buttonContainer: {
      position: 'absolute',
     
      alignItems: 'center',
      
      top: 400,
      width: '100%',
      height: 15,
      flexDirection: 'row', 
      justifyContent: 'space-around',
      
  },
  timeLabel: {
    position: 'absolute',
    top: '30%',
    left: '30%',
    
    height: 180,
    width: '70%',
  },  
  label1: {
    flexDirection: 'row',
    top: '33%',
    left: '7%',
    position: 'absolute',
    
  },
  label2: {
    flexDirection: 'row',
    top: '33%',
    left: '40%',
    position: 'absolute',
  },
  label3: {
    flexDirection: 'row',
    top: '33%',
    left: '73%',
    position: 'absolute',
  },
  
})