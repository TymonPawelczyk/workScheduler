// Adding functionality to save the generated schedule and send it to the specified API endpoint.

import { StyleSheet, Text, View, ScrollView, Button, Pressable, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

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
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>([]);
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1/availability');
      setAvailabilityData(response.data);
      setError(null);
    } catch (err: any) {
      setError('Error fetching availability data');
    } finally {
      setLoading(false);
    }
  };

  const generateSchedule = () => {
    const generatedSchedule: ScheduleData[] = [];
    const scheduleMap: { [key: string]: number } = {}; 

    availabilityData.forEach((availability) => {
      const { date, shiftType, employeeId, preferences, qualifications } = availability;
      const scheduleKey = `${date}_${shiftType}`;

      if (preferences.preferredShifts.includes(shiftType) && qualifications.includes('standard')) {
        const alreadyScheduled = generatedSchedule.some(
          (shift) => shift.date === date && shift.employeeId === employeeId
        );

        const shiftCapacityReached = (scheduleMap[scheduleKey] || 0) >= 2;

        if (!alreadyScheduled && !shiftCapacityReached) {
          generatedSchedule.push({
            date,
            shiftType,
            employeeId,
          });

          scheduleMap[scheduleKey] = (scheduleMap[scheduleKey] || 0) + 1;
        }
      }
    });

    setScheduleData(generatedSchedule.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const saveSchedule = async () => {
    try {
      if (scheduleData.length === 0) {
        Alert.alert('No Schedule', 'Please generate a schedule before saving.');
        return;
      }

      const response = await axios.post(
        'https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1/generated-schedule',
        { schedule: scheduleData }
      );
      Alert.alert('Success', 'Schedule has been saved successfully.');
    } catch (error) {
      console.error('Error saving schedule:', error);
      Alert.alert('Error', 'Failed to save schedule.');
    }
  };

  const groupedSchedule = scheduleData.reduce<{ [date: string]: ScheduleData[] }>((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={fetchAvailability}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.text}>Fetch Employee Availability</Text>
        )}
      </Pressable>

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={generateSchedule}
        disabled={loading || availabilityData.length === 0}
      >
        <Text style={styles.text}>Generate Schedule</Text>
      </Pressable>

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={saveSchedule}
        disabled={loading || scheduleData.length === 0}
      >
        <Text style={styles.text}>Save Schedule</Text>
      </Pressable>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <ScrollView>
        <Text style={styles.header}>Generated Schedule</Text>
        {Object.keys(groupedSchedule).length > 0 ? (
          Object.keys(groupedSchedule).map((date) => (
            <View key={date} style={styles.daySection}>
              <Text style={styles.dateHeader}>{date}</Text>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Shift Type</Text>
                <Text style={styles.headerCell}>Employee ID</Text>
              </View>
              {groupedSchedule[date].map((shift, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.cell}>{shift.shiftType}</Text>
                  <Text style={styles.cell}>{shift.employeeId}</Text>
                </View>
              ))}
            </View>
          ))
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
  daySection: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  placeholder: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  button: {
    marginVertical: 4,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonDisabled: {
    backgroundColor: '#888',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Schedule;
