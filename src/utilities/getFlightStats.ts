// src/utilities/getFlightStats.ts

import {FlightData, FilterData} from '../all-types/types'; // Import types for flight and filter data
import {applyFilters} from './applyFilters'; // Function to apply filters to flight data
import {mockFlightData as flights} from './mockFlightData'; // Mock flight data

/**
 * This function processes flight data by applying filters, finding the cheapest flight,
 * calculating the average price, and returning a flight that matches a given price range.
 *
 * It works with the `FlightData` type and filters the data based on the user's preferences,
 * then calculates and returns the cheapest flight and a flight that fits within a specified price range.
 *
 * @param {FilterData} filters - The filters that will be applied to the flight data. This includes criteria like price range and other filters to narrow down the flight options.
 * @returns {Array<{id: string, title: string, subtitle: string, time: string, status: boolean, icon: string, item: FlightData}>}
 * - An array of objects containing the flight information, including the cheapest flight, average price flight,
 * and flight that fits within the specified price range. Each object includes:
 *   - `id`: A unique identifier for the result.
 *   - `title`: A label describing the flight (e.g., 'Cheapest' or 'Our advice').
 *   - `subtitle`: A string showing the price and currency for the flight.
 *   - `time`: The departure time or a related metric for the flight.
 *   - `status`: A boolean indicating if the flight is selected (default is `false`).
 *   - `icon`: An icon identifier for the flight (default is an empty string).
 *   - `item`: The flight data object, which contains detailed information such as departure time and price.
 *
 * @example
 * const filters = {
 *   priceRange: [100, 500],
 *   // additional filter data (e.g., airlines, departure times) could be included here
 * };
 * const flightStats = getFlightStats(filters);
 * console.log(flightStats); // Logs the cheapest flight and the flight within the price range
 */
export const getFlightStats = (
  filters: FilterData,
): Array<{
  id: string;
  title: string;
  subtitle: string;
  time: string;
  status: boolean;
  icon: string;
  item: FlightData;
}> => {
  // Apply the filters to the flight data
  const filteredFlights = applyFilters(flights, filters);

  // If no flights match the filters, return an empty array
  if (filteredFlights.length === 0) {
    return [];
  }

  // Find the cheapest flight from the filtered flights
  const cheapestFlight = filteredFlights.reduce(
    (cheapestFlight, currentFlight) =>
      currentFlight.price < cheapestFlight.price
        ? currentFlight
        : cheapestFlight,
  );

  // Find a flight that matches the price range specified in the filters (if any)
  const priceRangeFlight =
    filteredFlights.find(
      flight =>
        flight.price >= filters.priceRange[0] &&
        flight.price <= filters.priceRange[1],
    ) || filteredFlights[0]; // Fallback to the first flight if none match the price range

  // Return an array with the flight stats, including the cheapest flight and a flight in the price range
  return [
    {
      id: 'cheapest_price',
      title: 'Cheapest',
      subtitle: `${cheapestFlight.price} ${cheapestFlight.currency}`,
      time: `${cheapestFlight.departureTime}m`,
      item: cheapestFlight,
      status: false,
      icon: '',
    },

    {
      id: 'average_price',
      title: 'Our advice',
      subtitle: `${priceRangeFlight.price} ${priceRangeFlight.currency}`,
      time: '',
      item: priceRangeFlight,
      status: false,
      icon: '',
    },
  ];
};
