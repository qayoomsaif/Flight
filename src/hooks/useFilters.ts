// // src/hooks/useFilters.ts
// import {useQuery} from 'react-query';
// import {fetchFilters} from '../utilities/api';

// export const useFilters = () => {
  
//   return useQuery('filterData', fetchFilters, {
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     retry: 2, // Retry failed requests twice before giving up
//   });
// };

// src/hooks/useFilters.ts
import { useState, useEffect } from 'react';

const mockFilterData = {
  airlines: [
    { key: 'Duffel Airways', selected: false, value: 'ZZ' },
    { key: 'Etihad Airways', selected: false, value: 'EY' },
    { key: 'Kuwait Airways', selected: false, value: 'KU' },
    { key: 'Saudia', selected: false, value: 'SV' },
    { key: 'Oman Air', selected: false, value: 'WY' },
    { key: 'Emirates', selected: false, value: 'EK' },
    { key: 'Gulf Air', selected: false, value: 'GF' },
    { key: 'Royal Jordanian', selected: false, value: 'RJ' },
    { key: 'Egyptair', selected: false, value: 'MS' },
    { key: 'flynas', selected: false, value: 'XY' },
    { key: 'Flydubai', selected: false, value: 'FZ' }
  ],
  all_price_range: [842, 13240],
  arrival_airports: [
    { key: 'Dubai World Central - Al Maktoum International Airport', selected: false, value: 'DWC' },
    { key: 'Dubai Bus Station', selected: false, value: 'XNB' },
    { key: 'Dubai International Airport', selected: false, value: 'DXB' }
  ],
  arrival_flight: '',
  arrival_flight_numbers: [],
  arrival_times: [0, 1439],
  baggage: [
    { key: 'All baggage options', selected: true, value: 'all_baggage_options' },
    { key: 'Check-in baggage included', selected: false, value: 'checked_baggaged_included' }
  ],
  departure_airports: [
    { key: 'King Abdulaziz International Airport', selected: false, value: 'JED' }
  ],
  departure_flight: '',
  departure_flight_numbers: [],
  departure_times: [0, 1439],
  price: [842, 13240],
  return_arrival_airports: [],
  return_arrival_times: [0, 1439],
  return_departure_airports: [
    { key: 'Dubai World Central - Al Maktoum International Airport', selected: false, value: 'DWC' },
    { key: 'Dubai Bus Station', selected: false, value: 'XNB' },
    { key: 'Dubai International Airport', selected: false, value: 'DXB' }
  ],
  return_departure_times: [0, 1439],
  stops: [
    { key: 'Any number of stops', selected: true, value: 'any_number_of_stops' },
    { disabled: false, key: 'Direct flights only', selected: false, value: 'direct_flights_only' },
    { key: '1 stop or less', selected: false, value: '1_stop_or_less' },
    { key: '2 stop or less', selected: false, value: '2_stop_or_less' }
  ]
};

export const useFilters = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockFilterData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { data, isLoading };
};
