import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'

//Themed Imports
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

const Timer = () => {
  return (
    <ThemedView style={styles.container}>
      <Text>Time</Text>

      <Link href="/stopwatch">stopwatch</Link>
      <Link href="/clock">clock</Link>
      <Link href="/">alarm</Link>
    </ThemedView>
  )
}

export default Timer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})