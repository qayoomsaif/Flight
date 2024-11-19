import axios from 'axios';

/**
 * Fetches filter data from the remote API.
 * This function makes a GET request to fetch filter options, which might be used to apply filters in the app.
 *
 * @throws {Error} Throws an error if the request fails, either due to a network issue or an API-specific error.
 *
 * @returns {Promise<any>} Resolves with the filter data fetched from the API, or throws an error if the request fails.
 */
export const fetchFilters = async (): Promise<any> => {
  try {
    // Make a GET request to the API endpoint to fetch filter data
    const response = await axios.get(
      'https://direct.free.beeceptor.com/filters',
    );

    // Return the response data containing filter options
    return response.data;
  } catch (error) {
    // Handle errors that may occur during the request

    if (axios.isAxiosError(error) && error.response) {
      // If it's an Axios error and the server responded, throw an error with the server's message
      throw new Error(`API Error: ${error.response.data.message}`);
    } else {
      // If it's a network error or Axios couldn't send the request, throw a general network error
      throw new Error('Network Error');
    }
  }
};
