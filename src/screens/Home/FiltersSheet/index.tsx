import React, {useEffect, useState, memo} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme, Theme} from '@theme/ThemeContext';
import {applyAllFilters} from '@redux/slices/filterSlice';
import {RootState} from '@redux/store';
import {useFilters} from '@hooks/useFilters';
import {
  Button,
  Text,
  TimeOptions,
  AirportOptions,
  BaggageOptions,
  PriceRangeOptions,
  AirlineOptions,
  StopOptions,
} from '@components/index';
import {DROP_DOWM, DROP_UP} from '@all-assets/svg';
import {SvgXml} from 'react-native-svg';
import {width} from '@utilities/resizeUtils';

interface FiltersSheetProps {
  onClose: () => void;
}

const FiltersSheet: React.FC<FiltersSheetProps> = ({onClose}) => {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.filter);
  const {data: filterData, isLoading, error} = useFilters();

  const [localFilters, setLocalFilters] = useState(() => ({
    stops: selectedFilters.stops,
    airlines: selectedFilters.airlines,
    priceRange: selectedFilters.priceRange,
    departureTimes: selectedFilters.departureTimes,
    arrivalTimes: selectedFilters.arrivalTimes,
    baggage: selectedFilters.baggage,
    departure_airports: selectedFilters.departure_airports,
    arrival_airports: selectedFilters.arrival_airports,
  }));

  const [openFilters, setOpenFilters] = useState<Set<string>>(new Set());
  const styles = getStyles(theme);

  useEffect(() => {
    if (selectedFilters) {
      setLocalFilters(selectedFilters);
    }
  }, [selectedFilters]);

  const handleSelectOption = (
    key: keyof typeof localFilters,
    value: string,
    select?: boolean,
  ) => {
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      [key]: select
        ? [...(prevFilters[key] as string[]), value]
        : (prevFilters[key] as string[]).filter(item => item !== value),
    }));
  };

  const handleToggleSelectAllTimes = (
    key: 'departureTimes' | 'arrivalTimes',
  ) => {
    handleTimeChange(key, []);
  };

  const handleToggleSelectAll = (
    key: 'departure_airports' | 'arrival_airports',
    selectAll: boolean,
  ) => {
    const allValues = filterData?.[key]?.map((item: any) => item.value) || [];
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      [key]: selectAll ? allValues : [],
    }));
  };

  const handlePriceChange = (values: number[]) => {
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      priceRange: values,
    }));
  };

  const handleTimeChange = (
    key: 'departureTimes' | 'arrivalTimes',
    values: number[],
  ) => {
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      [key]: values,
    }));
  };

  const toggleFilter = (filter: string) => {
    setOpenFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  const FilterItem = memo(({filterKey}: {filterKey: string}) => {
    const styles = getStyles(theme);

    let FilterComponent: React.ReactNode;
    switch (filterKey) {
      case 'stops':
        FilterComponent = (
          <StopOptions
            options={
              filterData?.stops.map((stop: any) => ({
                key: stop.key,
                value: stop.value,
                selected: localFilters.stops.includes(stop.value),
              })) || []
            }
            onSelectOption={handleSelectOption.bind(null, 'stops')}
          />
        );
        break;
      case 'airlines':
        FilterComponent = (
          <AirlineOptions
            options={
              filterData?.airlines.map((airline: any) => ({
                key: airline.key,
                value: airline.value,
                selected: localFilters.airlines.includes(airline.value),
              })) || []
            }
            onSelectOption={handleSelectOption.bind(null, 'airlines')}
            onToggleSelectAll={selectAll =>
              handleToggleSelectAll('airlines', selectAll)
            }
            selectAll={
              localFilters.airlines.length === filterData?.airlines.length
            }
          />
        );
        break;
      case 'time':
        FilterComponent = (
          <>
            <TimeOptions
              values={
                localFilters.departureTimes.length
                  ? localFilters.departureTimes
                  : [0, 1439]
              }
              onChange={values => handleTimeChange('departureTimes', values)}
              title="Departure Times"
              onToggleSelectTimes={() =>
                handleToggleSelectAllTimes('departureTimes')
              }
              selectAllTimes={false}
            />
            <View style={styles.timeOptionsSpacing}>
              <TimeOptions
                values={
                  localFilters.arrivalTimes.length
                    ? localFilters.arrivalTimes
                    : [0, 1439]
                }
                onChange={values => handleTimeChange('arrivalTimes', values)}
                title="Arrival Times"
                onToggleSelectTimes={() =>
                  handleToggleSelectAllTimes('arrivalTimes')
                }
                selectAllTimes={false}
              />
            </View>
          </>
        );
        break;
      case 'price':
        FilterComponent = (
          <PriceRangeOptions
            min={1}
            max={20000}
            values={localFilters.priceRange}
            currency={'SAR'}
            onChange={handlePriceChange}
          />
        );
        break;
      case 'baggage':
        FilterComponent = (
          <BaggageOptions
            options={
              filterData?.baggage.map((baggage: any) => ({
                key: baggage.key,
                value: baggage.value,
                selected: localFilters.baggage.includes(baggage.value),
              })) || []
            }
            onSelectOption={handleSelectOption.bind(null, 'baggage')}
          />
        );
        break;
      case 'airports':
        FilterComponent = (
          <View>
            <AirportOptions
              title={'Departure Airports'}
              options={
                filterData?.departure_airports.map((airport: any) => ({
                  key: airport.key,
                  value: airport.value,
                  selected: localFilters.departure_airports.includes(
                    airport.value,
                  ),
                })) || []
              }
              onSelectOption={handleSelectOption.bind(
                null,
                'departure_airports',
              )}
              onToggleSelectAll={selectAll =>
                handleToggleSelectAll('departure_airports', selectAll)
              }
              selectAll={
                localFilters.departure_airports.length ===
                filterData?.departure_airports.length
              }
            />
            <AirportOptions
              title={'Arrival Airports'}
              options={
                filterData?.arrival_airports.map((airport: any) => ({
                  key: airport.key,
                  value: airport.value,
                  selected: localFilters.arrival_airports.includes(
                    airport.value,
                  ),
                })) || []
              }
              onSelectOption={handleSelectOption.bind(null, 'arrival_airports')}
              onToggleSelectAll={selectAll =>
                handleToggleSelectAll('arrival_airports', selectAll)
              }
              selectAll={
                localFilters.arrival_airports.length ===
                filterData?.arrival_airports.length
              }
            />
          </View>
        );
        break;
      default:
        FilterComponent = null;
    }

    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => toggleFilter(filterKey)}
          style={styles.filterHeader}>
          <Text style={styles.filterTitle}>
            {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
          </Text>
          <SvgXml
            width={'18'}
            height={'18'}
            xml={openFilters.has(filterKey) ? DROP_DOWM : DROP_UP}
            style={styles.icon}
          />
        </TouchableOpacity>
        {openFilters.has(filterKey) ? (
          <View style={{paddingVertical: 16}}>{FilterComponent}</View>
        ) : null}
      </View>
    );
  });

  const handleReset = () => {
    const payload = {
      stops: [],
      airlines: [],
      priceRange: [],
      departureTimes: [],
      arrivalTimes: [],
      baggage: [],
      departure_airports: [],
      arrival_airports: [],
    };
    setLocalFilters(payload);
    onClose();
    dispatch(applyAllFilters(payload));
  };

  const getAppliedFiltersCount = () => {
    let count = 0;

    type FilterKey = keyof typeof localFilters;

    for (const key in localFilters) {
      const filterKey = key as FilterKey;

      if (Array.isArray(localFilters[filterKey])) {
        count += localFilters[filterKey].length;
      } else if (typeof localFilters[filterKey] === 'number') {
        count += localFilters[filterKey] !== selectedFilters[filterKey] ? 1 : 0;
      }
    }

    return count;
  };

  const appliedFiltersCount = getAppliedFiltersCount();

  const handleApplyFilters = () => {
    onClose();
    dispatch(applyAllFilters(localFilters));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{color: theme.primaryText, marginTop: 10}}>
          Loading...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{color: theme.error}}>Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          data={['stops', 'airlines', 'time', 'price', 'baggage', 'airports']}
          renderItem={({item}) => <FilterItem filterKey={item} />}
          keyExtractor={item => item}
          contentContainerStyle={styles.flatListContentContainer}
        />
        <View style={styles.buttonContainer}>
          <Button
            text={`Apply Filters ${appliedFiltersCount}`}
            onPress={handleApplyFilters}
            style={{backgroundColor: theme.primary}}
          />
          <Button
            text="Reset"
            onPress={handleReset}
            variant="secondary"
            style={{backgroundColor: theme.SecondaryBtn, marginTop: 10}}
          />
        </View>
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.card,
    },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
    },
    flatListContentContainer: {
      flexGrow: 1,
      width: width - 32,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterContainer: {
      borderRadius: 8,
      paddingVertical: 10,
      backgroundColor: theme.card,
    },
    filterTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.primaryText,
    },
    filterHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    icon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      tintColor: theme.primaryText,
    },
    buttonContainer: {
      paddingTop: 10,
      paddingBottom: 25,
    },
    timeOptionsSpacing: {
      marginTop: 16,
    },
  });

export default FiltersSheet;
