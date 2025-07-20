import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
const Timer = () => {
  return (
    <View>
      <Text>Time</Text>

      <Link href="/stopwatch">stopwatch</Link>
      <Link href="/clock">clock</Link>
      <Link href="/">alarm</Link>
    </View>
  )
}

export default Timer

const styles = StyleSheet.create({})