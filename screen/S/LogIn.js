import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MainLayout from '../../components/Layout/MainLayout';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBtn from '../../components/ui/CustomBtnNav';

const defaultProfile = require('../../assets/ui/profile.png');

const LogIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedUsername) setUsername(savedUsername);
      if (savedImage) setProfileImage(savedImage);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        await AsyncStorage.setItem('profileImage', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSignIn = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    try {
      await AsyncStorage.setItem('username', username);
      navigation.navigate('TabNav');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <LinearGradient colors={['#001B3B', '#001432']} style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
          <Image
            source={profileImage ? {uri: profileImage} : defaultProfile}
            style={styles.profileImage}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* <TouchableOpacity onPress={handleSignIn}>
          <LinearGradient
            colors={['#FFDD56', '#FE9F50']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </LinearGradient>
        </TouchableOpacity> */}
        <CustomBtn onPress={handleSignIn} title={'Sign in'}/>
      </View>
    </LinearGradient>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 40,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 60,
    borderWidth: 2,
    // borderColor: '#FFD700',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  changePhotoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    padding: 15,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
//   button: {
//     borderRadius: 30,
//     width: 280,
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 9.9,
//     elevation: 8,
//   },
//   buttonText: {
//     paddingHorizontal: 64,
//     paddingVertical: 16,
//     color: '#001432',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
});
