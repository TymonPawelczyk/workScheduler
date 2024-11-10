import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { sendAvailabilityData } from '../../api/api';
import { Worker, ShiftType, Shift, SchedulingConstraints } from '../../types/scheduling';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker'; 

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Availability = ({ navigation }: RouterProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedShift, setSelectedShift] = useState<ShiftType>(ShiftType.MORNING);

  const handleDayPress = (day: any) => { // Change to any if DateObject is not available
    setSelectedDate(day.dateString); // Save the selected date to state
    Alert.alert('Selected Date', `You selected ${day.dateString}`);
  };

  const handleAddAvailability = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      
      if (!currentUser?.uid) {
        throw new Error('User not authenticated');
      }

      // Ustawiamy godziny na podstawie wybranej zmiany
      let shiftHours = {
        start: '08:00',
        end: '16:00'
      };
      
      switch(selectedShift) {
        case ShiftType.MORNING:
          shiftHours = { start: '06:00', end: '14:00' };
          break;
        case ShiftType.AFTERNOON:
          shiftHours = { start: '14:00', end: '22:00' };
          break;
        case ShiftType.NIGHT:
          shiftHours = { start: '22:00', end: '06:00' };
          break;
      }

      const availabilityData = {
        employeeId: currentUser.uid,
        isAvailable: true,
        date: selectedDate,
        start: shiftHours.start,
        end: shiftHours.end,
        shiftType: selectedShift,
        qualifications: ['standard'],
        preferences: {
          preferredShifts: [selectedShift],
          unavailableDays: []
        }
      };

      const response = await sendAvailabilityData(availabilityData.employeeId, availabilityData);
      Alert.alert('Success', 'Availability has been added');
    } catch (error) {
      console.error('Error adding availability:', error);
      Alert.alert('Error', 'Failed to add availability');
    }
  };

  return (
    <View style={styles.container}>
      <Calendar 
        selectedDate={selectedDate}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate || '']: {
            selected: true,
            selectedColor: '#457b9d', // Ustawienie koloru wybranej daty
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#00adf5', // Ustawienie koloru 
          todayTextColor: '#457b9d',
          arrowColor: '#457b9d',
          backgroundColor: '#ffffff', // Zmień na dowolny kolor tła
          calendarBackground: '#f0f0f0',
        }}
      />
      
      <View style={styles.shiftSelector}>
        <Text>Select Shift:</Text>
        <Picker
          selectedValue={selectedShift}
          onValueChange={(itemValue) => setSelectedShift(itemValue)}
        >
          <Picker.Item label="Morning Shift (6:00-14:00)" value={ShiftType.MORNING} />
          <Picker.Item label="Afternoon Shift (14:00-22:00)" value={ShiftType.AFTERNOON} />
          <Picker.Item label="Night Shift (22:00-6:00)" value={ShiftType.NIGHT} />
        </Picker>
      </View>

      <Pressable style={styles.button} onPress={handleAddAvailability}>
        <Text style={styles.text}>Add Availability</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  shiftSelector: {
    marginVertical: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
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
});

export default Availability;
