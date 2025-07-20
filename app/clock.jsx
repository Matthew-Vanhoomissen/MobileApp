import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'

const Clock = () => {
  return (
    <View>
      <Text> Clock </Text>

      <Link href="/timer">timer</Link>
      <Link href="/stopwatch">stopwatch</Link>
      <Link href="/">alarm</Link>
    </View>
  )
}

export default Clock

const styles = StyleSheet.create({})