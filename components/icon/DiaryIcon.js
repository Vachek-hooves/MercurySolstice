import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DiaryIcon = () => {
  const navigation = useNavigation();
  return (
    <View style={{position: 'absolute', top: 70, right: 50}}>
      <TouchableOpacity onPress={() => navigation.navigate('DiaryDetails')}>
        <Image
          source={require('../../assets/icons/diary.png')}
          style={{width: 40, height: 40}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DiaryIcon;

const styles = StyleSheet.create({});
