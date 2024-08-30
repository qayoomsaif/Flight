// src/components/filters/StopOptions.tsx
import React from 'react';
import {View} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import SelectingButton from '../SelectingButton';

interface StopOptionsProps {
  options: {key: string; value: string; selected: boolean}[];
  onSelectOption: (value: string, select?: boolean) => void;
}

const StopOptions: React.FC<StopOptionsProps> = ({options, onSelectOption}) => {
  return (
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
  );
};

export default StopOptions;
