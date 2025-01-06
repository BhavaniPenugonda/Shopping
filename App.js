
import { initializeApp } from "firebase/app";
import { getFirestore ,disableNetwork, enableNetwork} from "firebase/firestore";

import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from "react";

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import the screens
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';


import { LogBox,Alert } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();


const App=()=> {  

  const connectionStatus = useNetInfo();
  
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  //  web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBYlHydkdkJ4lD6TF118N_3IAoEZlhXpZA",
    authDomain: "chatapp-4b3f0.firebaseapp.com",
    projectId: "chatapp-4b3f0",
    storageBucket: "chatapp-4b3f0.firebasestorage.app",
    messagingSenderId: "634398437882",
    appId: "1:634398437882:web:c611eecd704fec95dbf443"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  


  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
          name="ShoppingLists"
      >
      {props => <ShoppingLists isConnected={connectionStatus.isConnected} db={db} {...props} />}
      </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
