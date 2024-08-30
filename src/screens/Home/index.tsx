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
  const selectedFilters = useSelector((state: RootState) => state.filter);
  const [payload, setPayload] = useState({
    selectedFilters: selectedFilters,
    currentPage: 0,
    pageSize: 10,
  });
  const [data, setData] = useState<FlightData[]>([]);
  const [stateData, setStateData] = useState<FlightData[]>([]);
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
  const {flights, total, loading, hasMore, error} = usePaginatedFlights(
    payload.selectedFilters,
    payload.currentPage,
    payload.pageSize,
  );

  useEffect(() => {
    if (payload.currentPage === 0) {
      setData(flights);
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
        ...getFlightStats(payload.selectedFilters),
      ]);
    } else {
      setData(prevData => [...prevData, ...flights]);
    }
  }, [flights]);

  useEffect(() => {
    setPayload({
      currentPage: 0,
      selectedFilters: selectedFilters,
      pageSize: 10,
    });
    setStateData([]);
  }, [selectedFilters]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPayload(prevPayload => ({
        ...prevPayload,
        currentPage: prevPayload.currentPage + 1,
      }));
    }
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
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

      <BottomSheet
        ref={bottomSheetRef}
        height={'90%'}
        title="Filter"
        onClose={() => console.log('Bottom sheet closed')}>
        <FiltersSheet onClose={closeBottomSheet} />
      </BottomSheet>

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
                setStateData(item.item ? [item.item] : []);
                if (item.id === 'filter') {
                  openBottomSheet();
                }
                if (item.id === 'all') {
                  setStateData([]);
                }
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <OfferCard
            backgroundImage={require('../../assets/images/home_banner.png')}
            heading="Personalised offer for you"
            title="Special offer"
            subHeading="Personalised offer for you"
            buttonText="Explore"
            onButtonPress={() => null}
          />
          <SearchProgress initialCount={total} />
          {error && payload.currentPage === 0 ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
          {loading && payload.currentPage === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
              <Text style={{color: theme.primaryText, marginTop: 10}}>
                Loading...
              </Text>
            </View>
          ) : null}
          <FlatList
            data={stateData?.length ? stateData : data}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item}) => (
              <OtherOfferCard
                item={item}
                onPress={() => navigation.navigate('Details', {item})}
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
                  onPress={handleLoadMore}
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

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.background,
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
