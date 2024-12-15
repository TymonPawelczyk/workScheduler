import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { sendAvailabilityData } from '../../api/api';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker'; 
import { ShiftType } from '../../types/scheduling';

const Availability = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedShift, setSelectedShift] = useState<ShiftType>(ShiftType.MORNING);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    Alert.alert('Selected Date', `You selected ${day.dateString}`);
  };

  const handleAddAvailability = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser?.email;

      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const availabilityData = {
        date: selectedDate,
        shiftType: selectedShift,
        employeeId: currentUser,
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
            selectedColor: '#14213d',
          },
        }}
        theme={{
          todayTextColor: '#fca311',
          arrowColor: '#fca311',
          backgroundColor: '#ffffff',
          calendarBackground: '#f0f0f0',
          textSectionTitleColor: '#333333',
          dayTextColor: '#000000',
          textDisabledColor: '#adb5bd',
          monthTextColor: '#fca311',
        }}
      />

      <View style={styles.shiftSelector}>
        <Text style={styles.text}>Select Shift:</Text>
        <Picker
          selectedValue={selectedShift}
          onValueChange={(itemValue) => setSelectedShift(itemValue)}
        >
          <Picker.Item label="Morning Shift" value={ShiftType.MORNING} />
          <Picker.Item label="Afternoon Shift" value={ShiftType.AFTERNOON} />
          <Picker.Item label="Night Shift" value={ShiftType.NIGHT} />
        </Picker>
      </View>

      <Pressable style={styles.button} onPress={handleAddAvailability}>
        <Text style={styles.buttonText}>Add Availability</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  shiftSelector: {
    marginVertical: 15,
  },
  button: {
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Availability;
