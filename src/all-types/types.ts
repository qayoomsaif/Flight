/**
 * Represents flight data details for a specific flight.
 */
export interface FlightData {
  /**
   * Unique identifier for the flight.
   * @type {number}
   */
  id: number;

  /**
   * Flight departure time.
   * @type {string} Format: 'HH:MM'
   */
  departureTime: string;

  /**
   * Flight arrival time.
   * @type {string} Format: 'HH:MM'
   */
  arrivalTime: string;

  /**
   * Total flight duration.
   * @type {string} Format: 'Xh Ym', e.g., '2h 45m'
   */
  flightDuration: string;

  /**
   * Stopover details for the flight.
   * @property key The name of the baggage option.
   * @property value The value of the baggage option.
   * @property name The stopover description.
   */
  stops: {
    key: string;
    value: string;
    name: string;
  };

  /**
   * Additional details about the stop(s).
   * @type {string}
   */
  stopDetails: string;

  /**
   * Name of the departure city.
   * @type {string}
   */
  departureCity: string;

  /**
   * Details of the departure airport.
   * @property key Full name of the airport.
   * @property value Code of the airport, e.g., 'DXB'.
   */
  departureAirport: {
    key: string;
    value: string;
  };

  /**
   * Date of departure.
   * @type {string} ISO format (YYYY-MM-DD)
   */
  departureDate: string;

  /**
   * Name of the arrival city.
   * @type {string}
   */
  arrivalCity: string;

  /**
   * Details of the arrival airport.
   * @property key Full name of the airport.
   * @property value Code of the airport, e.g., 'JFK'.
   */
  arrivalAirport: {
    key: string;
    value: string;
  };

  /**
   * Date of arrival.
   * @type {string} ISO format (YYYY-MM-DD)
   */
  arrivalDate: string;

  /**
   * Details of the airline.
   * @property key Name of the airline, e.g., 'Emirates'.
   * @property value Code of the airline, e.g., 'EK'.
   */
  airline: {
    key: string;
    value: string;
  };

  /**
   * Ticket price.
   * @type {number} Currency amount
   */
  price: number;

  /**
   * Currency of the ticket price.
   * @type {string} E.g., 'SAR', 'USD'
   */
  currency: string;

  /**
   * Number of passengers.
   * @type {number}
   */
  passengerCount: number;

  /**
   * Indicates whether baggage is included in the ticket price.
   * @type {boolean}
   */
  baggageIncluded: boolean;

  /**
   * Baggage option details, if applicable.
   * @property key Name of the baggage option.
   * @property value Value of the baggage option.
   */
  baggageOption: {
    key: string;
    value: string;
  };

  /**
   * Indicates if the flight is direct (non-stop).
   * @type {boolean}
   */
  direct: boolean;

  /**
   * URL of the flight's image.
   * @type {string} Valid URL
   */
  imageUrl: string;
}

/**
 * Represents filter criteria for flight searches.
 */
export interface FilterData {
  /**
   * Filter by the number of stops.
   * @type {string[]} E.g., ['0', '1', '2+']
   */
  stops: string[];

  /**
   * Filter by airline names or codes.
   * @type {string[]} E.g., ['Emirates', 'EK']
   */
  airlines: string[];

  /**
   * Range of ticket prices.
   * @type {number[]} Format: [min, max]
   */
  priceRange: number[];

  /**
   * Range of departure times in minutes since midnight.
   * @type {number[]} Format: [start, end]
   */
  departureTimes: number[];

  /**
   * Range of arrival times in minutes since midnight.
   * @type {number[]} Format: [start, end]
   */
  arrivalTimes: number[];

  /**
   * Filter by baggage options.
   * @type {string[]} E.g., ['Checked', 'Carry-on']
   */
  baggage: string[];

  /**
   * Filter by specific departure airports.
   * @type {string[]} Airport codes, e.g., ['DXB', 'JFK']
   */
  departure_airports: string[];

  /**
   * Filter by specific arrival airports.
   * @type {string[]} Airport codes, e.g., ['DXB', 'JFK']
   */
  arrival_airports: string[];
}
