import { StyleSheet, Image, View } from 'react-native'
import {Link} from 'expo-router'
import WClock from '../assets/img/wclock.png'
import Alarm from '../assets/img/alarm.png'
import Stopwatch from '../assets/img/stopwatch.png'
import Timer from '../assets/img/timer.png'
//Themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

const Home = () => {
  return (
    <ThemedView style={styles.container}>

    <ThemedView>
      <ThemedText>A New and Updated</ThemedText>
      <ThemedText>Alarm and Clock App</ThemedText>
    </ThemedView>

    <ThemedView style={[{position: 'absolute', height:'20%', width: '100%', bottom:0, backgroundColor: 'white'}]}>

    <ThemedView style={[{left:0,}]}>
      <Link href="/clock"><Image source={WClock} /></Link>
      <ThemedText style={[{color: 'black'}]}>World Clock</ThemedText>
    </ThemedView>
    <ThemedView style={[{left:100,}]}>
      <Link href="/timer"><Image source={Timer}/></Link>
    </ThemedView>
    <ThemedView style={[{left:200,}]}>
      <Link href="/stopwatch"><Image source={Stopwatch}/></Link>
    </ThemedView>
    <ThemedView style={[{left:300,}]}>
      <Link href="/"><Image source={Alarm}/></Link>
    </ThemedView>

    </ThemedView>
     
    
      
      
      
    
    </ThemedView>
    
    
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
})