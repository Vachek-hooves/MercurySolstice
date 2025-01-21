import {StyleSheet, Text, View, Switch} from 'react-native';
import MainLayout from '../../components/Layout/MainLayout';
import {useState} from 'react';
const Settings = () => {
  // const {isMusicEnable, setIsMusicEnable} = usePracticeContext();
  const [isMusicEnable, setIsMusicEnable] = useState(true);
  const handleMusicToggle = async value => {
    setIsMusicEnable(value);
    if (value) {
      await playBackgroundMusic();
    } else {
      pauseBackgroundMusic();
    }
  };
  return (
    <MainLayout>
      <View style={styles.settingsSection}>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Background Sound</Text>
          <Switch
            value={isMusicEnable}
            onValueChange={handleMusicToggle}
            trackColor={{false: '#FFFFFF', true: '#790122'}}
            thumbColor={'#00254F'}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsSection: {
    // marginBottom: 30,
    // marginTop: 100,
    justifyContent: 'center',
    // textAlign: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FE9F50',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 10,
    },
  },
  settingLabel: {
    color: '#000',
    fontSize: 16,
  },
});
