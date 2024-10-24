import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Availability = ({navigation}: RouterProps) => {
  return (
    <View style={styles.view}>
        <Button onPress={() => navigation.navigate('Calendar')} title='Calendar'></Button>
        <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout'></Button>
    </View>
  )
}

export default Availability

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})