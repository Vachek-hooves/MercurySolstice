import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {articlesData} from '../../data/articlesData';
import {useAppContext} from '../../store/context';

const Article = () => {
  const {totalScore} = useAppContext();
  const SCORE_TO_UNLOCK = 1500;
  console.log(totalScore);

  const renderArticleBox = (article, index) => {
    const isUnlocked = totalScore >= SCORE_TO_UNLOCK * (index + 1);

    return (
      <View key={article.id} style={styles.articleBox}>
        <Image
          source={require('../../assets/ui/book.png')}
          style={styles.bookImage}
        />
        <TouchableOpacity
          style={[
            styles.scoreButton,
            isUnlocked ? styles.unlockedButton : styles.lockedButton,
          ]}
          disabled={!isUnlocked}>
          {isUnlocked ? (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>25</Text>
              <Image
                source={require('../../assets/ui/star.png')}
                style={styles.starIcon}
              />
            </View>
          ) : (
            // <Image
            //   source={require('../../assets/ui/lock.png')}
            //   style={styles.lockIcon}
            // />
            <Text>Locked</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Total Score Display */}
      <View style={styles.headerScore}>
        <Text style={styles.totalScoreText}>{totalScore}</Text>
        <Image
          source={require('../../assets/ui/star.png')}
          style={styles.headerStarIcon}
        />
      </View>

      {/* Articles Grid */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.articlesGrid}>
          {articlesData.map((article, index) =>
            renderArticleBox(article, index),
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002B5C',
  },
  headerScore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: '15%',
  },
  totalScoreText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  headerStarIcon: {
    width: 24,
    height: 24,
  },
  scrollContainer: {
    padding: 16,
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  articleBox: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#1E4B8C',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bookImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  scoreButton: {
    width: '80%',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  unlockedButton: {
    backgroundColor: '#91203E',
  },
  lockedButton: {
    backgroundColor: '#91203E',
    opacity: 0.7,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  lockIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
});

export default Article;
