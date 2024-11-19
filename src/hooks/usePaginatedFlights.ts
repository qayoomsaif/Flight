import {useState, useEffect, useMemo} from 'react';
import {applyFilters} from '../utilities/applyFilters';
import {FlightData, FilterData} from '../all-types/types';
import {mockFlightData} from '../utilities/mockFlightData';

/**
 * Mock function to fetch all flight data.
 * This is a placeholder function that simulates fetching flight data.
 * In a real-world scenario, replace it with an actual API call.
 *
 * @returns {Promise<FlightData[]>} A promise that resolves to an array of flight data.
 */
const fetchAllFlights = async (): Promise<FlightData[]> => {
  // Replace with the actual data source or API call.
  return mockFlightData; // Simulated flight data.
};

/**
 * Custom hook to fetch and paginate flight data based on the provided filters.
 *
 * @param {FilterData} filters The filter options to apply on the flight data.
 * @param {number} currentPage The current page number for pagination.
 * @param {number} pageSize The number of items per page for pagination.
 *
 * @returns {Object} The flight data, loading state, total count, and other related information.
 */
export const usePaginatedFlights = (
  filters: FilterData,
  currentPage: number,
  pageSize: number,
) => {
  // State to hold the current list of flights based on the applied filters and pagination.
  const [flights, setFlights] = useState<FlightData[]>([]);

  // State to hold the total count of filtered flights (used for pagination and displaying total results).
  const [total, setTotal] = useState<number>(0);

  // State to track the loading state while fetching the data.
  const [loading, setLoading] = useState<boolean>(false);

  // State to track if there are more flights to load (pagination).
  const [hasMore, setHasMore] = useState<boolean>(false);

  // State to handle any errors that occur during data fetching.
  const [error, setError] = useState<string | null>(null);

  /**
   * Memoized function to fetch the flight data based on the current filters, page, and size.
   * This function ensures that flights are fetched only when the filters or pagination change.
   *
   * @returns {Promise<void>} A promise that resolves once the flights are fetched and processed.
   */
  const fetchFlights = useMemo(
    () => async () => {
      // Set loading state and reset error state before fetching data.
      setLoading(true);
      setError(null);

      try {
        // Fetch all flights (from API or mock data).
        const allFlights = await fetchAllFlights();

        // Apply filters to the fetched flights.
        const filteredFlights = applyFilters(allFlights, filters);

        // Update the total number of filtered flights (for pagination purposes).
        setTotal(filteredFlights.length);

        // Calculate start and end index for the current page of flights.
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;

        // Check if there are more flights to load based on the current pagination.
        setHasMore(filteredFlights.length > endIndex);
        
        // Slice the filtered flight data for the current page.
        const paginatedFlights = filteredFlights.slice(startIndex, endIndex);

        // Update the state with the paginated flight data.
        setFlights(paginatedFlights);
      } catch (err) {
        // If there's an error during the fetch, set the error message.
        setError('Failed to fetch flights');
        console.log('Failed to fetch flights', err);
      } finally {
        // Set loading to false after the fetch completes.
        setLoading(false);
      }
    },
    [filters, currentPage, pageSize], // Dependencies to refetch when filters, currentPage, or pageSize change.
  );

  // UseEffect hook to call the fetchFlights function whenever filters, currentPage, or pageSize change.
  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]); // Dependency on the memoized fetchFlights function.

  // Return an object containing the flight data, loading state, total count, hasMore state, and error.
  return {flights, total, loading, hasMore, error};
};
