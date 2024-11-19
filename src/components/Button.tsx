// src/components/Buttons.tsx

import React from 'react';
import {TouchableOpacity, ViewStyle, TouchableOpacityProps} from 'react-native';
import createGlobalStyles from '@utilities/globalStylesThem'; // Utility to create global styles based on the theme.
import {Text} from '@components/index'; // Custom Text component.
import {useTheme} from '../theme/ThemeContext'; // Hook to access the theme context.
import {SvgXml} from 'react-native-svg'; // Library for rendering SVGs in React Native.

interface ButtonProps extends TouchableOpacityProps {
  /**
   * The text to display inside the button.
   */
  text: string;

  /**
   * Additional styles for the button container.
   */
  style?: ViewStyle;

  /**
   * Optional SVG XML string for an icon displayed to the left of the text.
   * Example:
   * ```
   * <svg> ... </svg>
   * ```
   */
  iconLeft?: any;

  /**
   * Optional SVG XML string for an icon displayed to the right of the text.
   * Example:
   * ```
   * <svg> ... </svg>
   * ```
   */
  iconRight?: any;

  /**
   * Specifies the button's appearance.
   * - **'primary'**: For primary actions. Typically uses the theme's primary color.
   * - **'secondary'**: For secondary actions. Often has a more subtle design.
   */
  variant?: 'primary' | 'secondary';

  /**
   * The function to call when the button is pressed.
   * @param {any} event - The press event object.
   */
  onPress?: (event: any) => void;
}

/**
 * A reusable, theme-aware button component with support for icons and custom styles.
 *
 * ## Usage
 * Import and use the `Button` component in your project as follows:
 * ```tsx
 * <Button
 *   text="Submit"
 *   variant="primary"
 *   onPress={() => console.log('Button pressed!')}
 *   iconLeft={leftIconXml}
 *   iconRight={rightIconXml}
 *   style={{marginVertical: 10}}
 * />
 * ```
 *
 * @param {ButtonProps} props - Properties to customize the button's appearance and behavior.
 * @returns {React.FC<ButtonProps>} - A button component ready to use in your project.
 */
const Button: React.FC<ButtonProps> = ({
  text,
  style,
  iconLeft,
  iconRight,
  variant = 'primary', // Default variant is 'primary'.
  onPress,
  ...rest
}) => {
  const {theme} = useTheme(); // Access the current theme from the context.
  const globalStyles = createGlobalStyles(theme); // Generate global styles dynamically based on the theme.

  // Determine styles based on the variant (primary or secondary).
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
      activeOpacity={0.8} // Reduces button opacity on press for visual feedback.
      style={buttonStyle} // Apply computed button styles.
      onPress={onPress} // Attach the onPress handler.
      {...rest} // Spread additional props passed to the component.
    >
      {/* Conditionally render the left icon if provided */}
      {iconLeft ? <SvgXml width={'20'} height={'20'} xml={iconLeft} /> : null}
      <Text style={textStyle}>{text}</Text>
      {/* Conditionally render the right icon if provided */}
      {iconRight ? <SvgXml width={'20'} height={'18'} xml={iconRight} /> : null}
    </TouchableOpacity>
  );
};

export default Button;
