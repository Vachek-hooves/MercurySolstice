import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import CustomBtn from '../../components/ui/CustomBtnNav';

const GameWelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Sun Image */}
      <View style={styles.sunContainer}>
        <Image
          source={require('../../assets/ui/Sun.png')}
          style={styles.sunImage}
        />
      </View>

      {/* Instructions Text */}
      <Text style={styles.instructionsText}>
        Jump on clouds and collect stars.{'\n'}
        Press on jump button on the screen to jump{'\n'}
        and catch the star on cloud!{'\n'}
        Earn star points for every cloud you find star.{'\n\n'}
        Ready to conquer the sky?
      </Text>

      {/* Time to Shine Button */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Game')}
        style={styles.startButton}>
        <Text style={styles.buttonText}>Time to shine</Text>
      </TouchableOpacity> */}
      <CustomBtn
        onPress={() => navigation.navigate('Game')}
        title="Time to shine"
      />

      {/* Radiance Depot Button */}
      <TouchableOpacity style={styles.depotButton}>
        <Text style={styles.depotButtonText}>Read Acricles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002B5C', // Dark blue background
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunContainer: {
    marginBottom: 20,
  },
  sunImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  instructionsText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#FFDD56', // Yellow color
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  depotButton: {
    backgroundColor: '#91203E', // Red color
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 40,
  },
  depotButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameWelcomeScreen;
