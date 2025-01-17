import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {dailyAdvice} from '../../data/advice';

const Advice = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('morning');
  const [selectedAdvice, setSelectedAdvice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPositions, setButtonPositions] = useState({});
  const [sunPosition, setSunPosition] = useState({});

  const timePeriods = ['morning', 'daytime', 'evening', 'night'];

  // Update sun position based on time period
  useEffect(() => {
    const positions = {
      morning: {
        left: '10%',
        top: '80%',
      },
      daytime: {
        left: '25%',
        top: '50%',
      },
      evening: {
        left: '40%',
        top: '20%',
      },
      night: {
        left: '75%',
        top: '0%',
      },
    };
    setSunPosition(positions[selectedPeriod]);

    // Generate button positions (existing code)
    const newPositions = {};
    dailyAdvice[selectedPeriod].advices.forEach((advice, index) => {
      newPositions[advice.id] = {
        left: Math.random() * 20,
        marginTop: index === 0 ? 20 : Math.random() * 30,
      };
    });
    setButtonPositions(newPositions);
  }, [selectedPeriod]);

  const renderTimeButtons = () => (
    <View style={styles.timeButtonsContainer}>
      {timePeriods.map(period => (
        <TouchableOpacity
          key={period}
          onPress={() => setSelectedPeriod(period)}>
          <LinearGradient
            colors={
              selectedPeriod === period
                ? ['#FFDD56', '#FE9F50']
                : ['transparent', 'transparent']
            }
            style={[
              styles.timeButton,
              selectedPeriod === period && styles.selectedTimeButton,
            ]}>
            <Text
              style={[
                styles.timeButtonText,
                selectedPeriod === period && styles.selectedTimeButtonText,
              ]}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAdviceButtons = () => (
    <View style={styles.adviceContainer}>
      {dailyAdvice[selectedPeriod].advices.map((advice) => (
        <TouchableOpacity
          key={advice.id}
          onPress={() => {
            setSelectedAdvice(advice);
            setModalVisible(true);
          }}
          style={[
            styles.adviceButtonWrapper,
            buttonPositions[advice.id] && {
              left: `${buttonPositions[advice.id].left}%`,
              marginTop: buttonPositions[advice.id].marginTop,
            },
          ]}>
          <LinearGradient
            colors={['#FFDD56', '#FE9F50']}
            style={styles.adviceButton}>
            <Text style={styles.adviceButtonText}>Click on me</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}

      <Animated.Image
        source={require('../../assets/ui/smallSun.png')}
        style={[
          styles.sunImage,
          {
            left: sunPosition.left,
            top: sunPosition.top,
          },
        ]}
      />
    </View>
  );

  return (
    <LinearGradient colors={['#001B3B', '#001432']} style={styles.container}>
      {renderTimeButtons()}
      {renderAdviceButtons()}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAdvice && (
              <>
                <Text style={styles.modalTitle}>{selectedAdvice.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedAdvice.description}
                </Text>
                <Text style={styles.modalDuration}>
                  Duration: {selectedAdvice.duration}
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default Advice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  timeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 70,
  },
  timeButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  selectedTimeButton: {
    borderColor: 'transparent',
  },
  timeButtonText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  selectedTimeButtonText: {
    color: '#001432',
  },
  adviceContainer: {
    flex: 1,
  },
  adviceButton: {
    borderRadius: 25,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9.9,
    elevation: 8,
    width: 200,
  },
  adviceButtonText: {
    padding: 16,
    color: '#001432',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#001B3B',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  modalDuration: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#001432',
    fontWeight: 'bold',
  },
  sunImage: {
    position: 'absolute',
    width: 200,
    height: 200,
    transform: [
      { translateX: -60 }, // Half of width
      { translateY: -60 }, // Half of height
    ],
    // Add transition animation
    transition: 'all 0.3s ease-in-out',
  },
});
