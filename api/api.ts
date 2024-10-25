import axios from 'axios';

const API_URL = 'https://671b64ad2c842d92c37fb3ad.mockapi.io/api/v1';

export const setAvailability = async (
  employeeId: string,
  availabilityData: { isAvailable: boolean; date: string; start: string; end: string }
) => {
  try {
    const response = await axios.post(`${API_URL}/availability`, {
      employeeId,
      ...availabilityData,
    });
    return response.data;
  } catch (error) {
    console.error('Błąd zapisywania dostępności:', error);
    throw error;
  }
};
