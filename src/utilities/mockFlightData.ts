// src/utilities/mockFlightData.ts

import {FilterData, FlightData} from '../all-types/types';

// Helper function to generate a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate a random future date within the next 1 to 60 days
const getRandomFutureDate = () => {
  const today = new Date();
  const futureDate = new Date(
    today.setDate(today.getDate() + getRandomInt(1, 60)),
  );
  return futureDate.toISOString();
};

// Mapping stop options to user-friendly names for display
const stopOptionsMap: {[key: string]: string} = {
  direct_flights_only: 'Direct',
  '1_stop_or_less': '1 stop',
  '2_stop_or_less': '2 stop',
};

// Function to get short name for a stop option
function getShortName(key: string): string {
  return stopOptionsMap[key] || key; // Returns the mapped name or the key if no mapping exists
}

// Example usage

// Mapping airport codes to their respective cities
const airportCityMapping: Record<string, string> = {
  DXB: 'Dubai',
  DWC: 'Dubai',
  XNB: 'Dubai',
  JED: 'Jeddah',
  // Add more mappings as needed
};

// Filter data (simulating available filter options for flights)
const filterData: FilterData = {
  airlines: [
    {key: 'Duffel Airways', value: 'ZZ'},
    {key: 'Etihad Airways', value: 'EY'},
    {key: 'Kuwait Airways', value: 'KU'},
    {key: 'Saudia', value: 'SV'},
    {key: 'Oman Air', value: 'WY'},
    {key: 'Emirates', value: 'EK'},
    {key: 'Gulf Air', value: 'GF'},
    {key: 'Royal Jordanian', value: 'RJ'},
    {key: 'Egyptair', value: 'MS'},
    {key: 'flynas', value: 'XY'},
    {key: 'Flydubai', value: 'FZ'},
  ],
  all_price_range: [0, 13240], // Price range for flights
  arrival_airports: [
    {
      key: 'Dubai World Central - Al Maktoum International Airport',
      value: 'DWC',
      selected: false,
    },
    {key: 'Dubai Bus Station', value: 'XNB', selected: false},
    {key: 'Dubai International Airport', value: 'DXB', selected: false},
  ],
  departure_airports: [
    {
      key: 'King Abdulaziz International Airport',
      value: 'JED',
      selected: false,
    },
    {
      key: 'Dubai World Central - Al Maktoum International Airport',
      value: 'DWC',
      selected: false,
    },
    {key: 'Dubai Bus Station', value: 'XNB', selected: false},
    {key: 'Dubai International Airport', value: 'DXB', selected: false},
  ],
  stops: [
    {key: 'Direct flights only', value: 'direct_flights_only'},
    {key: '1 stop or less', value: '1_stop_or_less'},
    {key: '2 stops or less', value: '2_stop_or_less'},
  ],
  baggage: [
    {key: 'All baggage options', value: 'all_baggage_options'},
    {key: 'Check-in baggage included', value: 'checked_baggaged_included'},
  ],
};

// Dummy image URLs (currently empty, but can be populated with real URLs)
const dummyImageUrls = [''];

// Generating mock flight data with random values
export const mockFlightData: FlightData[] = Array.from(
  {length: 1000}, // Creating an array of 1000 flight data objects
  (_, index) => {
    // Randomly select departure and arrival airports
    const departureAirport =
      filterData.departure_airports[
        getRandomInt(0, filterData.departure_airports.length - 1)
      ];
    const arrivalAirport =
      filterData.arrival_airports[
        getRandomInt(0, filterData.arrival_airports.length - 1)
      ];

    // Randomly select airline, baggage option, and stop option
    const airline =
      filterData.airlines[getRandomInt(0, filterData.airlines.length - 1)];
    const baggageOption =
      filterData.baggage[getRandomInt(0, filterData.baggage.length - 1)];
    const stopOption =
      filterData.stops[getRandomInt(0, filterData.stops.length - 1)];

    // Generate random price within the specified range
    const price = getRandomInt(
      filterData.all_price_range[0],
      filterData.all_price_range[1],
    );

    // Generate random future dates for departure and arrival
    const departureDay = getRandomFutureDate();
    const arrivalDay = getRandomFutureDate();

    return {
      id: index + 1, // Unique flight ID
      departureTime: `${getRandomInt(0, 23)}:${getRandomInt(0, 59)
        .toString()
        .padStart(2, '0')}`, // Random departure time
      arrivalTime: `${getRandomInt(0, 23)}:${getRandomInt(0, 59)
        .toString()
        .padStart(2, '0')}`, // Random arrival time
      flightDuration: `${getRandomInt(1, 15)}h ${getRandomInt(0, 59)}m`, // Random flight duration
      stops: {...stopOption, name: getShortName(stopOption.value)}, // Stop details with short name
      stopDetails: stopOption.key, // Full stop option key (e.g., 'direct_flights_only')
      departureCity: airportCityMapping[departureAirport.value], // Departure city from airport code
      departureAirport: {
        key: departureAirport.key,
        value: departureAirport.value,
      },
      departureDate: departureDay, // Departure date
      arrivalCity: airportCityMapping[arrivalAirport.value], // Arrival city from airport code
      arrivalAirport: {
        key: arrivalAirport.key,
        value: arrivalAirport.value,
      },
      arrivalDate: arrivalDay, // Arrival date
      airline: {
        key: airline.key,
        value: airline.value,
      },
      price: price, // Flight price
      currency: 'SAR', // Currency (e.g., 'SAR')
      passengerCount: getRandomInt(1, 4), // Random number of passengers
      baggageIncluded: baggageOption.value === 'checked_baggaged_included', // Whether checked baggage is included
      baggageOption: {
        key: baggageOption.key,
        value: baggageOption.value,
      },
      direct: stopOption.value === 'direct_flights_only', // Whether the flight is direct
      imageUrl: dummyImageUrls[getRandomInt(0, dummyImageUrls.length - 1)], // Random image URL (currently empty)
    };
  },
);
