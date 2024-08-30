// src/components/SwitchButton.tsx
import React from 'react';
import {StyleSheet, ViewStyle, Switch, View} from 'react-native';
import {Text} from '@components/index';
import {Theme, useTheme} from '../theme/ThemeContext';

interface SwitchButtonProps {
  text: string;
  isSelected: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  onPress: (value: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  text,
  isSelected,
  disabled,
  onPress,
  style,
}) => {
  const {theme} = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={[styles.container, style]}>
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
