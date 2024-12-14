// Idea for implementing shift swapping functionality

// Step 1: Add a "Swap Request" feature to the EmployeeDashboard
// This can involve creating a new section or modal where employees can select their shifts
// and request a swap with another employee's shift.

// Step 2: Modify Schedule.tsx to include swap requests.

// Example Implementation

import { StyleSheet, Text, View, Pressable, ScrollView, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface SwapRequest {
  fromEmployeeId: string;
  toEmployeeId: string;
  fromShift: string;
  toShift: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const SwapRequests = () => {
  const [requests, setRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [fromShiftType, setFromShiftType] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [toShiftType, setToShiftType] = useState('');
  const [toEmployeeId, setToEmployeeId] = useState('');

  const fetchSwapRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://675dfdda63b05ed079794d50.mockapi.io/api/v1/swap-requests');
      setRequests(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch swap requests.');
    } finally {
      setLoading(false);
    }
  };

  const createSwapRequest = async () => {
    const currentUser = FIREBASE_AUTH.currentUser?.email;
    if (!currentUser) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    if (!fromDate || !fromShiftType || !toDate || !toShiftType || !toEmployeeId) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await axios.post('https://675dfdda63b05ed079794d50.mockapi.io/api/v1/swap-requests', {
        fromEmployeeId: currentUser,
        toEmployeeId,
        fromShift: `${fromDate.toISOString().split('T')[0]} ${fromShiftType}`,
        toShift: `${toDate.toISOString().split('T')[0]} ${toShiftType}`,
        status: 'Pending',
      });
      Alert.alert('Success', 'Swap request submitted.');
      fetchSwapRequests();
    } catch (error) {
      Alert.alert('Error', 'Failed to create swap request.');
    }
  };

  useEffect(() => {
    fetchSwapRequests();
  }, []);

  return (
    <ScrollView>
      <Text style={styles.header}>Swap Requests</Text>
      {requests.map((request, index) => (
        <View key={index} style={styles.row}>
          <Text>From: {request.fromEmployeeId}</Text>
          <Text>To: {request.toEmployeeId}</Text>
          <Text>Status: {request.status}</Text>
        </View>
      ))}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your Shift Date:</Text>
        <Pressable onPress={() => setShowFromDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            value={fromDate.toISOString().split('T')[0]}
            editable={false}
          />
        </Pressable>
        {showFromDatePicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowFromDatePicker(false);
              if (selectedDate) setFromDate(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Your Shift Type:</Text>
        <Picker
          selectedValue={fromShiftType}
          onValueChange={(value) => setFromShiftType(value)}
        >
          <Picker.Item label="Morning" value="Morning" />
          <Picker.Item label="Afternoon" value="Afternoon" />
          <Picker.Item label="Night" value="Night" />
        </Picker>

        <Text style={styles.label}>Target Shift Date:</Text>
        <Pressable onPress={() => setShowToDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            value={toDate.toISOString().split('T')[0]}
            editable={false}
          />
        </Pressable>
        {showToDatePicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowToDatePicker(false);
              if (selectedDate) setToDate(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Target Shift Type:</Text>
        <Picker
          selectedValue={toShiftType}
          onValueChange={(value) => setToShiftType(value)}
        >
          <Picker.Item label="Morning" value="Morning" />
          <Picker.Item label="Afternoon" value="Afternoon" />
          <Picker.Item label="Night" value="Night" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Target Employee Email"
          value={toEmployeeId}
          onChangeText={setToEmployeeId}
        />
      </View>

      <Pressable style={styles.button} onPress={createSwapRequest}>
        <Text style={styles.text}>Request Swap</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  inputGroup: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
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
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SwapRequests;
