import { StyleSheet, Text } from 'react-native'
import {Link} from 'expo-router'

//Themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>A New and Updated</ThemedText>
      <ThemedText>Alarm and Clock App</ThemedText>

      <Link href="/timer">timer</Link>
      <Link href="/clock">clock</Link>
      <Link href="/stopwatch">stopwatch</Link>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})