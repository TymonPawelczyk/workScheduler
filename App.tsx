import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from '@firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

import Login from './app/screen/Login';
import Dashboard from './app/screen/Dashboard';
import Schedule from './app/screen/Schedule';
import Availability from './app/screen/Availability';
import SelectTime from './app/screen/SelectTime';
import Calendar from './app/screen/Calendar';

const Tab = createBottomTabNavigator();

function InsideTabs({ user }: { user: User | null }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Dashboard' component={Dashboard} />
      {user?.email && !user.email.includes('emp') && (
        <Tab.Screen name='Schedule' component={Schedule} />
      )}
      {user?.email && !user.email.includes('mena') && (
        <Tab.Screen name='Availability' component={Availability} />
      )}
      {/* <Tab.Screen name='SelectTime' component={SelectTime} /> */}
      <Tab.Screen name='Calendar' component={Calendar} />
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
