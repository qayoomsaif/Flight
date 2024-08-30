// src/components/OptionButton.tsx
import {Text} from '@components/index';
import {FlightData} from '@all-types/types';
import {Theme, useTheme} from '@theme/ThemeContext';
import React from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  View,
  StyleSheet,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

// Define the interface for the OptionButton props
interface OptionButtonProps {
  title?: string;
  subtitle?: string;
  filled?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  time?: string;
  textColor?: string;
  icon?: any;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  item: FlightData | null;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  title,
  subtitle,
  filled = false,
  borderColor,
  backgroundColor,
  textColor,
  icon,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  time,
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

    const buttonStyle = filled
    ? [
        styles.optionButton,
        {backgroundColor: theme.primary, borderColor: 'transparent'},
        style,
      ]
    : [
        styles.optionButton,
        {
          borderColor: borderColor || theme.border,
          backgroundColor: backgroundColor || theme.background,
        },
        style,
      ];

  const titleTextStyle = filled
    ? [styles.optionText, {color: theme.white}, titleStyle]
    : [styles.optionText, {color: theme.text}, titleStyle];

  const subTextColor = filled ? theme.white : textColor || theme.text;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {icon ? (
        <SvgXml width={'20'} height={'18'} xml={icon} />
      ) : (
        <>
          <Text style={titleTextStyle}>{title}</Text>
          <View style={styles.subTextContainer}>
            {subtitle && (
              <Text
                style={[styles.subText, {color: subTextColor}, subtitleStyle]}>
                {subtitle}
              </Text>
            )}
            {time ? (
              <>
                <View style={[styles.timeSeparator]} />
                <Text
                  style={[
                    styles.subText,
                    {color: subTextColor},
                    subtitleStyle,
                  ]}>
                  {time}
                </Text>
              </>
            ) : null}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
const getStyles = (theme: Theme) =>
  StyleSheet.create({
    optionButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      borderWidth: 1,
      height: 57,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionText: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 18,
      marginBottom: 4,
    },
    subText: {
      fontSize: 12,
      fontWeight: '300',
    },
    icon: {
      width: 20,
      height: 20,
    },
    subTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeSeparator: {
      height: 5,
      width: 5,
      borderRadius: 5,
      marginHorizontal: 4,
      backgroundColor: theme.border,
    },
  });

export default OptionButton;
