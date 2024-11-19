// src/components/SelectingButton.tsx
import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import globalStyles from '../styles/globalStyles';
import {useTheme} from '../theme/ThemeContext';
import {Text} from '@components/index';

/**
 * Props for the SelectingButton component.
 */
interface SelectingButtonProps {
  /**
   * The value associated with the button, used to identify the selected item.
   * @type {string}
   */
  value: string;

  /**
   * The text key displayed on the button.
   * @type {string}
   */
  textkey: string;

  /**
   * Boolean flag to indicate if the button is selected or not.
   * @type {boolean}
   */
  isSelected: boolean;

  /**
   * Optional additional styles for the button container.
   * @type {ViewStyle}
   */
  style?: ViewStyle;

  /**
   * Callback function that triggers when the button is pressed.
   *
   * @param {string} value The value associated with the button.
   * @param {boolean} select Boolean indicating the selection state.
   */
  onPress: (value: string, select?: boolean) => void;
}

/**
 * A button component that toggles between selected and unselected states.
 *
 * @param {SelectingButtonProps} props The properties for the SelectingButton component.
 * @returns {JSX.Element} The rendered SelectingButton component.
 */
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
