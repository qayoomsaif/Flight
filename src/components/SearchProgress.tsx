// src/components/filters/SearchProgress.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Theme, useTheme} from '../theme/ThemeContext';
import {Text} from '@components/index';
import {width, wps} from '@utilities/resizeUtils';

interface SearchProgressProps {
  initialCount: number;
}

const SearchProgress: React.FC<SearchProgressProps> = ({initialCount}) => {
  const {theme} = useTheme();

  const styles = getStyles(theme); 

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Searching for the results...</Text>
        <Text style={styles.countText}>{`${initialCount}...`}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
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
