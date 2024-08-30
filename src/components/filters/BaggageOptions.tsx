// src/components/filters/BaggageOptions.tsx
import React from 'react';
import {View} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import {useTheme} from '../../theme/ThemeContext';
import SelectingButton from '../SelectingButton';

interface BaggageOptionsProps {
  options: {key: string; value: string; selected: boolean}[];
  onSelectOption: (value: string, select?: boolean) => void;
}

const BaggageOptions: React.FC<BaggageOptionsProps> = ({
  options,
  onSelectOption,
}) => {
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

export default BaggageOptions;
