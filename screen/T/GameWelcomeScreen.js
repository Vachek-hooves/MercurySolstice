import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';

const GameWelcomeScreen = ({navigation}) => {
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Game')}
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text>Start Game</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default GameWelcomeScreen;

const styles = StyleSheet.create({});
