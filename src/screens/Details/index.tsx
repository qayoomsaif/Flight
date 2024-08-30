// src/screens/Home/index.tsx
import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Theme, useTheme} from '@theme/ThemeContext';
import moment from 'moment';
import Header from '@components/Header';
import {ARROW_LEFT, ARROW_LEFT_RIGHT, EDIT} from '@all-assets/svg';
import {RootStackParamList} from '@all-types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text} from '@components/index';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details: React.FC<Props> = ({route, navigation}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const {item} = route.params;

  const {
    departureTime,
    stops,
    departureCity,
    departureDate,
    arrivalTime,
    arrivalCity,
    arrivalDate,
    flightDuration,
    price,
    currency,
    departureAirport,
    arrivalAirport,
    passengerCount,
    imageUrl,
    airline,
    baggageIncluded,
  } = item;

  return (
    <View style={styles.container}>
      <Header
        fromCity={departureCity}
        toCity={arrivalCity}
        fromDate={moment(departureDate).format('DD MMM, ddd')}
        leftIcon={ARROW_LEFT}
        centerIcon={ARROW_LEFT_RIGHT}
        rightIcon={EDIT}
        toDate={moment(arrivalDate).format('DD MMM, ddd')}
        leftAction={() => navigation.goBack()}
        rightAction={() => console.log('Edit Pressed')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.card}>
          <Image
            source={
              imageUrl
                ? {uri: imageUrl}
                : require('../../assets/images/logo.png')
            }
            style={styles.image}
          />
          <Text style={styles.title}>{airline.key} Flight Details</Text>
          <View style={styles.infoContainer}>
            <DetailItem label="Price" value={`${price} ${currency}`} />
            <DetailItem label="Duration" value={flightDuration} />
            <DetailItem label="Stops" value={stops?.name || 'Direct'} />
            <DetailItem
              label="Departure"
              value={`${departureCity} (${departureAirport.value})`}
            />
            <DetailItem
              label="Departure Date"
              value={moment(departureDate).format('MMMM D, YYYY')}
            />
            <DetailItem label="Departure Time" value={departureTime} />
            <DetailItem
              label="Arrival"
              value={`${arrivalCity} (${arrivalAirport.value})`}
            />
            <DetailItem
              label="Arrival Date"
              value={moment(arrivalDate).format('MMMM D, YYYY')}
            />
            <DetailItem label="Arrival Time" value={arrivalTime} />
            <DetailItem label="Passengers" value={passengerCount.toString()} />
            <DetailItem
              label="Baggage Included"
              value={baggageIncluded ? 'Yes' : 'No'}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const DetailItem = ({label, value}: {label: string; value: string}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainerStyle: {
      padding: 20,
    },
    image: {
      width: '100%',
      height: 220,
      borderRadius: 12,
      marginBottom: 16,
    },
    card: {
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      backgroundColor: theme.card,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 16,
      color: theme.text,
    },
    infoContainer: {
      marginTop: 10,
    },
    detailItem: {
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    detailLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    detailValue: {
      fontSize: 16,
      fontWeight: '400',
      color: theme.textSecondary,
    },
    button: {
      paddingVertical: 15,
      borderRadius: 12,
      alignItems: 'center',
      marginVertical: 25,
      backgroundColor: theme.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.white,
    },
  });

export default Details;