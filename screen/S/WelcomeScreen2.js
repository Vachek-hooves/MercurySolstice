import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomBtn from '../../components/ui/CustomBtnNav';
import MainLayout from '../../components/Layout/MainLayout';

const WelcomeScreen2 = ({navigation}) => {
  return (
    <MainLayout>
      {/* <LinearGradient colors={['#001B3B', '#001432']} style={styles.container}> */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/ui/Sun.png')}
          style={styles.sunImage}
        />
        <Text style={styles.title}>MERCURY</Text>
        <Text style={styles.subtitle}>SOLSTICE</Text>

        <Text style={styles.description}>
          Mercury Solstice is a mobile app designed to help users find balance
          between work, rest, and activity by aligning with the natural rhythms
          of the sun. The app visualizes progress through solar metaphors,
          offering personalized recommendations to boost productivity and
          restore energy.
        </Text>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <LinearGradient
            colors={['#FFDD56', '#FE9F50']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}>
            <Text style={styles.buttonText}>Begin</Text>
          </LinearGradient>
        </TouchableOpacity> */}
        <CustomBtn navTo={'LogIn'} title={'Begin'} />
      </View>
      {/* </LinearGradient> */}
    </MainLayout>
  );
};

export default WelcomeScreen2;

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunImage: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    opacity: 0.9,
  },
  //   button: {
  //     borderRadius: 50,
  //     width: 280,
  //     shadowColor: '#000000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 4,
  //     },
  //     shadowOpacity: 0.25,
  //     shadowRadius: 9.9,
  //     elevation: 8,
  //   },
  //   buttonText: {
  //     paddingVertical: 16,
  //     paddingHorizontal: 64,
  //     color: '#001432',
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //     textAlign: 'center',
  //     textShadowColor: '#FBFBFB',
  //     textShadowOffset: {
  //       width: 0,
  //       height: 4,
  //     },
  //     textShadowRadius: 6.5,
  //   },
});
