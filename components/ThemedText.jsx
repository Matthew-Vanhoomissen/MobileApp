import { Text } from 'react-native'
import React, { Children } from 'react'

const ThemedText = ({style, ...props}) => {
  return (
    <Text style={[{
        color: 'white',
    }, style]}
    {...props}/>
        
    
    
      
    
  )
}

export default ThemedText