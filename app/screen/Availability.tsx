import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { setAvailability } from '../../api/api'; // Import funkcji setAvailability

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Availability = ({ navigation }: RouterProps) => {
  // Funkcja do dodania dostępności pracownika
  const handleAddAvailability = async () => {
    try {
      const availabilityData = {
        employeeId: 'employeeId123',
        isAvailable: true,
        date: '2024-10-25', // przykładowa data
      };
      const response = await setAvailability(availabilityData.employeeId, availabilityData);
      console.log('Dostępność dodana:', response);
    } catch (error) {
      console.error('Błąd dodawania dostępności:', error);
    }
  };

  return (
    <View style={styles.view}>
      <Button onPress={() => navigation.navigate('Calendar')} title="Calendar" />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
      <Button onPress={handleAddAvailability} title="Dodaj dostępność" />
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
