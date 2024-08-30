// src/components/filters/AirlineOptions.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import SelectingButton from '../SelectingButton';
import SwtichButton from '../SwtichButton';
import {Text} from '@components/index';
import {useTheme} from '../../theme/ThemeContext';

interface AirlineOptionsProps {
  options: {key: string; value: string; selected: boolean}[];
  onSelectOption: (value: string, select?: boolean) => void;
  onToggleSelectAll: (selectAll: boolean) => void;
  selectAll: boolean;
  title: string;
}

const AirlineOptions: React.FC<AirlineOptionsProps> = ({
  options,
  title,
  onSelectOption,
  onToggleSelectAll,
  selectAll,
}) => {
  const {theme} = useTheme();
  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text
        style={[
          globalStyles.subHeadingText,
          styles.label,
          {color: theme.text},
        ]}>
        {title}
      </Text>
      <SwtichButton
        isSelected={selectAll}
        onPress={onToggleSelectAll}
        text="All Airline"
      />
      <View style={globalStyles.multiSelectContainer}>
        {options.map(option => (
          <SelectingButton
            value={option.value}
            textkey={option.key}
            isSelected={option.selected}
            onPress={onSelectOption}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: 16,
  },
});

export default AirlineOptions;
