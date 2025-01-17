import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect, useRef} from 'react';

const LOGO = require('../../assets/ui/logo.png');
const SUN = require('../../assets/ui/Sun.png');

const WelcomeScreen = ({navigation}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000, // 2 seconds
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate('TabNav');
    });
  }, []);

  return (
    <LinearGradient
      colors={['#001B3B', '#001432']}
      style={styles.container}>
      <View style={styles.content}>
        <Image source={SUN} style={styles.sunImage} />
        <Image source={LOGO} style={styles.logoImage} />
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunImage: {
    width: 200,
    height: 200,
    marginBottom: 100,
  },
  logoImage: {
    // width: 200,
    // height: 200,
    marginBottom: 100,
  },
  progressContainer: {
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
});
