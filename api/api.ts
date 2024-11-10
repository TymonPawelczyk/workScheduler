// w pliku api.ts
import axios from 'axios';
import { ShiftType } from '../types/scheduling';
import { Alert } from 'react-native';

export const API_URL = 'https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1';

export const sendAvailabilityData = async (userId: string, availabilityData: any) => {
  try {
    // Najpierw sprawdzamy czy istnieje już taki wpis
    const existingData = await axios.get(`${API_URL}/availability`);
    const isDuplicate = existingData.data.some((item: any) => 
      item.userId === userId && 
      item.date === availabilityData.date && 
      item.shiftType === availabilityData.shiftType
    );

    if (isDuplicate) {
      Alert.alert(
        "Duplicate Entry",
        "You have already submitted availability for this date and shift type.",
        [{ text: "OK" }]
      );
      throw new Error('Duplicate entry');
    }

    // Jeśli nie ma duplikatu, wysyłamy dane
    const response = await axios.post(`${API_URL}/availability`, {
      userId,
      ...availabilityData
    });
    return response.data;
  } catch (error: any) {
    if (error.message === 'Duplicate entry') {
      // Już wyświetliliśmy alert, więc tylko przekazujemy błąd dalej
      throw error;
    }
    console.error('Error sending availability data:', error);
    Alert.alert(
      "Error",
      "Failed to submit availability. Please try again.",
      [{ text: "OK" }]
    );
    throw error;
  }
};
