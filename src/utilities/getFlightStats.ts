// src/utilities/getFlightStats.ts
import {FlightData, FilterData} from '../all-types/types';
import {applyFilters} from './applyFilters';
import {mockFlightData as flights} from './mockFlightData';

/**
 * Function to find the cheapest flight, calculate the average price, and return a flight with a price range.
 * @param {FilterData} filters - Filters to apply to the flight data.
 * @returns {Array<{id: string, title: string, subtitle: string, time: string,  filled: boolean, icon: string}>} - An array with the cheapest flight details, average price, and a flight with price range.
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
  // Apply the filters to the flights
  const filteredFlights = applyFilters(flights, filters);

  // If no flights match the filters, return an empty array
  if (filteredFlights.length === 0) {
    return [];
  }

  // Find the cheapest flight
  const cheapestFlight = filteredFlights.reduce(
    (cheapestFlight, currentFlight) =>
      currentFlight.price < cheapestFlight.price
        ? currentFlight
        : cheapestFlight,
  );

  // Find a flight that matches the price range (if any)
  const priceRangeFlight =
    filteredFlights.find(
      flight =>
        flight.price >= filters.priceRange[0] &&
        flight.price <= filters.priceRange[1],
    ) || filteredFlights[0]; // Fallback to the first flight if none match

  // Return the result array with flight data
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
