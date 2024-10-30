import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DarkTheme, NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Dashboard = ( {navigation}: RouterProps ) => {
  return (
    <View style={styles.view}>
        <Text>Tutaj beda dane takie jak zarobki i inne statystyki w formie wykresow</Text>
        <Button onPress={() => navigation.navigate('Availability')} title='Go to Availability'></Button>
        <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout'></Button>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})