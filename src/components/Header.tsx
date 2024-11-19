// src/components/Header.tsx

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@components/index';
import {Theme, useTheme} from '../theme/ThemeContext';
import {SvgXml} from 'react-native-svg';

/**
 * Props for the Header component.
 */
interface HeaderProps {
  /**
   * Name of the city from which the journey starts.
   * @type {string}
   */
  fromCity: string;

  /**
   * Name of the destination city.
   * @type {string}
   */
  toCity: string;

  /**
   * SVG XML for the left icon (optional).
   * @type {string | undefined}
   */
  leftIcon?: string;

  /**
   * SVG XML for the right icon (optional).
   * @type {string | undefined}
   */
  rightIcon?: string;

  /**
   * SVG XML for the center icon (optional).
   * @type {string | undefined}
   */
  centerIcon?: string;

  /**
   * Action to execute when the left icon is pressed.
   * @type {() => void | undefined}
   */
  leftAction?: () => void;

  /**
   * Action to execute when the right icon is pressed.
   * @type {() => void | undefined}
   */
  rightAction?: () => void;

  /**
   * Date of departure (optional).
   * @type {string | undefined}
   */
  fromDate?: string;

  /**
   * Date of return or arrival (optional).
   * @type {string | undefined}
   */
  toDate?: string;
}

/**
 * Header component displaying a journey summary between two cities.
 * Includes optional icons and dates.
 *
 * @param {HeaderProps} props The properties passed to the Header component.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header: React.FC<HeaderProps> = ({
  fromCity,
  toCity,
  leftIcon,
  rightIcon,
  centerIcon,
  leftAction,
  rightAction,
  fromDate,
  toDate,
}) => {
  // Access the theme for dynamic styling.
  const {theme} = useTheme();

  // Generate styles based on the current theme.
  const styles = getStyles(theme);

  return (
    <View style={styles.headerContainer}>
      {/* Left icon with optional action */}
      {leftIcon && (
        <SvgXml
          width={24}
          height={24}
          xml={leftIcon}
          style={styles.iconWrapper}
          onPress={leftAction}
        />
      )}

      {/* Title section showing cities and optional center icon */}
      <View style={styles.titleContainer}>
        <View style={styles.cityContainer}>
          <Text style={styles.cityText}>{fromCity}</Text>
          {centerIcon && (
            <SvgXml
              width={20}
              height={18}
              xml={centerIcon}
              style={styles.centerIcon}
            />
          )}
          <Text style={styles.cityText}>{toCity}</Text>
        </View>

        {/* Dates section (optional) */}
        {fromDate && toDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{`${fromDate}  |  ${toDate}`}</Text>
          </View>
        )}
      </View>

      {/* Right icon with optional action */}
      {rightIcon ? (
        <SvgXml
          width={24}
          height={24}
          xml={rightIcon}
          style={styles.iconWrapper}
          onPress={rightAction}
        />
      ) : (
        <View style={styles.iconWrapper} />
      )}
    </View>
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
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 10,
      height: 110,
      backgroundColor: theme.background,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    cityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cityText: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      color: theme.text,
    },
    centerIcon: {
      marginHorizontal: 8,
      width: 20,
      height: 20,
    },
    dateContainer: {
      flexDirection: 'row',
      marginTop: 4,
    },
    dateText: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 18,
      color: theme.subText,
    },
    iconWrapper: {
      padding: 10,
      width: 24,
    },
  });

export default Header;
