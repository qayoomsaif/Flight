// src/utilities/applyFilters.ts
import {FlightData, FilterData} from '../all-types/types';

/**
 * Parses a time string in the format of "HH:MM" into a number representing total minutes.
 *
 * @param {string} time - The time string in "HH:MM" format.
 * @returns {number} - The total time in minutes.
 */
const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Determines whether a flight matches the provided stops filter.
 *
 * @param {FlightData} flight - The flight object containing information about stops.
 * @param {string[]} stopsFilter - The filter criteria for stops (e.g., 'direct_flights_only', '1_stop_or_less').
 * @returns {boolean} - Whether the flight matches the stops filter.
 */
const matchesStops = (flight: FlightData, stopsFilter: string[]): boolean => {
  // If no filter is applied or the filter allows any number of stops
  if (stopsFilter.length === 0 || stopsFilter.includes('any_number_of_stops')) {
    return true;
  }

  // Conditions for different stop options
  const stopConditions = {
    direct_flights_only: flight.stops.value === 'direct_flights_only',
    '1_stop_or_less':
      flight.stops.value === 'Direct flights only' ||
      flight.stops.value === '1_stop_or_less',
    '2_stop_or_less':
      flight.stops.value === 'Direct flights only' ||
      flight.stops.value === '1_stop_or_less' ||
      flight.stops.value === '2_stop_or_less',
  };

  // Check if any of the selected filters match the stop conditions
  return stopsFilter.some(filter => stopConditions[filter]);
};

/**
 * Filters the given list of flights based on the selected filters.
 *
 * @param {FlightData[]} flights - The list of flight data to filter.
 * @param {FilterData} filters - The filter criteria (airlines, price range, times, stops, etc.).
 * @returns {FlightData[]} - A filtered list of flights that match all selected filters.
 */
export const applyFilters = (
  flights: FlightData[],
  filters: FilterData,
): FlightData[] => {
  return flights.filter(flight => {
    // Check if the flight matches the selected airline filter
    const matchesAirline =
      filters.airlines.length === 0 ||
      filters.airlines.includes(flight.airline.value);

    // Check if the flight matches the selected price range filter
    const matchesPrice =
      filters.priceRange.length === 0 ||
      (flight.price >= filters.priceRange[0] &&
        flight.price <= filters.priceRange[1]);

    // Check if the flight matches the selected departure airport filter
    const matchesDepartureAirport =
      filters.departure_airports.length === 0 ||
      filters.departure_airports.includes(flight.departureAirport.value);

    // Check if the flight matches the selected arrival airport filter
    const matchesArrivalAirport =
      filters.arrival_airports.length === 0 ||
      filters.arrival_airports.includes(flight.arrivalAirport.value);

    // Check if the flight matches the selected departure time range filter
    const matchesDepartureTime =
      filters.departureTimes.length === 0 ||
      (parseTime(flight.departureTime) >= filters.departureTimes[0] &&
        parseTime(flight.departureTime) <= filters.departureTimes[1]);

    // Check if the flight matches the selected arrival time range filter
    const matchesArrivalTime =
      filters.arrivalTimes.length === 0 ||
      (parseTime(flight.arrivalTime) >= filters.arrivalTimes[0] &&
        parseTime(flight.arrivalTime) <= filters.arrivalTimes[1]);

    // Check if the flight matches the selected stops filter
    const matchesStopsFilter = matchesStops(flight, filters.stops);

    // Check if the flight matches the selected baggage filter
    const matchesBaggage =
      filters.baggage.length === 0 ||
      (flight.baggageIncluded &&
        filters.baggage.includes('checked_baggaged_included')) ||
      (!flight.baggageIncluded &&
        filters.baggage.includes('all_baggage_options'));

    // Return true if the flight matches all selected filters, otherwise false
    return (
      matchesAirline &&
      matchesPrice &&
      matchesDepartureAirport &&
      matchesArrivalAirport &&
      matchesDepartureTime &&
      matchesArrivalTime &&
      matchesStopsFilter &&
      matchesBaggage
    );
  });
};
