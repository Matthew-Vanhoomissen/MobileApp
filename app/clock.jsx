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

const Clock = () => {
  return (
    <ThemedView style={styles.container}>
      <Text> Clock </Text>

      <Link href="/timer">timer</Link>
      <Link style={styles.black} href="/stopwatch">stopwatch</Link>
      <Link href="/">alarm</Link>
    </ThemedView>
  )
}

export default Clock

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})