import { StyleSheet, Image, View } from 'react-native'
import {Link} from 'expo-router'
import WClock from '../assets/img/wclock.png'
//Themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

const Home = () => {
  return (
    <ThemedView style={styles.container}>
    
      <ThemedText>A New and Updated</ThemedText>
      <ThemedText>Alarm and Clock App</ThemedText>

    <ThemedView style={[{backgroundColor: 'blue', position:'absolute', bottom:0, left:0,width:100,height:100,}]}>
      <Link href="/timer">timer</Link>
      <Link href="/clock"><Image source={WClock} /></Link>
      <Link href="/stopwatch">stopwatch</Link>
    </ThemedView>
      
      
      
    
    </ThemedView>
    
    
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        
    },
})