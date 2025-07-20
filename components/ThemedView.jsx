import {View} from 'react-native'
import React from 'react'

const ThemedView = ({ style, ...props}) => {
  return (
    <View style={[{
        backgroundColor: 'grey',
        


    }, style]}
    {...props}
    />
      
    
  )
}

export default ThemedView