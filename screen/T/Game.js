import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import LinearGradient from 'react-native-linear-gradient';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const LEVELS = {
  1: {clouds: 10, speed: 1, description: 'Облака движутся медленно'},
  2: {clouds: 15, speed: 1.5, description: 'Облака на разной высоте'},
  3: {clouds: 20, speed: 2, description: 'Бонусные облака +3 ⭐️'},
  4: {clouds: 25, speed: 2.5, description: 'Грозовые облака -3 ⭐️'},
  5: {clouds: 30, speed: 3, description: 'Звёздочки +5 ⭐️'},
  6: {clouds: 35, speed: 3.5, description: 'Повышенная сложность'},
  7: {clouds: 40, speed: 4, description: 'Экспертный уровень'},
  8: {clouds: 50, speed: 4.5, description: 'Мастер облаков'},
  9: {clouds: 60, speed: 5, description: 'Покоритель небес'},
  10: {clouds: 75, speed: 5.5, description: 'Финальное испытание'},
};

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const sunPosition = useRef(new Animated.ValueXY()).current;
  const [clouds, setClouds] = useState([]);

  // Game initialization
  useEffect(() => {
    if (isPlaying) {
      initializeLevel(currentLevel);
    }
  }, [isPlaying, currentLevel]);

  const initializeLevel = level => {
    // Reset game state
    setScore(0);
    setClouds([]);
    sunPosition.setValue({x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT - 100});

    // Generate initial clouds
    generateClouds(level);
  };

  const generateClouds = level => {
    const levelConfig = LEVELS[level];
    // Cloud generation logic here
  };

  const handleJump = () => {
    // Jump animation logic
    Animated.sequence([
      Animated.timing(sunPosition.y, {
        toValue: sunPosition.y._value - 100,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(sunPosition.y, {
        toValue: sunPosition.y._value,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.soundButton}>
            {/* <Image 
              source={require('../../assets/icons/sound.png')} 
              style={styles.soundIcon} 
            /> */}
          </TouchableOpacity>
          <Text style={styles.levelText}>Level {currentLevel}</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{score}</Text>
            <Image 
              source={require('../../assets/game/star.png')} 
              style={styles.starIcon} 
            />
          </View>
        </View>

        {/* Game Area */}
        <View style={styles.gameArea}>
          {clouds.map((cloud, index) => (
            <Image
              key={index}
              source={
                cloud.type === 'bonus'
                  ? require('../../assets/game/clouds/bonus.png')
                  : require('../../assets/game/clouds/normal.png')
              }
              style={[styles.cloud, {left: cloud.x, top: cloud.y}]}
            />
          ))}
          <Animated.Image
            source={require('../../assets/ui/Sun.png')}
            style={[
              styles.sun,
              {
                transform: [
                  {translateX: sunPosition.x},
                  {translateY: sunPosition.y},
                ],
              },
            ]}
          />
        </View>

        {/* Controls */}
        <TouchableOpacity style={styles.jumpButton} onPress={handleJump}>
          <Image 
            source={require('../../assets/game/jump.png')} 
            style={styles.jumpIcon} 
          />
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  soundButton: {
    width: 40,
    height: 40,
    backgroundColor: '#91203E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundIcon: {
    width: 24,
    height: 24,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFDD56',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    color: '#FFDD56',
    marginRight: 5,
  },
  starIcon: {
    width: 24,
    height: 24,
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  cloud: {
    position: 'absolute',
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  sun: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
  jumpButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  jumpIcon: {
    width: 60,
    height: 60,
  },
});

export default Game;
