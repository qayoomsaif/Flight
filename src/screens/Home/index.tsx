// src/screens/Home/index.tsx

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Theme, useTheme} from '../../theme/ThemeContext';
import {RootState} from '@redux/store';
import {
  Button,
  Header,
  Text,
  OptionButton,
  OtherOfferCard,
  OfferCard,
  SearchProgress,
} from '@components/index';
import {
  ARROW_LEFT,
  ARROW_LEFT_RIGHT,
  EDIT,
  FILTER_SLECTED,
} from '@all-assets/svg';
import {usePaginatedFlights} from '@hooks/usePaginatedFlights';
import {FlightData} from '@all-types/types';
import FiltersSheet from './FiltersSheet';
import BottomSheet, {BottomSheetRef} from '@components/BottomSheet';
import {getFlightStats} from '@utilities/getFlightStats';
import {RootStackParamList} from '@all-types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation}) => {
  const {theme} = useTheme();
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  
  // Get selected filters from Redux store
  const selectedFilters = useSelector((state: RootState) => state.filter);
  
  // States to manage flight data, pagination, and filter options
  const [payload, setPayload] = useState({
    selectedFilters: selectedFilters,
    currentPage: 0,
    pageSize: 10,
  });
  const [data, setData] = useState<FlightData[]>([]); // Data for flights
  const [stateData, setStateData] = useState<FlightData[]>([]); // Filtered flight data
  const [optionData, setOptionData] = useState([
    {
      id: 'filter',
      status: false,
      icon: FILTER_SLECTED,
      subtitle: '',
      item: null,
      time: '',
    },
    {id: 'all', title: 'All', status: true, subtitle: '', item: null, time: ''},
  ]);

  // Fetch paginated flight data using a custom hook
  const {flights, total, loading, hasMore, error} = usePaginatedFlights(
    payload.selectedFilters,
    payload.currentPage,
    payload.pageSize,
  );

  // Effect to update flight data when the `flights` or `currentPage` changes
  useEffect(() => {
    if (payload.currentPage === 0) {
      setData(flights); // Reset data if on the first page
      setOptionData([
        {
          id: 'filter',
          icon: FILTER_SLECTED,
          status: false,
          subtitle: '',
          item: null,
          time: '',
        },
        {
          id: 'all',
          title: 'All',
          status: true,
          subtitle: '',
          item: null,
          time: '',
        },
        ...getFlightStats(payload.selectedFilters), // Get flight stats based on selected filters
      ]);
    } else {
      setData(prevData => [...prevData, ...flights]); // Append new data if not on the first page
    }
  }, [flights]);

  // Effect to reset flight data when selected filters change
  useEffect(() => {
    setPayload({
      currentPage: 0,
      selectedFilters: selectedFilters,
      pageSize: 10,
    });
    setStateData([]); // Reset the state data when filters change
  }, [selectedFilters]);

  // Function to load more flight data when the user scrolls
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPayload(prevPayload => ({
        ...prevPayload,
        currentPage: prevPayload.currentPage + 1, // Increment page for pagination
      }));
    }
  };

  // Functions to open and close the filter bottom sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  // Define styles based on the current theme
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {/* Header component with from and to cities, dates, and icons */}
      <Header
        fromCity="Bilbao"
        toCity="Madrid"
        fromDate="26 Dec, Sun"
        leftIcon={ARROW_LEFT}
        rightIcon={EDIT}
        centerIcon={ARROW_LEFT_RIGHT}
        toDate="31 Jan, Mon"
        leftAction={() => console.log('Back Pressed')}
        rightAction={() => console.log('Edit Pressed')}
      />

      {/* Bottom sheet for filters */}
      <BottomSheet
        ref={bottomSheetRef}
        height={'90%'}
        title="Filter"
        onClose={() => console.log('Bottom sheet closed')}>
        <FiltersSheet onClose={closeBottomSheet} />
      </BottomSheet>

      {/* Filter options displayed horizontally */}
      <View style={styles.optionContainer}>
        <FlatList
          data={optionData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <OptionButton
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              filled={item.status}
              time={item.time}
              item={item?.item}
              onPress={() => {
                setStateData(item.item ? [item.item] : []); // Set filtered data based on selection
                if (item.id === 'filter') {
                  openBottomSheet(); // Open the filter bottom sheet
                }
                if (item.id === 'all') {
                  setStateData([]); // Reset to show all data
                }
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Scrollable content displaying offers and flights */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          {/* Offer card with promotional banner */}
          <OfferCard
            backgroundImage={require('../../assets/images/home_banner.png')}
            heading="Personalised offer for you"
            title="Special offer"
            subHeading="Personalised offer for you"
            buttonText="Explore"
            onButtonPress={() => null}
          />
          {/* Search progress indicator */}
          <SearchProgress initialCount={total} />
          
          {/* Error message if there is any error */}
          {error && payload.currentPage === 0 ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
          
          {/* Loading spinner while data is being fetched */}
          {loading && payload.currentPage === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
              <Text style={{color: theme.primaryText, marginTop: 10}}>
                Loading...
              </Text>
            </View>
          ) : null}
          
          {/* List of flight offers */}
          <FlatList
            data={stateData?.length ? stateData : data}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item}) => (
              <OtherOfferCard
                item={item}
                onPress={() => navigation.navigate('Details', {item})} // Navigate to flight details
              />
            )}
            ListEmptyComponent={() =>
              !loading && !stateData?.length && !data?.length ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.noFlightText}>{'No flight found'}</Text>
                </View>
              ) : null
            }
            ListFooterComponent={
              hasMore && !loading && !stateData?.length ? (
                <Button
                  text="Load More"
                  onPress={handleLoadMore} // Button to load more flights
                  variant="secondary"
                />
              ) : null
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

// Function to generate styles based on the current theme
const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.background, // Set background color based on theme
    },
    optionContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    scrollContainer: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
    },
    errorText: {
      marginTop: 10,
      color: theme.error,
    },
    emptyContainer: {
      marginTop: 100,
      alignItems: 'center',
    },
    noFlightText: {
      fontSize: 20,
      color: theme.primary,
    },
    loadingContainer: {
      flex: 1,
      marginTop: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Home;
  