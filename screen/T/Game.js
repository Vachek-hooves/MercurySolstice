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
  1: {clouds: 10, speed: 0.2, description: 'Облака движутся медленно'},
  2: {clouds: 15, speed: 0.5, description: 'Облака на разной высоте'},
  3: {clouds: 20, speed: 0.7, description: 'Бонусные облака +3 ⭐️'},
  4: {clouds: 25, speed: 0.9, description: 'Грозовые облака -3 ⭐️'},
  5: {clouds: 30, speed: 1.2, description: 'Звёздочки +5 ⭐️'},
  6: {clouds: 35, speed: 1.4, description: 'Повышенная сложность'},
  7: {clouds: 40, speed: 1.6, description: 'Экспертный уровень'},
  8: {clouds: 50, speed: 1.9, description: 'Мастер облаков'},
  9: {clouds: 60, speed: 2.2, description: 'Покоритель небес'},
  10: {clouds: 75, speed: 2.7, description: 'Финальное испытание'},
};

const CLOUD_WIDTH = 120;
const SUN_SIZE = 70;
const STAR_SIZE = 50;
const GRAVITY = 2;
const MIN_CLOUD_HEIGHT = SCREEN_HEIGHT - 720;
const MAX_CLOUD_HEIGHT = SCREEN_HEIGHT - 450;

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [clouds, setClouds] = useState([]);
  const [stars, setStars] = useState([]);
  const [collectedStars, setCollectedStars] = useState(new Set());
  
  const sunPosition = useRef(
    new Animated.ValueXY({
      x: SCREEN_WIDTH / 2,
      y: SCREEN_HEIGHT - 300,
    }),
  ).current;
  const gameLoop = useRef(null);

  // Add a ref to track stars being processed
  const processingStars = useRef(new Set());

  // Add this for debugging
  useEffect(() => {
    // console.log('Current clouds:', clouds);
    // console.log('Collected stars:', collectedStars);
  }, [clouds, collectedStars]);

  // Spawn a new star with slower falling speed
  const spawnStar = () => {
    return {
      id: Date.now(),
      x: Math.random() * (SCREEN_WIDTH - STAR_SIZE),
      y: -STAR_SIZE,
      speed: Math.random() * 0.5 + 0.3, // Reduced speed range between 0.3 and 0.8
    };
  };

  // Spawn a new cloud
  const spawnCloud = () => {
    return {
      id: Date.now(),
      x: SCREEN_WIDTH + CLOUD_WIDTH,
      y: MIN_CLOUD_HEIGHT + Math.random() * (MAX_CLOUD_HEIGHT - MIN_CLOUD_HEIGHT),
      type: Math.random() > 0.8 ? 'bonus' : 'normal',
    };
  };

  // Check collision between sun and star
  const checkStarCollision = (sun, star) => {
    const hitDistance = 80;
    const xDiff = Math.abs(sun.x - star.x);
    const yDiff = Math.abs(sun.y - star.y);
    
    return xDiff < hitDistance && yDiff < hitDistance;
  };

  // Add a separate function for collecting stars
  const collectStar = (starId) => {
    if (!collectedStars.has(starId) && !processingStars.current.has(starId)) {
      processingStars.current.add(starId);
      setCollectedStars(prev => new Set([...prev, starId]));
      setScore(prev => prev + 10);
      
      // Remove from processing after a short delay
      setTimeout(() => {
        processingStars.current.delete(starId);
      }, 100);
    }
  };

  // Game loop
  const startGameLoop = () => {
    const updateGame = () => {
      // Update clouds
      setClouds(prevClouds => {
        const newClouds = prevClouds.map(cloud => ({
          ...cloud,
          x: cloud.x - 0.5,
        }));

        const filteredClouds = newClouds.filter(cloud => cloud.x > -CLOUD_WIDTH);

        if (!filteredClouds.length || filteredClouds[filteredClouds.length - 1].x < SCREEN_WIDTH - CLOUD_WIDTH * 2) {
          filteredClouds.push(spawnCloud());
        }

        return filteredClouds;
      });

      // Update stars
      setStars(prevStars => {
        // Move existing stars down
        const newStars = prevStars.map(star => ({
          ...star,
          y: star.y + star.speed,
        }));

        // Remove stars that are off screen or collected
        const filteredStars = newStars.filter(
          star => star.y < SCREEN_HEIGHT && !collectedStars.has(star.id)
        );

        // Spawn new stars less frequently
        if (Math.random() < 0.01) {
          filteredStars.push(spawnStar());
        }

        // Check for star collection
        const sunBounds = {
          x: sunPosition.x._value + SUN_SIZE / 2,
          y: sunPosition.y._value + SUN_SIZE / 2,
        };

        filteredStars.forEach(star => {
          if (!collectedStars.has(star.id) && !processingStars.current.has(star.id)) {
            const starCenter = {
              x: star.x + STAR_SIZE / 2,
              y: star.y + STAR_SIZE / 2,
            };

            if (checkStarCollision(sunBounds, starCenter)) {
              collectStar(star.id);
            }
          }
        });

        return filteredStars;
      });

      gameLoop.current = requestAnimationFrame(updateGame);
    };

    gameLoop.current = requestAnimationFrame(updateGame);
  };

  // Initialize game
  useEffect(() => {
    if (isPlaying) {
      setClouds([spawnCloud()]);
      setStars([spawnStar()]);
      startGameLoop();
    }
    return () => {
      if (gameLoop.current) cancelAnimationFrame(gameLoop.current);
    };
  }, [isPlaying]);

  // Cleanup processing set when component unmounts
  useEffect(() => {
    return () => {
      processingStars.current.clear();
    };
  }, []);

  // Handle sun movement
  const handleJump = () => {
    // Move sun left or right instead of jumping
    const newX = Math.max(0, Math.min(SCREEN_WIDTH - SUN_SIZE, sunPosition.x._value + 50));
    sunPosition.x.setValue(newX);
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
        {/* Render clouds */}
        {clouds.map(cloud => (
          <View
            key={cloud.id}
            style={[styles.cloudContainer, {left: cloud.x, top: cloud.y}]}>
            <Image
              source={
                cloud.type === 'bonus'
                  ? require('../../assets/game/clouds/bonus.png')
                  : require('../../assets/game/clouds/normal.png')
              }
              style={styles.cloud}
            />
          </View>
        ))}

        {/* Render falling stars */}
        {stars.map(star => (
          !collectedStars.has(star.id) && (
            <Image
              key={star.id}
              source={require('../../assets/game/star.png')}
              style={[
                styles.star,
                {
                  left: star.x,
                  top: star.y,
                },
              ]}
            />
          )
        ))}

        {/* Render sun */}
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
        <TouchableOpacity style={styles.moveButton} onPress={() => {
          const newX = Math.max(0, sunPosition.x._value - 50);
          sunPosition.x.setValue(newX);
        }}>
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moveButton} onPress={() => {
          const newX = Math.min(SCREEN_WIDTH - SUN_SIZE, sunPosition.x._value + 50);
          sunPosition.x.setValue(newX);
        }}>
          <Text style={styles.buttonText}>→</Text>
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
  cloudContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  cloud: {
    width: CLOUD_WIDTH,
    height: 60,
    resizeMode: 'contain',
  },
  star: {
    position: 'absolute',
    width: STAR_SIZE,
    height: STAR_SIZE,
    resizeMode: 'contain',
  },
  sun: {
    width: SUN_SIZE,
    height: SUN_SIZE,
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
  moveButton: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default Game;
