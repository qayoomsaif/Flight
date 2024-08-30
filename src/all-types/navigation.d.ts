// src/all-types/Navigation.ts

import {FlightData} from '@hooks/types';

export type RootStackParamList = {
  Home: undefined;
  Details: {item: FlightData};
};

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type RootDrawerParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
};
