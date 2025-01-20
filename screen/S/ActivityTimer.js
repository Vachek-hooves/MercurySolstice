import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import MainLayout from '../../components/Layout/MainLayout';
import CurrentDate from '../../components/ui/CurrentDate';

const ActivityTimer = ({ route }) => {
  const { title } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const progressRef = useRef();
  const timerRef = useRef(null);
  

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (!isPlaying) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
    setTime(0);
    progressRef.current?.reAnimate(0);
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        {/* <View style={styles.dateWrapper}>
          <CurrentDate />
        </View> */}
        
        <LinearGradient
          colors={['#2D60E3', '#19357D']}
          style={styles.timerContainer}>
          <View style={styles.titleContainer}>
            <LinearGradient
              colors={['#FFDD56', '#FE9F50']}
              style={styles.titleButton}>
              <Text style={styles.titleText}>{title}</Text>
            </LinearGradient>
          </View>

          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              ref={progressRef}
              size={280}
              width={15}
              fill={0}
              rotation={0}
              tintColor="#00B7FF"
              backgroundColor="#19357D"
              lineCap="round">
              {() => (
                <Text style={styles.timerText}>{formatTime(time)}</Text>
              )}
            </AnimatedCircularProgress>

            <View style={styles.controlsContainer}>
              <TouchableOpacity onPress={toggleTimer}>
                <LinearGradient
                  colors={['#FFDD56', '#FE9F50']}
                  style={styles.controlButton}>
                  <Text style={styles.controlButtonText}>
                    {isPlaying ? '⏸' : '▶️'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={resetTimer}>
                <LinearGradient
                  colors={['#FFDD56', '#FE9F50']}
                  style={styles.controlButton}>
                  <Text style={styles.controlButtonText}>⏹</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </MainLayout>
  );
};

export default ActivityTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateWrapper: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  timerContainer: {
    marginTop: 150,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: -25,
    zIndex: 1,
  },
  titleButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  titleText: {
    color: '#001432',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFDD56',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlButtonText: {
    fontSize: 24,
    color: '#001432',
  },
});