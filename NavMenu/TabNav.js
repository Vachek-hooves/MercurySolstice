import {StyleSheet, Text, View} from 'react-native';
import {Advice, Diary, Game, Settings, Timer} from '../screen/T';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Advice" component={Advice} />
      <Tab.Screen name="Diary" component={Diary} />
      <Tab.Screen name="Game" component={Game} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Timer" component={Timer} />
    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({});
