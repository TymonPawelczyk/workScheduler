import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface Shift {
  id: string;
  date: string;
  shiftType: string;
  employeeId: string;
}

interface SwapRequest {
  id: string;
  fromEmployeeId: string;
  fromShift: Shift;
  toEmployeeId: string;
  toShift: Shift;
  status: 'pending' | 'approved' | 'rejected';
}

const SwapShift = () => {
  const [availability, setAvailability] = useState<Shift[]>([]);
  const [myShifts, setMyShifts] = useState<Shift[]>([]);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [selectedSwapWith, setSelectedSwapWith] = useState<Shift | null>(null);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);

  const fetchAvailability = async () => {
    try {
      const response = await axios.get('https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1/availability');
      setAvailability(response.data);
      const currentUser = FIREBASE_AUTH.currentUser?.email;
      setMyShifts(response.data.filter((shift: Shift) => shift.employeeId === currentUser));
    } catch (error) {
      console.error('Error fetching availability:', error);
      Alert.alert('Error', 'Failed to fetch availability.');
    }
  };

  const fetchSwapRequests = async () => {
    try {
      const response = await axios.get('https://675dfdda63b05ed079794d50.mockapi.io/api/v1/swap-requests');
      setSwapRequests(response.data);
    } catch (error) {
      console.error('Error fetching swap requests:', error);
      Alert.alert('Error', 'Failed to fetch swap requests.');
    }
  };

  const requestSwap = async () => {
    if (!selectedShift || !selectedSwapWith) {
      Alert.alert('Error', 'Please select both your shift and the shift you want to swap with.');
      return;
    }

    try {
      const currentUser = FIREBASE_AUTH.currentUser?.email;
      const swapRequest: Omit<SwapRequest, 'id'> = {
        fromEmployeeId: currentUser!,
        fromShift: selectedShift,
        toEmployeeId: selectedSwapWith.employeeId,
        toShift: selectedSwapWith,
        status: 'pending',
      };

      const response = await axios.post('https://675dfdda63b05ed079794d50.mockapi.io/api/v1/swap-requests', swapRequest);
      Alert.alert('Success', 'Your swap request has been sent.');
      fetchSwapRequests();
    } catch (error) {
      console.error('Error sending swap request:', error);
      Alert.alert('Error', 'Failed to send swap request.');
    }
  };

  useEffect(() => {
    fetchAvailability();
    fetchSwapRequests();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>My Shifts</Text>
        {myShifts.length > 0 ? (
          myShifts.map((shift) => (
            <View key={shift.id} style={styles.box}>
              <Text>{`Date: ${shift.date}`}</Text>
              <Text>{`Shift: ${shift.shiftType}`}</Text>
              <Text>{`Employee: ${shift.employeeId}`}</Text>
              <Pressable
                style={[styles.selectButton, selectedShift?.id === shift.id && styles.selectedButton]}
                onPress={() => setSelectedShift(shift)}
              >
                <Text style={[styles.buttonText, selectedShift?.id === shift.id && styles.selectedButtonText]}>Select</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={styles.placeholder}>You have no shifts.</Text>
        )}

        <Text style={styles.header}>Available Shifts to Swap</Text>
        {availability.length > 0 ? (
          availability
            .filter((shift) => shift.employeeId !== FIREBASE_AUTH.currentUser?.email)
            .map((shift) => (
              <View key={shift.id} style={styles.box}>
                <Text>{`Date: ${shift.date}`}</Text>
                <Text>{`Shift: ${shift.shiftType}`}</Text>
                <Text>{`Employee: ${shift.employeeId}`}</Text>
                <Pressable
                  style={[styles.selectButton, selectedSwapWith?.id === shift.id && styles.selectedButton]}
                  onPress={() => setSelectedSwapWith(shift)}
                >
                  <Text style={[styles.buttonText, selectedSwapWith?.id === shift.id && styles.selectedButtonText]}>Select</Text>
                </Pressable>
              </View>
            ))
        ) : (
          <Text style={styles.placeholder}>No available shifts for swapping.</Text>
        )}

        <Pressable style={styles.swapButton} onPress={requestSwap}>
          <Text style={styles.swapButtonText}>Request Swap</Text>
        </Pressable>

        <Text style={styles.header}>Swap Requests</Text>
        {swapRequests.length > 0 ? (
          swapRequests.map((request) => (
            <View key={request.id} style={styles.box}>
              <Text>{`From: ${request.fromShift.date} - ${request.fromShift.shiftType}`}</Text>
              <Text>{`To: ${request.toShift.date} - ${request.toShift.shiftType}`}</Text>
              <Text>{`Status: ${request.status}`}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.placeholder}>No swap requests available.</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  box: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  selectButton: {
    backgroundColor: '#14213d',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  selectedButtonText: {
    color: 'black',
  },
  placeholder: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  swapButton: {
    marginTop: 20,
    backgroundColor: '#fca311',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  swapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SwapShift;
