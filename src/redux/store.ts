import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';

/**
 * The Redux store configuration for the application.
 * This store includes the filter slice to manage the application's filter state.
 */
const store = configureStore({
  reducer: {
    /** The filter reducer to manage the flight filters in the application */
    filter: filterReducer,
  },
});

// **RootState** type represents the complete state shape of the store.
export type RootState = ReturnType<typeof store.getState>;

/**
 * **AppDispatch** type represents the type of the dispatch function.
 * It helps in dispatching actions within the application.
 */
export type AppDispatch = typeof store.dispatch;

export default store;
