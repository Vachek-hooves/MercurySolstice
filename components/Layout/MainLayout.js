import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const MainLayout = ({children}) => {
  return (
    <LinearGradient
      colors={['#00336E', '#00336C', '#002E62', '#002957', '#00254F']}
      style={styles.container}>
      {/* <View style={styles.content}> */}

      {children}
      {/* </View> */}
    </LinearGradient>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
