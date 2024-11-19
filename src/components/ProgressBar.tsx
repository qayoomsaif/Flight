// src/components/ProgressBar.tsx

import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Theme} from '../theme/ThemeContext'; // Hook to access the theme context.
import {Text} from '@components/index'; // Custom Text component.
import {width, wps} from '@utilities/resizeUtils'; // Utility functions for width and scaling.

interface SearchProgressProps {
  /**
   * The initial count value for the progress bar.
   * This value will be decremented until it reaches zero.
   *
   * @type {number}
   */
  initialCount: number;
}

/**
 * A component to show a progress bar that counts down from an initial value.
 * The component updates the progress bar width and countdown every second.
 *
 * ## Usage:
 * ```tsx
 * <SearchProgress initialCount={100} />
 * ```
 * @param {SearchProgressProps} props - The properties for the SearchProgress component.
 * @returns {React.FC<SearchProgressProps>} - The progress bar component.
 */
const SearchProgress: React.FC<SearchProgressProps> = ({initialCount}) => {
  const [count, setCount] = useState(initialCount); // Local state to track the countdown.
  const {theme} = useTheme(); // Access the current theme.

  // Set up an interval to decrement the count every second.
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0)); // Decrement count until 0.
    }, 1000); // Interval is set to 1 second (1000ms).

    // Clear the interval when the component is unmounted or count reaches 0.
    return () => clearInterval(timer);
  }, []);

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Searching for the results...</Text>
        <Text style={styles.countText}>{`${count}...`}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${count}%`}]} />
      </View>
    </View>
  );
};

/**
 * Function to generate the styles based on the provided theme.
 *
 * @param {Theme} theme - The current theme object.
 * @returns {StyleSheet} - Returns a StyleSheet based on the current theme.
 */
const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: width - 32,
    },
    headingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    heading: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      color: theme.text,
    },
    countText: {
      fontSize: 14,
      marginLeft: 8,
      fontWeight: '400',
      lineHeight: 18,
      color: theme.subText,
    },
    progressBarContainer: {
      height: 8,
      borderRadius: 8,
      overflow: 'hidden',
      width: '100%',
      backgroundColor: theme.disable,
    },
    progressBar: {
      height: '100%',
      borderRadius: 4,
      backgroundColor: theme.primary,
    },
  });

export default SearchProgress;
