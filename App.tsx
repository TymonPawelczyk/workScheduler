import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from '@firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { Ionicons } from '@expo/vector-icons'; 

import Login from './app/screen/Login';
import Dashboard from './app/screen/Dashboard';
import Schedule from './app/screen/Schedule';
import Availability from './app/screen/Availability';
import SelectTime from './app/screen/SelectTime';

const Tab = createBottomTabNavigator();

function InsideTabs({ user }: { user: User | null }) {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarStyle: { backgroundColor: '#f0f0f0',
         }, // Ustawienie koloru tła paska kart
        tabBarLabelStyle: {
          fontSize: 12, // Rozmiar tekstu etykiety
          fontWeight: '500', // Styl czcionki etykiety
          color: '#000000',
        },
      }}>
      <Tab.Screen name='Dashboard' component={Dashboard} 
      options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#14213d',
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'albums' : 'albums-outline'} color={'#fca311'} size={24} />
          ),
          headerTintColor: '#e5e5e5',
        }}/>
      {user?.email && !user.email.includes('emp') && (
        <Tab.Screen name='Schedule' component={Schedule} 
        options={{
          title: 'Schedule',
          headerStyle: {
            backgroundColor: '#14213d',
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={'#fca311'} size={24} />
          ),
          headerTintColor: '#e5e5e5',
        }}
        />
      )}
      {user?.email && !user.email.includes('mena') && (
        <Tab.Screen name='Availability' component={Availability} 
        options={{
          title: 'Availability',
          headerStyle: {
            backgroundColor: '#14213d',
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bag-add' : 'bag-add-outline'} color={'#fca311'} size={24} />
          ),
          headerTintColor: '#e5e5e5',
        }}
        />
      )}
      {/* <Tab.Screen name='SelectTime' component={SelectTime} /> */}
      {/* <Tab.Screen name='Calendar' component={Calendar} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      { user ? (
        <InsideTabs user={user} />
      ) : (
        <Login />
      )}
    </NavigationContainer>
  );
}
