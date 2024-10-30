import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDayPress = (day: any) => { // Change to any if DateObject is not available
    setSelectedDate(day.dateString); // Save the selected date to state
    Alert.alert('Selected Date', `You selected ${day.dateString}`);
  };

  return (
    <View style={styles.container}>
      <Text>
        Kalendarz dla pracownika - wyswietlajacy zmiany na czerwono i wolne na zielono, dla menago - wyswietla ludzi ktorzy maja w danym dniu zmiany
      </Text>
      <Text style={styles.header}>Select a date</Text>
      <Calendar
        onDayPress={handleDayPress} // Call when a day is pressed
        markedDates={{
          [selectedDate || '']: {
            selected: true,
            selectedColor: '#00adf5',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
        }}
      />
      {selectedDate && (
        <Text style={styles.selectedDate}>
          Selected Date: {selectedDate}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CalendarView;
