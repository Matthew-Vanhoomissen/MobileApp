import { Text } from 'react-native'
import React, { Children } from 'react'

const ThemedTime = ({style, ...props}) => {
  return (
    <Text style={[{
        color: 'white',
        backgroundColor: 'black',
        fontSize: 50
    }, style]}
    {...props}/>
        
    
    
      
    
  )
}

export default ThemedTime