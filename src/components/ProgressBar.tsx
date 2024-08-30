// src/components/ProgressBar.tsx
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Theme} from '../theme/ThemeContext';
import {Text} from '@components/index';

interface SearchProgressProps {
  initialCount: number;
}

import {width, wps} from '@utilities/resizeUtils';

const SearchProgress: React.FC<SearchProgressProps> = ({initialCount}) => {
  const [count, setCount] = useState(initialCount);
  const {theme} = useTheme(); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

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
