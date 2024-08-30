// src/components/RangeSlider.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Theme, useTheme} from '../theme/ThemeContext';
import globalStyles from '../styles/globalStyles';
import {Text} from '@components/index';

import {width} from '@utilities/resizeUtils';

interface RangeSliderProps {
  values: number[];
  min: number;
  max: number;
  onValuesChange: (values: number[]) => void;
  sliderLength?: number;
  labelDisabled?: boolean;
  labelIntail?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  values,
  min,
  max,
  onValuesChange,
  sliderLength = width - 32,
  labelDisabled = false,
  labelIntail,
}) => {
  const {theme} = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
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
        sliderLength={sliderLength - 40}
      />
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
