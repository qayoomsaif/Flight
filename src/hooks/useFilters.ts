// src/hooks/useFilters.ts
import {useQuery} from 'react-query';
import {fetchFilters} from '../utilities/api';

export const useFilters = () => {
  
  return useQuery('filterData', fetchFilters, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Retry failed requests twice before giving up
  });
};
