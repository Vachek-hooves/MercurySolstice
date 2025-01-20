import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DiaryDetails = ({route}) => {
  const {mood} = route.params;
  console.log(mood);
  return (
    <View>
      <Text>DiaryDetails</Text>
    </View>
  );
};

export default DiaryDetails;

const styles = StyleSheet.create({});
