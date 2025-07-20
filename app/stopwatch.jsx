import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'

const Stopwatch = () => {
  return (
    <View>
      <Text>Stopwatch</Text>

      <Link href="/timer">timer</Link>
      <Link href="/clock">clock</Link>
      <Link href="/">alarm</Link>
    </View>
  )
}

export default Stopwatch

const styles = StyleSheet.create({})