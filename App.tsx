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
import EmployeeDashboard from './app/screen/EmployeeDashboard';
import SwapShift from './app/screen/SwapShift';
import ManagerSwapRequests from './app/screen/ManagerSwapRequests';

const Tab = createBottomTabNavigator();

function InsideTabs({ user }: { user: User | null }) {
  const isManager = user?.email && user.email.includes('mena'); // Adjust to your logic for identifying managers
  const isEmployee = user?.email && user.email.includes('emp');

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#f0f0f0' },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          color: '#000000',
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerStyle: { backgroundColor: '#14213d' },
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'albums' : 'albums-outline'} color="#fca311" size={24} />
          ),
          headerTintColor: '#e5e5e5',
        }}
      />
      {!isManager && (
        <Tab.Screen
          name="EmployeeDashboard"
          component={EmployeeDashboard}
          options={{
            title: 'My Schedule',
            headerStyle: { backgroundColor: '#14213d' },
            tabBarIcon: ({ focused }) => (
              <Ionicons name={focused ? 'clipboard' : 'clipboard-outline'} color="#fca311" size={24} />
            ),
            headerTintColor: '#e5e5e5',
          }}
        />
      )}
      {!isEmployee && (
        <Tab.Screen
          name="Schedule"
          component={Schedule}
          options={{
            title: 'Schedule',
            headerStyle: { backgroundColor: '#14213d' },
            tabBarIcon: ({ focused }) => (
              <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color="#fca311" size={24} />
            ),
            headerTintColor: '#e5e5e5',
          }}
        />
      )}
      {!isManager && (
        <Tab.Screen
          name="Availability"
          component={Availability}
          options={{
            title: 'Availability',
            headerStyle: { backgroundColor: '#14213d' },
            tabBarIcon: ({ focused }) => (
              <Ionicons name={focused ? 'bag-add' : 'bag-add-outline'} color="#fca311" size={24} />
            ),
            headerTintColor: '#e5e5e5',
          }}
        />
      )}
      {!isManager && (
        <Tab.Screen
          name="SwapShift"
          component={SwapShift}
          options={{
            title: 'Swap Shift',
            headerStyle: { backgroundColor: '#14213d' },
            tabBarIcon: ({ focused }) => (
              <Ionicons name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} color="#fca311" size={24} />
            ),
            headerTintColor: '#e5e5e5',
          }}
        />
      )}
      {!isEmployee && (
        <Tab.Screen
          name="ManagerSwapShift"
          component={ManagerSwapRequests}
          options={{
            title: 'Swap Shift Requests',
            headerStyle: { backgroundColor: '#14213d' },
            tabBarIcon: ({ focused }) => (
              <Ionicons name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} color="#fca311" size={24} />
            ),
            headerTintColor: '#e5e5e5',
          }}
        />
      )}
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
      {user ? <InsideTabs user={user} /> : <Login />}
    </NavigationContainer>
  );
}
