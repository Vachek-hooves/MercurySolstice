import {AppProvider} from './store/context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, StackRouter} from '@react-navigation/native';
import TabNav from './NavMenu/TabNav';
import WelcomeScreen from './screen/S/WelcomeScreen';
import WelcomeScreen2 from './screen/S/WelcomeScreen2';
import LogIn from './screen/S/LogIn';
import ActivityTimer from './screen/S/ActivityTimer';
import DiaryDetails from './screen/S/DiaryDetails';
import AddDiary from './screen/S/AddDiary';
import {Game} from './screen/T';
import Article from './screen/S/Article';
import ReadArticleDetails from './screen/S/ReadArticleDetails';

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
          <Stack.Screen name="DiaryDetails" component={DiaryDetails} />
          <Stack.Screen name="AddDiary" component={AddDiary} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Article" component={Article} />
          <Stack.Screen
            name="ReadArticleDetails"
            component={ReadArticleDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
