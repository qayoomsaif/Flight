export interface FlightData {
  id: number;
  departureTime: string; // Format: 'HH:MM'
  arrivalTime: string; // Format: 'HH:MM'
  flightDuration: string; // Format: 'Xh Ym'
  stops: {
    key: string; // Baggage option name
    value: string; // Baggage option value
    name: string
  }; // Stop details like "1 stop"
  stopDetails: string; // Additional stop details
  departureCity: string; // City extracted from the departure airport name
  departureAirport: {
    key: string; // Full airport name
    value: string; // Airport code
  };
  departureDate: string; // ISO format date
  arrivalCity: string; // City extracted from the arrival airport name
  arrivalAirport: {
    key: string; // Full airport name
    value: string; // Airport code
  };
  arrivalDate: string; // ISO format date
  airline: {
    key: string; // Airline name
    value: string; // Airline code
  };
  price: number; // Price in the currency
  currency: string; // Currency, e.g., 'SAR'
  passengerCount: number; // Number of passengers
  baggageIncluded: boolean; // Whether baggage is included
  baggageOption: {
    key: string; // Baggage option name
    value: string; // Baggage option value
  };
  direct: boolean; // Whether it's a direct flight
  imageUrl: string; // Image URL for the flight
}

export interface FilterData {
  stops: string[];
  airlines: string[];
  priceRange: number[];
  departureTimes: number[];
  arrivalTimes: number[];
  baggage: string[];
  departure_airports: string[];
  arrival_airports: string[];
}
