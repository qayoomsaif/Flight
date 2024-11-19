// src/components/RangeSlider.tsx

import React from 'react';
import {View, StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Theme, useTheme} from '../theme/ThemeContext';
import globalStyles from '../styles/globalStyles';
import {Text} from '@components/index';
import {width} from '@utilities/resizeUtils';

/**
 * Props for the RangeSlider component.
 */
interface RangeSliderProps {
  /**
   * The current values of the range slider, represented as an array of two numbers.
   * @type {number[]}
   */
  values: number[];

  /**
   * The minimum value of the range slider.
   * @type {number}
   */
  min: number;

  /**
   * The maximum value of the range slider.
   * @type {number}
   */
  max: number;

  /**
   * Callback function that is triggered when the slider values change.
   * @type {(values: number[]) => void}
   */
  onValuesChange: (values: number[]) => void;

  /**
   * The length of the slider, which adjusts the width of the slider track.
   * @type {number}
   * @default width - 32
   */
  sliderLength?: number;

  /**
   * Boolean flag to disable the display of the labels.
   * @type {boolean}
   * @default false
   */
  labelDisabled?: boolean;

  /**
   * Optional label text to append to the values on the slider.
   * @type {string}
   * @default ''
   */
  labelIntail?: string;
}

/**
 * A range slider component with two handles, allowing the selection of a range of values.
 *
 * @param {RangeSliderProps} props The properties for the RangeSlider component.
 * @returns {JSX.Element} The rendered RangeSlider component.
 */
const RangeSlider: React.FC<RangeSliderProps> = ({
  values,
  min,
  max,
  onValuesChange,
  sliderLength = width - 32,
  labelDisabled = false,
  labelIntail,
}) => {
  // Access the theme for dynamic styling.
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Range slider component from @ptomasroos/react-native-multi-slider */}
      <MultiSlider
        values={values}
        min={min}
        max={max}
        step={1}
        onValuesChange={onValuesChange}
        selectedStyle={styles.selectedStyle}
        unselectedStyle={styles.unselectedStyle}
        trackStyle={styles.trackStyle}
        containerStyle={styles.sliderContainer}
        markerStyle={styles.markerStyle}
        sliderLength={sliderLength - 40} // Adjust slider length for container padding
      />

      {/* Conditional rendering of labels if not disabled */}
      {!labelDisabled ? (
        <View style={styles.textContainer}>
          <Text style={styles.label}>
            {`${values[0]} ${labelIntail ? labelIntail : ''}`}
          </Text>
          <Text style={styles.label}>
            {`${values[1]} ${labelIntail ? labelIntail : ''}`}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

/**
 * Function to generate styles dynamically based on the theme.
 *
 * @param {Theme} theme The current theme object.
 * @returns {object} The styles object.
 */
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      ...globalStyles.secondaryText,
      color: theme.textSecondary,
    },
    selectedStyle: {
      backgroundColor: theme.primaryBtn,
    },
    unselectedStyle: {
      backgroundColor: theme.disable,
    },
    trackStyle: {
      height: 4,
    },
    sliderContainer: {
      paddingHorizontal: 20,
    },
    markerStyle: {
      height: 28,
      width: 28,
      borderRadius: 100,
      backgroundColor: theme.primaryBtn,
    },
  });

export default React.memo(RangeSlider);
