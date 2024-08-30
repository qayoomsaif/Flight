// src/components/filters/AirlineOptions.tsx
import React from 'react';
import {View} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import SelectingButton from '../SelectingButton';
import SwtichButton from '../SwtichButton';

interface AirlineOptionsProps {
  options: {key: string; value: string; selected: boolean}[];
  onSelectOption: (value: string, select?: boolean) => void;
  onToggleSelectAll: (selectAll: boolean) => void;
  selectAll: boolean;
}

const AirlineOptions: React.FC<AirlineOptionsProps> = ({
  options,
  onSelectOption,
  onToggleSelectAll,
  selectAll,
}) => {
  return (
    <View style={globalStyles.container}>
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

export default AirlineOptions;
