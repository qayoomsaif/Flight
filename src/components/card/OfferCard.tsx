// src/components/card/OfferCard.tsx
import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Theme, useTheme} from '@theme/ThemeContext';
import {Text} from '@components/index';

import {width} from '@utilities/resizeUtils';

// Define the interface for the OfferCard props
interface OfferCardProps {
  backgroundImage: any;
  heading: string;
  title: string;
  subHeading: string;
  buttonText: string;
  onButtonPress: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({
  backgroundImage,
  heading,
  title,
  subHeading,
  buttonText,
  onButtonPress,
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>

      <ImageBackground
        source={backgroundImage ? backgroundImage : null}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.heading}>{heading}</Text>
            <Text style={styles.subHeading}>{subHeading}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onButtonPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      borderRadius: 12,
      width: width - 32,
      overflow: 'hidden',
      marginVertical: 12,
      marginHorizontal: 16,
      backgroundColor: theme.background,
    },
    backgroundImage: {
      width: '100%',
      height: 184,
      elevation: 4,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    imageStyle: {
      borderRadius: 12,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 20,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 20,
      fontWeight: '500',
      lineHeight: 24,
      marginVertical: 12,
      color: theme.text,
    },
    heading: {
      fontSize: 24,
      fontWeight: '500',
      lineHeight: 30,
      color: theme.white,
    },
    subHeading: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 18,
      marginTop: 4,
      color: theme.white,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 8,
      backgroundColor: theme.primaryBtn,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 18,
      color: theme.white,
    },
  });

export default OfferCard;
