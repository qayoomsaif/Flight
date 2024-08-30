import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FilterState {
  stops: string[];
  airlines: string[];
  priceRange: number[];
  departureTimes: number[];
  arrivalTimes: number[];
  baggage: string[];
  departure_airports: string[];
  arrival_airports: string[];
}

// Define the keys of the FilterState
type FilterKey = keyof FilterState;

const initialState: FilterState = {
  stops: [],
  airlines: [],
  priceRange: [],
  departureTimes: [],
  arrivalTimes: [],
  baggage: [],
  departure_airports: [],
  arrival_airports: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedFilters(
      state,
      action: PayloadAction<{key: FilterKey; value: string; select?: boolean}>,
    ) {
      const {key, value, select} = action.payload;

      if (!state[key]) {
        console.warn(`Invalid key: ${key}`);
        return;
      }

      // Default to toggling the selection if not provided
      const shouldSelect =
        select !== undefined ? select : !state[key].includes(value);

      if (shouldSelect) {
        if (!state[key].includes(value)) {
          state[key].push(value);
        }
      } else {
        state[key] = state[key].filter(v => v !== value);
      }
    },
    setTimeRange(
      state,
      action: PayloadAction<{
        key: 'departureTimes' | 'arrivalTimes';
        values: number[];
      }>,
    ) {
      const {key, values} = action.payload;

      if (!state[key]) {
        console.warn(`Invalid key: ${key}`);
        return;
      }

      state[key] = values;
    },
    setPriceRange(state, action: PayloadAction<number[]>) {
      state.priceRange = action.payload;
    },
    applyAllFilters(state, action: PayloadAction<FilterState>) {
      return {...state, ...action.payload};
    },
    resetFilters(state) {
      state.stops = [];
      state.airlines = [];
      state.priceRange = [];
      state.departureTimes = [];
      state.arrivalTimes = [];
      state.baggage = [];
      state.departure_airports = [];
      state.arrival_airports = [];
    },
  },
});

export const {
  setSelectedFilters,
  setTimeRange,
  setPriceRange,
  resetFilters,
  applyAllFilters,
    } = filterSlice.actions;

export default filterSlice.reducer;
