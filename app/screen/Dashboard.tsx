import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
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
          <Pressable style={styles.button} onPress={() => FIREBASE_AUTH.signOut()}>
            <Text style={styles.text}>Logout</Text>
          </Pressable>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
      marginVertical: 4,
      marginHorizontal: 120,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
})