// src/utilities/api.ts

import axios from 'axios';

export const fetchFilters = async () => {
  try {
    const response = await axios.get('https://direct.free.beeceptor.com/filters');
    return response.data;
  } catch (error) {
    // Handle error appropriately for your app
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`API Error: ${error.response.data.message}`);
    } else {
      throw new Error('Network Error');
    }
  }
};
