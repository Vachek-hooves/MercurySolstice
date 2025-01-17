import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const CustomBtn = ({navTo, children, title, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#FFDD56', '#FE9F50']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 280,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9.9,
    elevation: 8,
  },
  buttonText: {
    paddingVertical: 16,
    paddingHorizontal: 64,
    color: '#001432',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#FBFBFB',
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 6.5,
  },
});
