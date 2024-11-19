import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Defining the structure of the filter state
interface FilterState {
  /** List of selected stop options (e.g., 'Direct flights only', '1 stop or less') */
  stops: string[];

  /** List of selected airlines (e.g., 'Emirates', 'Qatar Airways') */
  airlines: string[];

  /** Selected price range for flights represented as an array of two numbers [min, max] */
  priceRange: number[];

  /** Selected departure times represented as an array of integers [minTime, maxTime] */
  departureTimes: number[];

  /** Selected arrival times represented as an array of integers [minTime, maxTime] */
  arrivalTimes: number[];

  /** List of selected baggage options (e.g., 'Checked baggage included') */
  baggage: string[];

  /** List of selected departure airports (e.g., 'DXB', 'JED') */
  departure_airports: string[];

  /** List of selected arrival airports (e.g., 'LHR', 'ORD') */
  arrival_airports: string[];
}

// Define the keys of the FilterState type to be used for filtering actions
type FilterKey = keyof FilterState;

// Initial state for the filter slice
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

// Creating the filter slice with actions to manage the filter state
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    /**
     * Action to set the selected filters based on the filter key and value.
     * This action allows toggling the selected filters for each key (e.g., stops, airlines).
     *
     * @param {FilterKey} key - The filter key (e.g., 'stops', 'airlines', etc.)
     * @param {string} value - The value to be selected or deselected
     * @param {boolean} [select] - Optional flag to force the selection; if not provided, the selection will be toggled.
     */
    setSelectedFilters(
      state,
      action: PayloadAction<{key: FilterKey; value: string; select?: boolean}>,
    ) {
      const {key, value, select} = action.payload;

      // Warn if an invalid key is provided
      if (!state[key]) {
        console.warn(`Invalid key: ${key}`);
        return;
      }

      // Default to toggling the selection if `select` is not provided
      const shouldSelect =
        select !== undefined ? select : !state[key].includes(value);

      // Add or remove the value based on the selection flag
      if (shouldSelect) {
        if (!state[key].includes(value)) {
          state[key].push(value);
        }
      } else {
        state[key] = state[key].filter(v => v !== value);
      }
    },

    /**
     * Action to set the time range for either departure or arrival times.
     *
     * @param {string} key - Either 'departureTimes' or 'arrivalTimes'
     * @param {number[]} values - An array of two numbers representing the time range [minTime, maxTime]
     */
    setTimeRange(
      state,
      action: PayloadAction<{
        key: 'departureTimes' | 'arrivalTimes';
        values: number[];
      }>,
    ) {
      const {key, values} = action.payload;

      // Warn if an invalid key is provided
      if (!state[key]) {
        console.warn(`Invalid key: ${key}`);
        return;
      }

      state[key] = values; // Set the time range
    },

    /**
     * Action to set the price range filter.
     *
     * @param {number[]} priceRange - An array of two numbers representing the price range [minPrice, maxPrice]
     */
    setPriceRange(state, action: PayloadAction<number[]>) {
      state.priceRange = action.payload;
    },

    /**
     * Action to apply all filters at once by replacing the current state with the provided filter data.
     *
     * @param {FilterState} filterData - The new filter state to apply.
     */
    applyAllFilters(state, action: PayloadAction<FilterState>) {
      return {...state, ...action.payload}; // Merge the current state with the new filter data
    },

    /**
     * Action to reset all filters to their initial state (empty).
     */
    resetFilters(state) {
      // Reset all filters to their initial empty state
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

// Exporting the actions for use in components or other parts of the app
export const {
  setSelectedFilters,
  setTimeRange,
  setPriceRange,
  resetFilters,
  applyAllFilters,
} = filterSlice.actions;

// Default export for the reducer to be used in the store
export default filterSlice.reducer;
