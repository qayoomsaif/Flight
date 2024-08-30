// src/components/card/OtherOfferCard.tsx
import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {width} from '@utilities/resizeUtils';
import {Text} from '@components/index';
import {SvgXml} from 'react-native-svg';
import {FLIGHT} from '@all-assets/svg';
import {FlightData} from '@all-types/types';
import moment from 'moment';
import {Theme, useTheme} from '@theme/ThemeContext';

type OtherOfferCardProps = {
  item: FlightData;
  onPress: (item: FlightData) => void;
};

const OtherOfferCard: React.FC<OtherOfferCardProps> = ({item, onPress}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const {
    departureTime,
    stops,
    departureCity,
    departureDate,
    arrivalTime,
    arrivalCity,
    flightDuration,
    price,
    imageUrl,
    currency,
    passengerCount,
  } = item;

  return (
    <View style={styles.card}>
      <View style={styles.flightInfo}>
        <Image
          source={
            imageUrl ? {uri: imageUrl} : require('../../assets/images/logo.png')
          }
          style={styles.flightImage}
        />
        <View style={styles.timeSection1}>
          <Text style={styles.timeText}>{departureTime}</Text>
          <Text style={styles.cityText}>{departureCity}</Text>
          <Text style={styles.dateText}>
            {moment(departureDate).format('ddd')}
          </Text>
        </View>
        <View style={styles.middleSection}>
          <View style={styles.stopIndicator}>
            <View style={styles.circle} />
            <View style={styles.line} />
            <Text style={styles.stopsText}>{stops?.name}</Text>
            <View style={styles.line} />
            <SvgXml
              width={'16'}
              height={'16'}
              xml={FLIGHT}
              fill={theme.light}
              style={styles.airplaneIcon}
            />
          </View>
          <Text style={styles.flightDurationText}>{flightDuration}</Text>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeText}>{arrivalTime}</Text>
          <Text style={styles.cityText}>{arrivalCity}</Text>
          <Text style={styles.dateText}>
            {moment(departureDate).format('ddd')}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceText}>
            {price} {currency}
          </Text>
          <Text style={styles.passengerCountText}>
            Price for {passengerCount} passengers
          </Text>
        </View>
        <TouchableOpacity onPress={() => onPress(item)}>
          <Text style={styles.detailsText}>Show details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Function to get styles based on the theme
const getStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      width: width - 32,
      borderRadius: 10,
      padding: 16,
      backgroundColor: theme.card,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      marginVertical: 10,
    },
    flightInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeSection: {
      flex: 1,
      alignItems: 'flex-end',
    },
    timeSection1: {
      flex: 1,
      alignItems: 'flex-start',
    },
    timeText: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      marginBottom: 10,
      color: theme.text,
    },
    cityText: {
      fontSize: 12,
      marginBottom: 8,
      lineHeight: 15,
      color: theme.text,
    },
    dateText: {
      fontSize: 14,
      lineHeight: 15,
      color: theme.textSecondary,
    },
    middleSection: {
      alignItems: 'center',
    },
    flightImage: {
      width: 32,
      height: 32,
      marginRight: 10,
    },
    airplaneIcon: {
      marginLeft: 4,
    },
    stopIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.light,
    },
    line: {
      maxWidth: 50,
      minWidth: 40,
      height: 2,
      backgroundColor: theme.light,
    },
    stopsText: {
      fontSize: 10,
      lineHeight: 15,
      marginHorizontal: 5,
      color: theme.textSecondary,
    },
    flightDurationText: {
      fontSize: 12,
      lineHeight: 15,
      marginTop: 2,
      color: theme.textSecondary,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: theme.border,
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingTop: 16,
      marginTop: 16,
      alignItems: 'center',
    },
    priceText: {
      fontSize: 20,
      lineHeight: 26,
      fontWeight: '500',
      color: theme.primary,
    },
    passengerCountText: {
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '400',
      marginBottom: 5,
      color: theme.textSecondary,
    },
    detailsText: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 18,
      color: theme.primary,
    },
  });

export default OtherOfferCard;
