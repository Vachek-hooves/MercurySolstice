import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ActivityTimer = ({route}) => {
  const {title} = route.params;
  console.log(title);
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

export default ActivityTimer

const styles = StyleSheet.create({})