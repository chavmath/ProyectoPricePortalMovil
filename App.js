import { StatusBar as RNStatusBar } from 'react-native';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './DetailsScreen';
import DetailScreenRegister from './DetailScreenRegister';
import ClientScreen from './ClientScreen';
import { UserProvider } from './controllers/userProvider';

function HomeScreen({ navigation }) {
  RNStatusBar.setBarStyle('light-content', true);
  RNStatusBar.setBackgroundColor('#000', true);
  RNStatusBar.setTranslucent(true);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/backApp.png')} style={styles.image}>
    
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Juegos')}
          >
            <Text style={styles.buttonText}>Buscar Juegos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Registrarse')}
          >
            <Text style={styles.buttonText}>Ingresar </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>

  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={HomeScreen} />
          <Stack.Screen name="Juegos" component={DetailsScreen} />
          <Stack.Screen name="Registrarse" component={DetailScreenRegister} />
          <Stack.Screen name="JuegosCliente" component={ClientScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#814BC6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
