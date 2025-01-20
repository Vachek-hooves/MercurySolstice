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

const CLOUD_WIDTH = 120;
const JUMP_HEIGHT = 180;
const GRAVITY = 2;

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [clouds, setClouds] = useState([]);
  const sunPosition = useRef(
    new Animated.ValueXY({
      x: SCREEN_WIDTH / 6,
      y: SCREEN_HEIGHT - 400,
    }),
  ).current;
  const jumpAnimation = useRef(null);
  const isJumping = useRef(false);
  const gameLoop = useRef(null);

  // Initialize game
  useEffect(() => {
    if (isPlaying) {
      initializeGame();
      startGameLoop();
    }
    return () => {
      if (gameLoop.current) cancelAnimationFrame(gameLoop.current);
    };
  }, [isPlaying]);

  const initializeGame = () => {
    // Initial clouds setup
    const initialClouds = [
      {
        id: Date.now(),
        x: SCREEN_WIDTH,
        y: SCREEN_HEIGHT - 300,
        type: 'normal',
      },
      {
        id: Date.now() + 1,
        x: SCREEN_WIDTH + SCREEN_WIDTH / 3,
        y: SCREEN_HEIGHT - 400,
        type: 'bonus',
      },
      {
        id: Date.now() + 2,
        x: SCREEN_WIDTH + (SCREEN_WIDTH / 3) * 2,
        y: SCREEN_HEIGHT - 250,
        type: 'normal',
      },
    ];
    setClouds(initialClouds);
  };

  const startGameLoop = () => {
    const updateGame = () => {
      // Move clouds
      setClouds(prevClouds => {
        const newClouds = prevClouds.map(cloud => ({
          ...cloud,
          x: cloud.x - 0.5, // Adjust speed based on level
        }));

        // Remove clouds that are off screen
        const filteredClouds = newClouds.filter(
          cloud => cloud.x > -CLOUD_WIDTH,
        );

        // Add new clouds if needed
        if (filteredClouds.length < 3) {
          filteredClouds.push({
            id: Date.now(),
            x: SCREEN_WIDTH + CLOUD_WIDTH,
            y: SCREEN_HEIGHT - 200 - Math.random() * 300, // Random height
            type: Math.random() > 0.8 ? 'bonus' : 'normal',
          });
        }

        return filteredClouds;
      });

      // Apply gravity if not jumping
      if (!isJumping.current) {
        sunPosition.y.setValue(
          Math.min(
            sunPosition.y._value + GRAVITY,
            SCREEN_HEIGHT - 400, // Ground level
          ),
        );
      }

      gameLoop.current = requestAnimationFrame(updateGame);
    };

    gameLoop.current = requestAnimationFrame(updateGame);
  };

  const handleJump = () => {
    if (isJumping.current) return;

    isJumping.current = true;
    Animated.sequence([
      // Jump up
      Animated.timing(sunPosition.y, {
        toValue: sunPosition.y._value - JUMP_HEIGHT,
        duration: 500,
        useNativeDriver: true,
      }),
      // Fall down
      Animated.timing(sunPosition.y, {
        toValue: sunPosition.y._value,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      isJumping.current = false;
    });
  };

  return (
    // <MainLayout>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.soundButton}>
          <Image
            source={require('../../assets/icons/sound.png')}
            style={styles.soundIcon}
          />
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
        {clouds.map(cloud => (
          <Image
            key={cloud.id}
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
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.jumpButton} onPress={handleJump}>
          <Image
            source={require('../../assets/game/jump.png')}
            style={styles.jumpIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
    // </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002B5C', // Dark blue background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40, // Adjust for status bar
    paddingBottom: 10,
    zIndex: 1,
  },
  soundButton: {
    width: 44,
    height: 44,
    backgroundColor: '#91203E',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  levelText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFDD56',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  scoreText: {
    fontSize: 20,
    color: '#FFDD56',
    marginRight: 8,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  cloud: {
    position: 'absolute',
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  sun: {
    width: 60,
    height: 60,
    position: 'absolute',
    resizeMode: 'contain',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 20,
  },
  jumpButton: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jumpIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Game;
