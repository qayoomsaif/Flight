// src/components/Header.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@components/index';
import {Theme, useTheme} from '../theme/ThemeContext';
import {SvgXml} from 'react-native-svg';

interface HeaderProps {
  fromCity: string;
  toCity: string;
  leftIcon?: string;
  rightIcon?: string;
  centerIcon?: string;
  leftAction?: () => void;
  rightAction?: () => void;
  fromDate?: string;
  toDate?: string;
}

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
  const {theme} = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.headerContainer}>
      {leftIcon && (
        <SvgXml
          width={24}
          height={24}
          xml={leftIcon}
          style={styles.iconWrapper}
          onPress={leftAction}
        />
      )}
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
        {fromDate && toDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{`${fromDate}  |  ${toDate}`}</Text>
          </View>
        )}
      </View>
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
