import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import React, { useState } from 'react';

interface AvailabilityData {
  id: string;
  employeeId: string;
  date: string;
  start: string;
  end: string;
  shiftType: string;
  qualifications: string[];
  preferences: {
    preferredShifts: string[];
    unavailableDays: string[];
  };
}

interface ScheduleData {
  date: string;
  shiftType: string;
  employeeId: string;
}

const Schedule = () => {
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>([
    // Przykładowe dane dostępności
    { id: '1', employeeId: 'E1', date: '2024-11-10', start: '06:00', end: '14:00', shiftType: 'MORNING', qualifications: ['standard'], preferences: { preferredShifts: ['MORNING'], unavailableDays: [] }},
    { id: '2', employeeId: 'E2', date: '2024-11-10', start: '14:00', end: '22:00', shiftType: 'AFTERNOON', qualifications: ['standard'], preferences: { preferredShifts: ['AFTERNOON'], unavailableDays: [] }},
    // Dodaj więcej danych o dostępności pracowników
  ]);
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

  // Funkcja generująca harmonogram
  const generateSchedule = () => {
    const generatedSchedule: ScheduleData[] = [];

    availabilityData.forEach((availability) => {
      const { date, shiftType, employeeId, preferences, qualifications } = availability;

      // Sprawdź, czy pracownik ma preferencję na ten typ zmiany i kwalifikacje
      if (preferences.preferredShifts.includes(shiftType) && qualifications.includes('standard')) {
        generatedSchedule.push({
          date,
          shiftType,
          employeeId,
        });
      }
    });

    setScheduleData(generatedSchedule);
  };

  return (
    <View style={styles.container}>
      <Button 
        title="Generate Schedule"
        onPress={generateSchedule}
      />
      
      <ScrollView>
        <Text style={styles.header}>Generated Schedule</Text>
        {scheduleData.length > 0 ? (
          <View>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Date</Text>
              <Text style={styles.headerCell}>Shift Type</Text>
              <Text style={styles.headerCell}>Employee ID</Text>
            </View>
            {scheduleData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.cell}>{item.date}</Text>
                <Text style={styles.cell}>{item.shiftType}</Text>
                <Text style={styles.cell}>{item.employeeId}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.placeholder}>No schedule generated yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 4,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  }
});

export default Schedule;
