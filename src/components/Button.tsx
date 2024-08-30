// src/components/Buttons.tsx
import React from 'react';
import {TouchableOpacity, ViewStyle, TouchableOpacityProps} from 'react-native';
import createGlobalStyles from '@utilities/globalStylesThem';
import {Text} from '@components/index';
import {useTheme} from '../theme/ThemeContext';
import {SvgXml} from 'react-native-svg';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  style?: ViewStyle;
  iconLeft?: any;
  iconRight?: any;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  text,
  style,
  iconLeft,
  iconRight,
  variant = 'primary',
  onPress,
  ...rest
}) => {
  const {theme} = useTheme();
  const globalStyles = createGlobalStyles(theme);

  // Determine the button style based on the variant
  const isPrimary = variant === 'primary';
  const buttonStyle = [
    isPrimary ? globalStyles.primaryButton : globalStyles.secondaryButton,
    style,
  ];
  const textStyle = [
    isPrimary
      ? globalStyles.primaryButtonText
      : globalStyles.secondaryButtonText,
  ];
  const iconLeftStyle = [globalStyles.secondaryButtonIcon, {marginRight: 16}];
  const iconRightStyle = [globalStyles.secondaryButtonIcon, {marginLeft: 16}];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={buttonStyle}
      onPress={onPress}
      {...rest}>
      {iconLeft ? <SvgXml width={'20'} height={'20'} xml={iconLeft} /> : null}
      <Text style={textStyle}>{text}</Text>
      {iconRight ? <SvgXml width={'20'} height={'18'} xml={iconRight} /> : null}
    </TouchableOpacity>
  );
};

export default Button;
