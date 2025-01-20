import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';

const DiaryDetails = () => {
  const {diaryEntries} = useAppContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderDiaryEntry = (entry) => (
    <LinearGradient
      key={entry.id}
      colors={['rgba(73, 96, 174, 0.5)', 'rgba(25, 53, 125, 0.5)']}
      style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <Image source={entry.mood.image} style={styles.moodEmoji} />
        <View style={styles.headerText}>
          <Text style={styles.moodText}>{entry.mood.name}</Text>
          <Text style={styles.dateText}>{formatDate(entry.date)}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.entryText}>{entry.text}</Text>
    </LinearGradient>
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Your Diary Entries</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.entriesContainer}>
            {diaryEntries.length > 0 ? (
              diaryEntries
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(renderDiaryEntry)
            ) : (
              <Text style={styles.emptyText}>
                No diary entries yet. Start by adding your mood and thoughts!
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFDD56',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  entriesContainer: {
    gap: 20,
    paddingBottom: 20,
  },
  entryCard: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: 'rgba(73, 96, 174, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  moodEmoji: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  moodText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFDD56',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 15,
  },
  entryText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#A0A0A0',
    fontSize: 16,
    marginTop: 40,
    paddingHorizontal: 20,
  },
});

export default DiaryDetails;
