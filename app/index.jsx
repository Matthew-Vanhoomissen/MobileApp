import { StyleSheet, Text, View } from 'react-native'


const Home = () => {
  return (
    <View style={styles.container}>
      <Text>A New and Updated</Text>
      <Text>Alarm and Clock App</Text>
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