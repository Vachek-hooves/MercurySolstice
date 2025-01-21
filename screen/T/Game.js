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
  1: {clouds: 10, speed: 0.2, description: 'Clouds move slowly'},
  2: {clouds: 15, speed: 0.5, description: 'Clouds at different heights'},
  3: {clouds: 20, speed: 0.7, description: 'Bonus clouds +3 ⭐️'},
  4: {clouds: 25, speed: 0.9, description: 'Thunderclouds -3 ⭐️'},
  5: {clouds: 30, speed: 1.2, description: 'Stars +5 ⭐️'},
  6: {clouds: 35, speed: 1.4, description: 'Increased difficulty'},
  7: {clouds: 40, speed: 1.6, description: 'Expert level'},
  8: {clouds: 50, speed: 1.9, description: 'Cloud master'},
  9: {clouds: 60, speed: 2.2, description: 'Sky conqueror'},
  10: {clouds: 75, speed: 2.7, description: 'Final challenge'},
};

const CLOUD_WIDTH = 120;
const JUMP_HEIGHT = 400;
const GRAVITY = 2;
const SUN_SIZE = 70;
const STAR_SIZE = 50;
const MIN_CLOUD_HEIGHT = SCREEN_HEIGHT - 720;// Higher position for clouds
const MAX_CLOUD_HEIGHT = SCREEN_HEIGHT - 550;

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [clouds, setClouds] = useState([]);
  const [collectedStars, setCollectedStars] = useState(new Set());
  const sunPosition = useRef(
    new Animated.ValueXY({
      x: SCREEN_WIDTH / 6,
      y: SCREEN_HEIGHT - 300,
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
    // Initial clouds setup with higher positions
    const initialClouds = [
      {
        id: Date.now(),
        x: SCREEN_WIDTH,
        y: SCREEN_HEIGHT - 720,
        type: 'normal',
        hasStar: true,
      },
      {
        id: Date.now() + 1,
        x: SCREEN_WIDTH + SCREEN_WIDTH / 3,
        y: SCREEN_HEIGHT - 750,
        type: 'bonus',
        hasStar: false,
      },
      {
        id: Date.now() + 2,
        x: SCREEN_WIDTH + (SCREEN_WIDTH / 3) * 2,
        y: SCREEN_HEIGHT - 550,
        type: 'normal',
        hasStar: false,
      },
      {
        id: Date.now() + 3,
        x: SCREEN_WIDTH + (SCREEN_WIDTH / 3) * 3,
        y: SCREEN_HEIGHT - 600,
        type: 'bonus',
        hasStar: false,
      },
    ];
    setClouds(initialClouds);
  };

  const checkStarCollision = (sunX, sunY, starX, starY) => {
    // Much larger vertical hit box for better collection at all heights
    const horizontalHitDistance = 100;
    const verticalHitDistance = 180; // Increased vertical hit distance
    
    const xDiff = Math.abs(sunX - starX);
    const yDiff = Math.abs(sunY - starY);
    
    // Debug collision
    console.log('Sun position:', { x: sunX, y: sunY });
    console.log('Star position:', { x: starX, y: starY });
    console.log('Differences:', { xDiff, yDiff });
    
    return xDiff < horizontalHitDistance && yDiff < verticalHitDistance;
  };

  const startGameLoop = () => {
    const updateGame = () => {
      // Get current sun position with offset for better accuracy
      const currentSunX = sunPosition.x._value + SUN_SIZE / 2;
      const currentSunY = sunPosition.y._value + SUN_SIZE / 2;

      setClouds(prevClouds => {
        const newClouds = prevClouds.map(cloud => ({
          ...cloud,
          x: cloud.x - 0.5,
        }));

        // Remove clouds that are off screen
        const filteredClouds = newClouds.filter(cloud => cloud.x > -CLOUD_WIDTH);

        // Add new cloud if needed
        const lastCloud = filteredClouds[filteredClouds.length - 1];
        if (!lastCloud || lastCloud.x < SCREEN_WIDTH - CLOUD_WIDTH * 2) {
          const newCloud = {
            id: Date.now(),
            x: SCREEN_WIDTH + CLOUD_WIDTH,
            y: MIN_CLOUD_HEIGHT + Math.random() * (MAX_CLOUD_HEIGHT - MIN_CLOUD_HEIGHT),
            type: Math.random() > 0.8 ? 'bonus' : 'normal',
            hasStar: true,
          };
          filteredClouds.push(newCloud);
        }

        // Check for star collection with adjusted positions
        filteredClouds.forEach(cloud => {
          if (cloud.hasStar && !collectedStars.has(cloud.id)) {
            // Adjust star position calculation
            const starX = cloud.x + CLOUD_WIDTH / 2;
            const starY = cloud.y - STAR_SIZE / 2; // Adjusted star Y position

            if (checkStarCollision(currentSunX, currentSunY, starX, starY)) {
              console.log('Star collected at height:', starY); // Debug log
              setCollectedStars(prev => new Set([...prev, cloud.id]));
              setScore(prev => prev + 10);
            }
          }
        });

        return filteredClouds;
      });

      // Apply gravity if not jumping
      if (!isJumping.current) {
        sunPosition.y.setValue(
          Math.min(
            sunPosition.y._value + GRAVITY,
            SCREEN_HEIGHT - 400,
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
          <View key={cloud.id} style={[styles.cloudContainer, {left: cloud.x, top: cloud.y}]}>
            <Image
              source={
                cloud.type === 'bonus'
                  ? require('../../assets/game/clouds/bonus.png')
                  : require('../../assets/game/clouds/normal.png')
              }
              style={styles.cloud}
            />
            {cloud.hasStar && !collectedStars.has(cloud.id) && (
              <Image
                source={require('../../assets/game/star.png')}
                style={styles.cloudStar}
              />
            )}
          </View>
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
  cloudContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  cloud: {
    width: CLOUD_WIDTH,
    height: 60,
    resizeMode: 'contain',
  },
  cloudStar: {
    position: 'absolute',
    top: -STAR_SIZE,
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
    bottom: 40,
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
