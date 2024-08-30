import {useState, useEffect, useMemo} from 'react';
import {applyFilters} from '../utilities/applyFilters';
import {FlightData, FilterData} from '../all-types/types';
import {mockFlightData} from '../utilities/mockFlightData';
// Mock function to fetch all flights (replace with actual API call if needed)
const fetchAllFlights = async (): Promise<FlightData[]> => {
  // Fetch or generate your mock flight data here
  return mockFlightData; // Replace with your actual data source
};

export const usePaginatedFlights = (
  filters: FilterData,
  currentPage: number,
  pageSize: number,
) => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = useMemo(
    () => async () => {
      setLoading(true);
      setError(null);
      try {
        const allFlights = await fetchAllFlights();
        const filteredFlights = applyFilters(allFlights, filters);

        // Update total count based on filtered data
        setTotal(filteredFlights.length);

        // Calculate start and end index for pagination
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;

        // Check if there are more results to fetch
        setHasMore(filteredFlights.length > endIndex);
        setLoading(false);
        // Slice the array to get the paginated results
        const paginatedFlights = filteredFlights.slice(startIndex, endIndex);
        setFlights(paginatedFlights);
      } catch (err) {
        setError('Failed to fetch flights');
        console.log('Failed to fetch flights', err);
      } finally {
        setLoading(false);
      }
    },
    [filters, currentPage, pageSize],
  );

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  return {flights, total, loading, hasMore, error};
};
