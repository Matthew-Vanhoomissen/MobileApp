import { StyleSheet, Image, View, TouchableOpacity, Modal} from 'react-native'
import {Link} from 'expo-router'
import React, {useState} from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler";


import WClock from '../assets/img/wclock.png'
import Alarm from '../assets/img/alarm.png'
import Stopwatch from '../assets/img/stopwatch.png'
import Timer from '../assets/img/timer.png'
//Themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

const Home = () => {
  const [visible, setVisible] = useState(false);
  return (
    <ThemedView style={styles.container}>

    <ThemedView style={[{backgroundColor:'white', position:'absolute', justifyContent: 'center', alignItems: 'center', height: '7%', width: '100%'}]}>
      <ThemedText style={[{color: 'black', fontSize: 18}]}>Alarms</ThemedText>
      
    </ThemedView>

    <ThemedView style={styles.topBar}> 
      <TouchableOpacity onPress={() => setVisible(true)}>
      <ThemedText style={[{fontSize: 40}]}>+</ThemedText>
      </TouchableOpacity>
    </ThemedView>

    <ThemedView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <ThemedView style={styles.newPanel}>
          <ThemedText>Testing</ThemedText>
          <TouchableOpacity onPress={() => setVisible(false)}><ThemedText>Back</ThemedText></TouchableOpacity>
        </ThemedView>
      </Modal>
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

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    topBar: {
      left: '90%',
      top: '60',
      fontSize: '20',
      
    },
    newPanel: {
      top: '100',
      justifyContent: 'flex-end'
    }
})