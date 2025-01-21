import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import DiaryIcon from '../../components/icon/DiaryIcon';

const moods = [
  {id: 1, name: 'Joy', image: require('../../assets/mood/joy.png')},
  {
    id: 2,
    name: 'Confidence',
    image: require('../../assets/mood/confidence.png'),
  },
  {id: 3, name: 'Calm', image: require('../../assets/mood/calm.png')},
  {id: 4, name: 'Fatigue', image: require('../../assets/mood/fatigue.png')},
  {id: 5, name: 'Anxiety', image: require('../../assets/mood/anxiety.png')},
  {id: 6, name: 'Sadness', image: require('../../assets/mood/sadness.png')},
];

const Diary = ({navigation}) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelection = mood => {
    console.log(mood);
    setSelectedMood(mood);
    navigation.navigate('AddDiary', {mood});
  };

  const renderMoodGrid = () => {
    return (
      <View style={styles.moodGrid}>
        <View style={styles.moodRow}>
          {moods.slice(0, 3).map(mood => (
            <TouchableOpacity
              key={mood.id}
              style={styles.moodItem}
              onPress={() => handleMoodSelection(mood)}>
              <Image source={mood.image} style={styles.moodEmoji} />
              <Text style={styles.moodText}>{mood.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{borderWidth: 1, borderColor: '#91203E'}} />
        <View style={styles.moodRow}>
          {moods.slice(3, 6).map(mood => (
            <TouchableOpacity
              key={mood.id}
              style={styles.moodItem}
              onPress={() => handleMoodSelection(mood)}>
              <Image source={mood.image} style={styles.moodEmoji} />
              <Text style={styles.moodText}>{mood.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <MainLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <DiaryIcon />
        {/* <View style={styles.container}> */}
        <Text style={styles.title}>
          Please select one of the moods{'\n'}by tapping the corresponding
          emoji.
        </Text>
        {renderMoodGrid()}
        {/* </View> */}
        {/* <View style={{height:100}}/> */}
        <View style={{height: 50}} />
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingTop: '40%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFDD56',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 32,
  },
  moodGrid: {
    gap: 40,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  moodItem: {
    alignItems: 'center',
    gap: 8,
  },
  moodEmoji: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  moodText: {
    color: '#FFDD56',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Diary;
