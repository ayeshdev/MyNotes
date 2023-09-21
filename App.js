import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LoginUi } from './Login';
import { HomeUi } from './Home';
import { RegisterUi } from './Register';
import { AddNotesUi } from './AddNotes';
import { TestUi } from './Test';
import { SplashUI } from './Splash';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

function App() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });
  
  const ui = (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Splash' options={{ title: 'My Notes' }} component={SplashUI} />
      <Stack.Screen name='Login' component={LoginUi} />
      <Stack.Screen name='Register' component={RegisterUi} />
      <Stack.Screen name='AddNotes' component={AddNotesUi} />
      <Stack.Screen name='Home' component={HomeUi} />
      <Stack.Screen name='Test' component={TestUi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;