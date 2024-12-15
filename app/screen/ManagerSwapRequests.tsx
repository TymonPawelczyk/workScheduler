import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import axios from 'axios';

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

const ManagerSwapRequests = () => {
  const [pendingRequests, setPendingRequests] = useState<SwapRequest[]>([]);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('https://675dfdda63b05ed079794d50.mockapi.io/api/v1/swap-requests');
      setPendingRequests(response.data.filter((request: SwapRequest) => request.status === 'pending'));
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      Alert.alert('Error', 'Failed to fetch pending requests.');
    }
  };

  const acceptRequest = async (request: SwapRequest) => {
    try {
      // Delete existing shifts for both employees
      await axios.delete(`https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1/availability/${request.fromShift.id}`);
      await axios.delete(`https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1/availability/${request.toShift.id}`);

      // Add new shifts based on the swap
      await axios.post(`https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1/availability`, {
        date: request.toShift.date,
        shiftType: request.toShift.shiftType,
        employeeId: request.fromEmployeeId,
      });

      await axios.post(`https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1/availability`, {
        date: request.fromShift.date,
        shiftType: request.fromShift.shiftType,
        employeeId: request.toEmployeeId,
      });

      // Update the swap request status
      await axios.put(`https://675dfdda63b05ed079794d50.mockapi.io/api/v1/swap-requests/${request.id}`, {
        status: 'approved',
      });

      Alert.alert('Success', 'The swap request has been approved.');
      fetchPendingRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
      Alert.alert('Error', 'Failed to approve the request.');
    }
  };

  const rejectRequest = async (request: SwapRequest) => {
    try {
      // Remove the swap request from the API
      await axios.delete(`https://675dfdda63b05ed079794d50.mockapi.io/api/v1/swap-requests/${request.id}`);

      Alert.alert('Success', 'The swap request has been rejected.');
      fetchPendingRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
      Alert.alert('Error', 'Failed to reject the request.');
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Pending Swap Requests</Text>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <View key={request.id} style={styles.box}>
              <Text>{`From: ${request.fromShift.date} - ${request.fromShift.shiftType} (${request.fromEmployeeId})`}</Text>
              <Text>{`To: ${request.toShift.date} - ${request.toShift.shiftType} (${request.toEmployeeId})`}</Text>
              <View style={styles.buttonGroup}>
                <Pressable style={styles.acceptButton} onPress={() => acceptRequest(request)}>
                  <Text style={styles.buttonText}>Accept</Text>
                </Pressable>
                <Pressable style={styles.rejectButton} onPress={() => rejectRequest(request)}>
                  <Text style={styles.buttonText}>Reject</Text>
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.placeholder}>No pending requests available.</Text>
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  placeholder: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default ManagerSwapRequests;
