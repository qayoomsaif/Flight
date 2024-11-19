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

/**
 * Props for the OptionButton component.
 */
interface OptionButtonProps {
  /**
   * The main title text displayed on the button.
   * @type {string | undefined}
   */
  title?: string;

  /**
   * The subtitle text displayed under the title.
   * @type {string | undefined}
   */
  subtitle?: string;

  /**
   * Determines if the button should have a filled background.
   * @type {boolean}
   * @default false
   */
  filled?: boolean;

  /**
   * The border color of the button.
   * @type {string | undefined}
   */
  borderColor?: string;

  /**
   * The background color of the button.
   * @type {string | undefined}
   */
  backgroundColor?: string;

  /**
   * Optional time information displayed on the button.
   * @type {string | undefined}
   */
  time?: string;

  /**
   * Color of the button text.
   * @type {string | undefined}
   */
  textColor?: string;

  /**
   * SVG XML icon to be displayed on the button.
   * @type {any | undefined}
   */
  icon?: any;

  /**
   * Callback function triggered when the button is pressed.
   * @type {() => void | undefined}
   */
  onPress?: () => void;

  /**
   * Additional style for the button container.
   * @type {ViewStyle | undefined}
   */
  style?: ViewStyle;

  /**
   * Additional style for the title text.
   * @type {TextStyle | undefined}
   */
  titleStyle?: TextStyle;

  /**
   * Additional style for the subtitle text.
   * @type {TextStyle | undefined}
   */
  subtitleStyle?: TextStyle;

  /**
   * Optional flight data associated with the button.
   * @type {FlightData | null}
   */
  item: FlightData | null;
}

/**
 * A customizable button component with optional icons, titles, subtitles, and time.
 *
 * @param {OptionButtonProps} props The properties for the OptionButton component.
 * @returns {JSX.Element} The rendered OptionButton component.
 */
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
  // Access the theme for dynamic styling.
  const {theme} = useTheme();
  const styles = getStyles(theme);

  // Determine the button styles based on the `filled` prop.
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

  // Determine the title text styles based on the `filled` prop.
  const titleTextStyle = filled
    ? [styles.optionText, {color: theme.white}, titleStyle]
    : [styles.optionText, {color: theme.text}, titleStyle];

  // Determine the subtitle text color based on the `filled` prop.
  const subTextColor = filled ? theme.white : textColor || theme.text;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {/* Render the icon if provided */}
      {icon ? (
        <SvgXml width={'20'} height={'18'} xml={icon} />
      ) : (
        <>
          {/* Render the title text */}
          <Text style={titleTextStyle}>{title}</Text>
          <View style={styles.subTextContainer}>
            {/* Render the subtitle text if provided */}
            {subtitle && (
              <Text
                style={[styles.subText, {color: subTextColor}, subtitleStyle]}>
                {subtitle}
              </Text>
            )}
            {/* Render the time and separator if provided */}
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

/**
 * Function to generate styles dynamically based on the theme.
 *
 * @param {Theme} theme The current theme object.
 * @returns {object} The styles object.
 */
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
