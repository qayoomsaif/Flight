// src/utilities/globalStylesThem.ts
import {StyleSheet, Dimensions} from 'react-native';
import {Theme} from '../theme/ThemeContext';

import {width, wps} from '@utilities/resizeUtils';


const createGlobalStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    button: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    label: {
      fontSize: 14,
      marginVertical: 5,
      color: theme.text,
    },
    multiSelectContainer: {
      flexDirection: 'row',
      marginTop: 16,
      flexWrap: 'wrap',
    },
    multiSelectItem: {
      paddingVertical: 9,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginVertical: 5,
      marginRight: 8,
      backgroundColor: theme.background,
    },
    multiSelectItemText: {
      lineHeight: 18,
      fontSize: 14,
      fontWeight: '400',
      color: theme.text,
    },
    secondaryText: {
      lineHeight: 18,
      fontSize: 14,
      fontWeight: '400',
      color: theme.text,
    },
    subHeadingText: {
      lineHeight: 18,
      fontSize: 14,
      fontWeight: '500',
      color: theme.text,
    },
    selectedItem: {
      backgroundColor: '#FFF7EE',
    },
    primaryButton: {
      borderRadius: 8,
      width: width - 32,
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.primaryBtn,
    },
    secondaryButton: {
      borderRadius: 8,
      width: width - 32,
      paddingVertical: 16,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.SecondaryBtn,
    },
    secondaryButtonIcon: {
      width: 20,
      height: 20,
    },
    primaryButtonText: {
      lineHeight: 18,
      fontSize: 14,
      fontWeight: '500',
      color: theme.white,
    },
    secondaryButtonText: {
      lineHeight: 18,
      fontSize: 14,
      fontWeight: '500',
      color: theme.primaryBtn,
    },
    timeText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
    },
  });

export default createGlobalStyles;
