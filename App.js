import {AppProvider} from './store/context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNav from './NavMenu/TabNav';
import WelcomeScreen from './screen/S/WelcomeScreen';
import WelcomeScreen2 from './screen/S/WelcomeScreen2';
import LogIn from './screen/S/LogIn';
import ActivityTimer from './screen/S/ActivityTimer';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 700,
          }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="TabNav" component={TabNav} />
          <Stack.Screen name="ActivityTimer" component={ActivityTimer} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
