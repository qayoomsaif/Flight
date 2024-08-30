// src/components/filters/TimeOptions.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  
} from 'react-native';
import RangeSlider from '../RangeSlider';
import {useTheme} from '../../theme/ThemeContext';
import SwtichButton from '../SwtichButton';
import globalStyles from '../../styles/globalStyles';
import {Text} from '@components/index';

import {width, wps} from '@utilities/resizeUtils';


interface TimeOptionsProps {
  values: number[];
  title: string;
  onChange: (values: number[]) => void;
  selectAllTimes: boolean;
  onToggleSelectTimes: () => void;
}

const TimeOptions: React.FC<TimeOptionsProps> = ({
  values,
  title,
  onChange,
  onToggleSelectTimes,
}) => {
  const {theme} = useTheme();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}`;
  };
  return (
    <View style={styles.container}>
      <Text
        style={[
          globalStyles.subHeadingText,
          styles.label,
          {color: theme.text},
        ]}>
        {title}
      </Text>
      <SwtichButton
        isSelected={
          values.length && values[0] == 0 && values[1] == 1439 ? true : false
        }
        disabled={
          values.length && values[0] == 0 && values[1] == 1439 ? true : false
        }
        onPress={onToggleSelectTimes}
        text="Any Time"
      />
      <RangeSlider
        values={values}
        min={0}
        max={1439}
        onValuesChange={onChange}
        labelDisabled
      />
      <View style={styles.textContainer}>
        <Text
          style={[globalStyles.secondaryText, {color: theme.textSecondary}]}>
          {formatTime(values[0])}
        </Text>
        <Text
          style={[globalStyles.secondaryText, {color: theme.textSecondary}]}>
          {formatTime(values[1])}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 16,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: 16,
  },
});

export default TimeOptions;
