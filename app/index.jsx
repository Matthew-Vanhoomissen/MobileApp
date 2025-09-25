import { StyleSheet, Image, View, TouchableOpacity, Modal, TouchableHighlight} from 'react-native'
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

  const scrollRefT = useRef(null);
  const scrollRefM = useRef(null);
  const scrollRefH = useRef(null);

    const numbers = [null, ...Array.from({ length: 60}, (_, i) => i), null, null];
    const hrs = [null, ...Array.from({ length: 12}, (_, i) => i), null, null];
    const amPm = ["AM", "PM"];
  return (
    <ThemedView style={styles.container}>

    <ThemedView style={[{backgroundColor:'white', position:'absolute', justifyContent: 'center', alignItems: 'center', height: '7%', width: '100%'}]}>
      <ThemedText style={[{color: 'black', fontSize: 18}]}>Alarms</ThemedText>
      
    </ThemedView>

    <ThemedView style={styles.topBar}> 
      <TouchableOpacity onPress={() => setVisible(false)}>
        <ThemedText style={[{fontSize: 40}]}>-</ThemedText>
      </TouchableOpacity>
      <ThemedText>                                                                                     </ThemedText>
      <TouchableOpacity onPress={() => setVisible(true)}>
      <ThemedText style={[{fontSize: 40}]}>+</ThemedText>
      </TouchableOpacity>
    </ThemedView>

    <ThemedView style={[{backgroundColor: 'black'}]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <ThemedView style={styles.newPanel}>
          <ThemedText>Testing</ThemedText>
          <TouchableOpacity onPress={() => setVisible(false) }><ThemedText>Back</ThemedText></TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.timer}>
      
          <ScrollView ref={scrollRefH} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScrollH}>
            {hrs.map((num, idx) => (
            <ThemedView key={idx} style={[{height: 60}]}>
              <ThemedText>
                {num}
              </ThemedText>
            </ThemedView>
            ))}
          </ScrollView>
          <ScrollView ref={scrollRefM} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScrollM}>
            {numbers.map((num, idx) => (
            <ThemedView key={idx} style={[{height: 60}]}>
              <ThemedText>
                {num}
              </ThemedText>
            </ThemedView>
            ))}
          </ScrollView>
          <ScrollView ref={scrollRefT} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScroll}>
            {amPm.map((str, idx) => (
            <ThemedView key={idx} style={[{height: 60}]}>
              <ThemedText>
                {str}
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
      left: '4%',
      top: '60',
      fontSize: '20',
      flexDirection: 'row',
      
    },
    newPanel: {
      top: '150',
      justifyContent: 'flex-end',
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