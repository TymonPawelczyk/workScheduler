import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from '@firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

import Login from './app/screen/Login';
import Dashboard from './app/screen/Dashboard';
import Schedule from './app/screen/Schedule';
import Availability from './app/screen/Availability';
import SelectTime from './app/screen/SelectTime';
import Calendar from './app/screen/Calendar';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
     <InsideStack.Navigator>
        <InsideStack.Screen name='Dashboard' component={Dashboard}/>
        <InsideStack.Screen name='Schedule' component={Schedule}/>
        <InsideStack.Screen name='Availability' component={Availability}/>
        <InsideStack.Screen name='SelectTime' component={SelectTime}/>
        <InsideStack.Screen name='Calendar' component={Calendar}/>
     </InsideStack.Navigator>
  )
}


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>

        { user ? (
          <Stack.Screen name='Inside' component={InsideLayout} options={ {headerShown:  false} }/>
          ) : (
          <Stack.Screen name='Login' component={Login} options={ {headerShown:  false} }/>

          )}
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}


