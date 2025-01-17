import {AppProvider} from './store/context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNav from './NavMenu/TabNav';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TabNav" component={TabNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
