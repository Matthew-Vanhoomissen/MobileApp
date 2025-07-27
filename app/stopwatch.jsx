import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'

import WClock from '../assets/img/wclock.png'
import Alarm from '../assets/img/alarm.png'
import Stopwatch from '../assets/img/stopwatch.png'
import Timer from '../assets/img/timer.png'
//Themed Imports
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
const Stopwatch = () => {
  return (
    <ThemedView style={styles.container}>
      <Text>Stopwatch</Text>

      <Link href="/timer">timer</Link>
      <Link href="/clock">clock</Link>
      <Link href="/">alarm</Link>
    </ThemedView>
  )
}

export default Stopwatch

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})