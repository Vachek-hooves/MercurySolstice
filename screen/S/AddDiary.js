import React, {useState} from 'react';
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

const AddDiary = ({route, navigation}) => {
  const {mood} = route.params;
  const [diaryText, setDiaryText] = useState('');
  const { saveDiaryEntry } = useAppContext();

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
          Write down three things you're{'\n'}grateful for today.
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
