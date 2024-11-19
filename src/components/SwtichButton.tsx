// src/components/SwitchButton.tsx
import React from 'react';
import {StyleSheet, ViewStyle, Switch, View} from 'react-native';
import {Text} from '@components/index';
import {Theme, useTheme} from '../theme/ThemeContext';

/**
 * Props for the SwitchButton component.
 */
interface SwitchButtonProps {
  /**
   * The label text displayed next to the switch.
   * @type {string}
   */
  text: string;

  /**
   * Boolean flag indicating the current selection state of the switch.
   * @type {boolean}
   */
  isSelected: boolean;

  /**
   * Optional flag to disable the switch.
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * Optional additional styles for the container.
   * @type {ViewStyle}
   */
  style?: ViewStyle;

  /**
   * Callback function that triggers when the switch value changes.
   *
   * @param {boolean} value The new value of the switch (true or false).
   */
  onPress: (value: boolean) => void;
}

/**
 * A button component that represents a switch with a label.
 *
 * @param {SwitchButtonProps} props The properties for the SwitchButton component.
 * @returns {JSX.Element} The rendered SwitchButton component.
 */
const SwitchButton: React.FC<SwitchButtonProps> = ({
  text,
  isSelected,
  disabled,
  onPress,
  style,
}) => {
  const {theme} = useTheme(); // Get current theme for dynamic styling

  const styles = getStyles(theme);

  return (
    <View style={[styles.container, style]}>
      {/* Switch component with dynamic colors based on state */} 
      <Switch
        disabled={disabled} 
        trackColor={{false: theme.primary, true: theme.SecondaryBtn}} 
        thumbColor={isSelected ? theme.primary : theme.white} 
        ios_backgroundColor={
          isSelected && !disabled ? theme.SecondaryBtn : theme.SecondaryBtn 
        }
        onValueChange={onPress}
        value={isSelected}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    text: {
      lineHeight: 18,
      fontSize: 14,
      fontWeight: '400',
      marginLeft: 16,
      color: theme.text,
    },
  });

export default SwitchButton;
