// src/all-types/Navigation.ts

import { FlightData } from '@hooks/types';

/**
 * Defines the parameter list for the root stack navigator.
 */
export type RootStackParamList = {
  /**
   * Home screen.
   * @type {undefined} No parameters are passed to this screen.
   */
  Home: undefined;

  /**
   * Details screen.
   * @param item The flight data item to display details for.
   * @type {object} { item: FlightData }
   */
  Details: { item: FlightData };
};

/**
 * Defines the parameter list for the bottom tab navigator.
 */
export type RootTabParamList = {
  /**
   * Home screen in the tab navigator.
   * @type {undefined} No parameters are passed to this tab.
   */
  Home: undefined;

  /**
   * Profile screen in the tab navigator.
   * @type {undefined} No parameters are passed to this tab.
   */
  Profile: undefined;
};

/**
 * Defines the parameter list for the drawer navigator.
 */
export type RootDrawerParamList = {
  /**
   * Home screen in the drawer navigator.
   * @type {undefined} No parameters are passed to this drawer.
   */
  Home: undefined;

  /**
   * Settings screen in the drawer navigator.
   * @type {undefined} No parameters are passed to this drawer.
   */
  Settings: undefined;

  /**
   * Profile screen in the drawer navigator.
   * @type {undefined} No parameters are passed to this drawer.
   */
  Profile: undefined;
};
