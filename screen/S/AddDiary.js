import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import LinearGradient from 'react-native-linear-gradient';
import { useAppContext } from '../../store/context';

const moodRecommendations = {
  Joy: [
    "Write down three things you're grateful for today.",
    "Share your mood with a friend or loved one by sending them an uplifting message.",
    "Use your energy to tackle a task you've been putting off.",
    "Do something creative: draw, record music, or write an inspiring note.",
    "Take a walk outdoors and enjoy the moment."
  ],
  Confidence: [
    "Set a small goal for the day and accomplish it immediately.",
    "Try a new task or hobby that seems interesting but slightly challenging.",
    "Listen to a motivational podcast or read an inspiring story.",
    "Make a list of your strengths and achievements from the past week.",
    "Share your successes with colleagues or friends to receive support."
  ],
  Calm: [
    "Close your eyes for 5 minutes and practice deep breathing: inhale for 4 seconds, exhale for 4 seconds.",
    "Try a 10-minute meditation focused on gratitude or relaxation.",
    "Turn off notifications for an hour and focus on one task.",
    "Spend some time in silence, avoiding conversations and gadgets.",
    "Light a candle or use essential oils to create a relaxing atmosphere."
  ],
  Fatigue: [
    "Take a 10-minute walk to improve circulation and relieve tension.",
    "Drink a glass of water with lemon to refresh your body.",
    "Take a short 20-minute nap to regain energy.",
    "Do light stretching exercises to ease stiffness.",
    "Listen to soothing music or nature sounds."
  ],
  Anxiety: [
    "Practice mindful breathing: slowly inhale for 4 seconds, hold for 4 seconds, and exhale for 6 seconds.",
    "Write down your thoughts or worries in a journal to organize them.",
    "Plan your day: create a list of 3 tasks to complete.",
    "Focus on your feelings and try to identify what's causing the anxiety.",
    "Watch an inspiring video or read a quote that supports you."
  ],
  Sadness: [
    "Call or message a loved one who always supports you.",
    "Watch your favorite movie or series that makes you smile.",
    "Do something nice for yourself: take a bath, cook a tasty meal.",
    "Create a list of things that bring you joy and make you happy.",
    "Take a walk in a park or another place that inspires you."
  ]
};

const AddDiary = ({route, navigation}) => {
  const {mood} = route.params;
  const [diaryText, setDiaryText] = useState('');
  const { saveDiaryEntry } = useAppContext();

  // Memoize the random recommendation so it doesn't change on re-renders
  const recommendation = useMemo(() => {
    const recommendations = moodRecommendations[mood.name] || [];
    if (recommendations.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * recommendations.length);
    return recommendations[randomIndex];
  }, [mood.name]); // Only recalculate if mood changes

  const handleAddToDiary = async () => {
    if (diaryText.trim()) {
      try {
        const success = await saveDiaryEntry(mood, diaryText.trim());
        if (success) {
          console.log('Diary entry saved successfully');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error saving diary entry:', error);
        // Optionally show error message to user
      }
    }
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Image source={mood.image} style={styles.moodEmoji} />

        <Text style={styles.title}>
          {recommendation}
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="Why do I feel this way today?..."
            placeholderTextColor="#666"
            value={diaryText}
            onChangeText={setDiaryText}
          />
        </View>

        <TouchableOpacity onPress={handleAddToDiary}>
          <LinearGradient
            colors={['#91203E', '#691B3B']}
            style={styles.addButton}>
            <Text style={styles.buttonText}>Add to diary</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default AddDiary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '30%',
    alignItems: 'center',
  },
  moodEmoji: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFDD56',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 32,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#4A4A4A',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    color: '#FFF',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  addButton: {
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
