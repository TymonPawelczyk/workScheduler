import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface ScheduleEntry {
  date: string;
  shiftType: string;
  employeeId: string;
}

interface ScheduleData {
  id: string;
  schedule: ScheduleEntry[];
}

const EmployeeDashboard = () => {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1/generated-schedule');
      const schedules: ScheduleData[] = response.data;

      if (schedules.length === 0) {
        Alert.alert('No Schedules', 'No schedules found.');
        setSchedule([]);
        return;
      }

      // Find the schedule with the highest ID
      const latestSchedule = schedules.reduce((prev, current) =>
        Number(current.id) > Number(prev.id) ? current : prev
      );

      const currentUserEmail = FIREBASE_AUTH.currentUser?.email || "";

      // Filter shifts assigned to the logged-in user
      const userSchedule = latestSchedule.schedule.filter(
        (entry) => entry.employeeId === currentUserEmail
      );

      setSchedule(userSchedule);
      setError(null);
    } catch (err: any) {
      setError('Error fetching the latest schedule');
      console.error('Fetch schedule error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestSchedule();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={fetchLatestSchedule}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.text}>Refresh Schedule</Text>
        )}
      </Pressable>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <ScrollView>
        <Text style={styles.header}>My Schedule</Text>
        {schedule.length > 0 ? (
          schedule.map((shift, index) => (
            <View key={index} style={styles.row}>
              <Text>{shift.date}</Text>
              <Text>{shift.shiftType}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.placeholder}>No schedule available.</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
});

export default EmployeeDashboard;
