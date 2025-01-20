import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import MainLayout from '../../components/Layout/MainLayout';
import CurrentDate from '../../components/ui/CurrentDate';

const ActivityTimer = ({route}) => {
  const {title} = route.params;
  const TOTAL_SECONDS = 5 * 60; // 45 minutes in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const progressRef = useRef();
  const timerRef = useRef(null);

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    return ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;
  };

  const toggleTimer = () => {
    if (!isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
    setTimeLeft(TOTAL_SECONDS);
    progressRef.current?.reAnimate(0);
  };

  useEffect(() => {
    progressRef.current?.animate(calculateProgress(), 300);
  }, [timeLeft]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <MainLayout>
      <View style={styles.container}>
        {/* <View style={styles.dateWrapper}>
          <CurrentDate />
        </View> */}

        <View style={styles.titleContainer}>
          <LinearGradient
            colors={['#FFDD56', '#FE9F50']}
            style={styles.titleButton}>
            <Text style={styles.titleText}>{title}</Text>
          </LinearGradient>
        </View>
        <LinearGradient
          colors={['#2D60E3', '#19357D']}
          style={styles.timerContainer}>
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              ref={progressRef}
              size={280}
              width={15}
              fill={0}
              rotation={0}
              tintColor="#91203E"
              backgroundColor="#A2FEFB8F"
              lineCap="round">
              {() => (
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
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
    // flex: 1,
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
    backgroundColor: '#2D60E3',
  },
  titleContainer: {
    position: 'absolute',
    top: -25,
    zIndex: 1,
  },
  titleButton: {
    // paddingHorizontal: 30,
    // paddingVertical: 12,
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
    shadowColor: '#A9B2F6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 11,
    elevation: 11,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 14.5,
    elevation: 14.5,
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
