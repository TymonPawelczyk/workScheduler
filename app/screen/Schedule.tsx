import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/api';

interface AvailabilityData {
  id: string;
  employeeId: string;
  date: string;
  start: string;
  end: string;
  shiftType: string;
}

const Schedule = () => {
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/availability`);
      setAvailabilityData(response.data);
      setError(null);
    } catch (err: any) {
      if (err.response) {
        setError(`Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('Network error - check your connection');
      } else {
        setError('Failed to fetch availability data');
      }
      console.error('Error fetching availability:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button 
        title={loading ? "Loading..." : "Show Employee Availability"}
        onPress={fetchAvailability}
        disabled={loading}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <ScrollView>
        <Text style={styles.header}>Employee Availability</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Employee ID</Text>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Start Time</Text>
          <Text style={styles.headerCell}>End Time</Text>
        </View>
        {availabilityData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.cell}>{item.employeeId}</Text>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.start}</Text>
            <Text style={styles.cell}>{item.end}</Text>
          </View>
        ))}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  }
});

export default Schedule;
