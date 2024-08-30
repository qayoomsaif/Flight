// src/utilities/applyFilters.ts
import {FlightData, FilterData} from '../all-types/types';

const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const matchesStops = (flight: FlightData, stopsFilter: string[]): boolean => {
  if (stopsFilter.length === 0 || stopsFilter.includes('any_number_of_stops')) {
    return true;
  }
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

  return stopsFilter.some(filter => stopConditions[filter]);
};

export const applyFilters = (
  flights: FlightData[],
  filters: FilterData,
): FlightData[] => {
  return flights.filter(flight => {
    const matchesAirline =
      filters.airlines.length === 0 ||
      filters.airlines.includes(flight.airline.value);

    const matchesPrice =
      filters.priceRange.length === 0 ||
      (flight.price >= filters.priceRange[0] &&
        flight.price <= filters.priceRange[1]);

    const matchesDepartureAirport =
      filters.departure_airports.length === 0 ||
      filters.departure_airports.includes(flight.departureAirport.value);

    const matchesArrivalAirport =
      filters.arrival_airports.length === 0 ||
      filters.arrival_airports.includes(flight.arrivalAirport.value);

    const matchesDepartureTime =
      filters.departureTimes.length === 0 ||
      (parseTime(flight.departureTime) >= filters.departureTimes[0] &&
        parseTime(flight.departureTime) <= filters.departureTimes[1]);

    const matchesArrivalTime =
      filters.arrivalTimes.length === 0 ||
      (parseTime(flight.arrivalTime) >= filters.arrivalTimes[0] &&
        parseTime(flight.arrivalTime) <= filters.arrivalTimes[1]);

    const matchesStopsFilter = matchesStops(flight, filters.stops);

    const matchesBaggage =
      filters.baggage.length === 0 ||
      (flight.baggageIncluded &&
        filters.baggage.includes('checked_baggaged_included')) ||
      (!flight.baggageIncluded &&
        filters.baggage.includes('all_baggage_options'));

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
