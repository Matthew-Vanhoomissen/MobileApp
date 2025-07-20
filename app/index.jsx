import { StyleSheet, Text, View } from 'react-native'
import {Link} from 'expo-router'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>A New and Updated</Text>
      <Text>Alarm and Clock App</Text>

      <Link href="/timer">timer</Link>
      <Link href="/clock">clock</Link>
      <Link href="/stopwatch">stopwatch</Link>
    </View>
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