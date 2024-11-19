import {useState, useEffect} from 'react';

/**
 * Represents a single filter option, such as an airline or airport.
 * Each option has a display name (`key`), a selected status (`selected`), and a unique value (`value`).
 *
 * @interface FilterOption
 */
interface FilterOption {
  /**
   * The display name of the filter option (e.g., "Duffel Airways").
   * @type {string}
   */
  key: string;

  /**
   * A boolean indicating whether the option is selected (true) or not (false).
   * @type {boolean}
   */
  selected: boolean;

  /**
   * A unique value associated with the filter option (e.g., 'ZZ' for Duffel Airways).
   * @type {string}
   */
  value: string;

  /**
   * Optional: A boolean to indicate if the filter option is disabled (e.g., if the option is unavailable).
   * @type {boolean}
   */
  disabled?: boolean;
}

/**
 * The filter data structure that holds the options for various filters such as airlines, airports, price range, etc.
 *
 * @interface Filters
 */
interface Filters {
  /**
   * List of available airline options.
   * @type {FilterOption[]}
   */
  airlines: FilterOption[];

  /**
   * The price range of flights as an array of two numbers [min, max].
   * @type {number[]}
   */
  all_price_range: number[];

  /**
   * List of available arrival airport options.
   * @type {FilterOption[]}
   */
  arrival_airports: FilterOption[];

  /**
   * The selected arrival flight (empty string if not set).
   * @type {string}
   */
  arrival_flight: string;

  /**
   * List of selected arrival flight numbers.
   * @type {string[]}
   */
  arrival_flight_numbers: string[];

  /**
   * The available arrival times as an array [start, end] in minutes.
   * @type {number[]}
   */
  arrival_times: number[];

  /**
   * List of available baggage options.
   * @type {FilterOption[]}
   */
  baggage: FilterOption[];

  /**
   * List of available departure airport options.
   * @type {FilterOption[]}
   */
  departure_airports: FilterOption[];

  /**
   * The selected departure flight (empty string if not set).
   * @type {string}
   */
  departure_flight: string;

  /**
   * List of selected departure flight numbers.
   * @type {string[]}
   */
  departure_flight_numbers: string[];

  /**
   * The available departure times as an array [start, end] in minutes.
   * @type {number[]}
   */
  departure_times: number[];

  /**
   * The price range for flights as an array [min, max].
   * @type {number[]}
   */
  price: number[];

  /**
   * List of return arrival airport options (if applicable).
   * @type {FilterOption[]}
   */
  return_arrival_airports: FilterOption[];

  /**
   * The available return arrival times as an array [start, end] in minutes.
   * @type {number[]}
   */
  return_arrival_times: number[];

  /**
   * List of return departure airport options (if applicable).
   * @type {FilterOption[]}
   */
  return_departure_airports: FilterOption[];

  /**
   * The available return departure times as an array [start, end] in minutes.
   * @type {number[]}
   */
  return_departure_times: number[];

  /**
   * List of available stop options (e.g., direct flights, 1 stop).
   * @type {FilterOption[]}
   */
  stops: FilterOption[];
}

/**
 * Mock filter data used for testing purposes. In a real scenario, this would be fetched from an API.
 *
 * @constant mockFilterData
 * @type {Filters}
 */
const mockFilterData: Filters = {
  airlines: [
    {key: 'Duffel Airways', selected: false, value: 'ZZ'},
    {key: 'Etihad Airways', selected: false, value: 'EY'},
    {key: 'Kuwait Airways', selected: false, value: 'KU'},
    {key: 'Saudia', selected: false, value: 'SV'},
    {key: 'Oman Air', selected: false, value: 'WY'},
    {key: 'Emirates', selected: false, value: 'EK'},
    {key: 'Gulf Air', selected: false, value: 'GF'},
    {key: 'Royal Jordanian', selected: false, value: 'RJ'},
    {key: 'Egyptair', selected: false, value: 'MS'},
    {key: 'flynas', selected: false, value: 'XY'},
    {key: 'Flydubai', selected: false, value: 'FZ'},
  ],
  all_price_range: [842, 13240],
  arrival_airports: [
    {
      key: 'Dubai World Central - Al Maktoum International Airport',
      selected: false,
      value: 'DWC',
    },
    {key: 'Dubai Bus Station', selected: false, value: 'XNB'},
    {key: 'Dubai International Airport', selected: false, value: 'DXB'},
  ],
  arrival_flight: '',
  arrival_flight_numbers: [],
  arrival_times: [0, 1439],
  baggage: [
    {key: 'All baggage options', selected: true, value: 'all_baggage_options'},
    {
      key: 'Check-in baggage included',
      selected: false,
      value: 'checked_baggaged_included',
    },
  ],
  departure_airports: [
    {
      key: 'King Abdulaziz International Airport',
      selected: false,
      value: 'JED',
    },
  ],
  departure_flight: '',
  departure_flight_numbers: [],
  departure_times: [0, 1439],
  price: [842, 13240],
  return_arrival_airports: [],
  return_arrival_times: [0, 1439],
  return_departure_airports: [
    {
      key: 'Dubai World Central - Al Maktoum International Airport',
      selected: false,
      value: 'DWC',
    },
    {key: 'Dubai Bus Station', selected: false, value: 'XNB'},
    {key: 'Dubai International Airport', selected: false, value: 'DXB'},
  ],
  return_departure_times: [0, 1439],
  stops: [
    {key: 'Any number of stops', selected: true, value: 'any_number_of_stops'},
    {
      disabled: false,
      key: 'Direct flights only',
      selected: false,
      value: 'direct_flights_only',
    },
    {key: '1 stop or less', selected: false, value: '1_stop_or_less'},
    {key: '2 stop or less', selected: false, value: '2_stop_or_less'},
  ],
};

/**
 * Custom hook that simulates fetching filter data.
 *
 * @returns {Object} Contains:
 *   - data: The mock filter data or `null` if not yet fetched.
 *   - isLoading: A boolean indicating whether the data is still being fetched.
 *   - error: An optional error message in case of failure.
 */
export const useFilters = () => {
  /**
   * State to hold the fetched filter data.
   * @type {Filters | null}
   */
  const [data, setData] = useState<Filters | null>(null);

  /**
   * State to track loading state.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * State to handle any error that occurs during fetching.
   * @type {string | null}
   */
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating an API call with a timeout.
    setTimeout(() => {
      setData(mockFilterData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return {data, isLoading, error}; // Return the data, loading state, and any errors.
};


// // src/hooks/useFilters.ts
// import {useQuery} from 'react-query';
// import {fetchFilters} from '../utilities/api';

// export const useFilters = () => {
  
//   return useQuery('filterData', fetchFilters, {
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     retry: 2, // Retry failed requests twice before giving up
//   });
// };
