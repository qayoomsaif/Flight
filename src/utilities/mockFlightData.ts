// src/utilities/mockFlightData.ts

import {FilterData, FlightData} from '../all-types/types';

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFutureDate = () => {
  const today = new Date();
  const futureDate = new Date(
    today.setDate(today.getDate() + getRandomInt(1, 60)),
  );
  return futureDate.toISOString();
};

const stopOptionsMap: {[key: string]: string} = {
  direct_flights_only: 'Direct',
  '1_stop_or_less': '1 stop',
  '2_stop_or_less': '2 stop',
};

function getShortName(key: string): string {
  return stopOptionsMap[key] || key;
}

// Example usage

// Mapping airport codes to cities
const airportCityMapping: Record<string, string> = {
  DXB: 'Dubai',
  DWC: 'Dubai',
  XNB: 'Dubai',
  JED: 'Jeddah',
  // Add more mappings as needed
};

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
  all_price_range: [0, 13240],
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

const dummyImageUrls = [''];

export const mockFlightData: FlightData[] = Array.from(
  {length: 1000},
  (_, index) => {
    const departureAirport =
      filterData.departure_airports[
        getRandomInt(0, filterData.departure_airports.length - 1)
      ];
    const arrivalAirport =
      filterData.arrival_airports[
        getRandomInt(0, filterData.arrival_airports.length - 1)
      ];
    const airline =
      filterData.airlines[getRandomInt(0, filterData.airlines.length - 1)];
    const baggageOption =
      filterData.baggage[getRandomInt(0, filterData.baggage.length - 1)];
    const stopOption =
      filterData.stops[getRandomInt(0, filterData.stops.length - 1)];
    const price = getRandomInt(
      filterData.all_price_range[0],
      filterData.all_price_range[1],
    );
    const departureDay = getRandomFutureDate();
    const arrivalDay = getRandomFutureDate();

    return {
      id: index + 1,
      departureTime: `${getRandomInt(0, 23)}:${getRandomInt(0, 59)
        .toString()
        .padStart(2, '0')}`,
      arrivalTime: `${getRandomInt(0, 23)}:${getRandomInt(0, 59)
        .toString()
        .padStart(2, '0')}`,
      flightDuration: `${getRandomInt(1, 15)}h ${getRandomInt(0, 59)}m`,
      stops: {...stopOption, name: getShortName(stopOption.value)},
      stopDetails: stopOption.key,
      departureCity: airportCityMapping[departureAirport.value],
      departureAirport: {
        key: departureAirport.key,
        value: departureAirport.value,
      },
      departureDate: departureDay,
      arrivalCity: airportCityMapping[arrivalAirport.value],
      arrivalAirport: {
        key: arrivalAirport.key,
        value: arrivalAirport.value,
      },
      arrivalDate: arrivalDay,
      airline: {
        key: airline.key,
        value: airline.value,
      },
      price: price,
      currency: 'SAR',
      passengerCount: getRandomInt(1, 4),
      baggageIncluded: baggageOption.value === 'checked_baggaged_included',
      baggageOption: {
        key: baggageOption.key,
        value: baggageOption.value,
      },
      direct: stopOption.value === 'direct_flights_only',
      imageUrl: dummyImageUrls[getRandomInt(0, dummyImageUrls.length - 1)],
    };
  },
);
