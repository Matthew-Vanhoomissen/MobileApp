import { Switch, StyleSheet, Image, View, TouchableOpacity, Modal, TouchableHighlight, ScrollView, TextInput} from 'react-native'
import {Link} from 'expo-router'
import {useState, useRef} from "react"
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

  const numbers = [null, ...Array.from({ length: 60}, (_, i) => i), null];
  const hrs = [null, ...Array.from({ length: 12}, (_, i) => i + 1), null];
  const amPm = ["","AM", "PM", ""];

  const [text, setText] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  //const [time, setTime] = useState(0);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState("AM");

  const [hourList, setHourList] = useState([]);
  const [minuteList, setMinuteList] = useState([]);
 
  

  const setScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / 60); //60 is the item height
    setPeriod(amPm[index + 1])
  }
  const setScrollM = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / 60);
    setMinutes(numbers[index + 1])
  }
  const setScrollH = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / 60);
    setHours(hrs[index + 1])
  }
  

  const addAlarm = () => {
    let offset = 0;
    {period === "PM" ? offset = 12 : offset}
    setHourList(prev => [...prev, hours + offset]);
    setMinuteList(prev => [...prev, minutes]);

    setMinutes(0);
    setHours(1);
    setPeriod("AM");
    setVisible(false);
  }

  
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
    <ThemedView style={styles.alarms}>
      <ScrollView>
        {hourList.map((num, index) => (
          <ThemedView key={index} style={[{height: 60, borderBottomColor: '#555555', borderBottomWidth: '1'}]}>
            <ThemedText style={[{fontSize: 35}]}>{num > 12 ? num - 12 : num}:{minuteList[index] < 10 ? "0" : ""}{minuteList[index]} {num < 13 ? "AM" : "PM"}</ThemedText>
            <ThemedText>Name</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>

    <ThemedView style={[{backgroundColor: 'black'}]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        
        
        <ThemedView style={styles.newPanel}>
          
          <TouchableOpacity onPress={() => setVisible(false) }><ThemedText style={[{top: '15'}]}>    Back</ThemedText></TouchableOpacity>
          <ThemedText>                                                                         </ThemedText>
          <TouchableOpacity onPress={() => addAlarm() } ><ThemedText style={[{top: '15'}]}>Confirm</ThemedText></TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.alarm}>
      
          <ScrollView ref={scrollRefH} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScrollH}>
            {hrs.map((num, idx) => (
            <ThemedView key={idx} style={[{height: 60, backgroundColor: '#686464ff', width: '16', left: '20'}]}>
              <ThemedText>
                  {num}
              </ThemedText>
            </ThemedView>
            ))}
          </ScrollView>
          <ThemedText style={[{fontSize: 30, right: '2', top: '46'}]}> : </ThemedText>
          <ScrollView ref={scrollRefM} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScrollM}>
            {numbers.map((num, idx) => (
            <ThemedView key={idx} style={[{height: 60,  backgroundColor: '#686464ff', width: '18',  left: '20'}]}>
              <ThemedText>
                {num === null ? "" : num < 10 ? "0" + num : num}
              </ThemedText>
            </ThemedView>
            ))}
          </ScrollView>
          <ScrollView ref={scrollRefT} snapToInterval={60} snapToAlignment="center"decelerationRate="fast" scrollEventThrottle={16} onScroll={setScroll}>
            {amPm.map((str, idx) => (
            <ThemedView key={idx} style={[{height: 60,  backgroundColor: '#686464ff', width: '25',  left: '10'}]}>
              <ThemedText>
                {str}
              </ThemedText>
              
            </ThemedView>
            ))}
          </ScrollView>
          
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedView style={[{flexDirection: 'row', backgroundColor: '#686464ff', borderBottomColor: '#555555', borderBottomWidth: 1, height: '40'}]}>
            <ThemedText style={[{top: '5'}]}>Repeating    </ThemedText>
            <Switch value={isEnabled} onValueChange={setIsEnabled} trackColor={{ false: "#767577", true: "#f4f3f4" }}
        thumbColor={isEnabled ? "#767577" : "#f4f3f4"} />
          </ThemedView>
            <TextInput placeholder='Alarm Label: ' value={text} onChangeText={setText}/>
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
      borderTopLeftRadius: 20,   
      borderTopRightRadius: 20,
      backgroundColor: '#555555',
      height: '617',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    },
    label1: {
      flexDirection: 'row',
      top: '33%',
      left: '7%',
      position: 'absolute', 
      backgroundColor: '#555555',
    },
    label2: {
      flexDirection: 'row',
      top: '33%',
      left: '40%',
      position: 'absolute',
      backgroundColor: '#555555',
    },
    label3: {
      flexDirection: 'row',
      top: '33%',
      left: '73%',
      position: 'absolute',
      backgroundColor: '#555555',
    },
    alarm: {
      position: 'absolute',
      top: '30%',
      left: '25%',
      overflow: 'hidden',
      height: '180',
      width: '50%',
      flexDirection: 'row',
      borderRadius: 20,
      
      backgroundColor: '#686464ff',
    },
      buttons: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    
    },
    buttonContainer: {
      position: 'absolute',
     
      alignItems: 'center',
      
      top: 500,
      left: '25%',
      width: '50%',
      height: 80,
      borderRadius: 20,
      justifyContent: 'space-around',
      backgroundColor: '#686464ff',
      
    },
    alarms: {
      top: '100',
      backgroundColor: 'grey',
      left: '20',

    },
    
})