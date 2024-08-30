// src/components/SelectingButton.tsx
import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import globalStyles from '../styles/globalStyles';
import {useTheme} from '../theme/ThemeContext';
import {Text} from '@components/index';

interface SelectingButtonProps {
  value: string;
  textkey: string;
  isSelected: boolean;
  style?: ViewStyle;
  onPress: (value: string, select?: boolean) => void;
}

const SelectingButton: React.FC<SelectingButtonProps> = ({
  value,
  textkey,
  isSelected,
  onPress,
  style,
}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      key={value}
      style={[
        globalStyles.multiSelectItem,
        style,
        {
          backgroundColor: isSelected ? theme.SecondaryBtn : theme.disable,
        },
      ]}
      onPress={() => onPress(value, !isSelected)}>
      <Text
        style={[
          globalStyles.multiSelectItemText,
          {color: isSelected ? theme.primaryText : theme.text},
        ]}>
        {textkey}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectingButton;
