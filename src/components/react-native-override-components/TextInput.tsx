import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import {fsp, fwp, fhp, isTablet} from '@utilities/resizeUtils';

// Define the type for custom props if needed, extending from TextProps
interface CustomTextProps extends TextInputProps {
  style?: StyleProp<TextStyle>; // Ensure styles can be merged
}

// Custom Text component
const TextInput: React.FC<CustomTextProps> = ({style, ...rest}) => {
  // Flatten the style to extract fontWeight, fontStyle, and fontFamily
  const flattenedStyle = StyleSheet.flatten(style) as TextStyle | undefined;

  // Default values
  const defaultFontWeight: number = 400; // Normal weight
  const defaultFontStyle: 'normal' | 'italic' = 'normal'; // Normal style

  // Extract or default to values
  const fontFamily = flattenedStyle?.fontFamily; // Use fontFamily from style if provided
  const fontWeight = flattenedStyle?.fontWeight ?? defaultFontWeight;
  const fontStyle = flattenedStyle?.fontStyle ?? defaultFontStyle;

  // Determine the final fontFamily based on fontWeight and fontStyle only if fontFamily is not provided
  const computedFontFamily = fontFamily || getFontFamily(fontWeight, fontStyle);

  // Merge styles with custom fontFamily and the provided style
  return (
    <RNTextInput
      {...rest}
      style={[
        {fontFamily: computedFontFamily, fontStyle},
        style, // Ensure custom styles override default ones
        {
          lineHeight: isTablet
            ? (flattenedStyle?.lineHeight || 18) + 6
            : flattenedStyle?.lineHeight,

          fontSize: fwp(
            flattenedStyle?.fontSize
              ? isTablet
                ? flattenedStyle?.fontSize + 2
                : flattenedStyle?.fontSize
              : 14,
          ),
        },
      ]}
    />
  );
};

// Font family mapping function for custom fonts
const getFontFamily = (fontWeight: number, fontStyle: 'normal' | 'italic') => {
  if (fontStyle === 'italic') {
    if (fontWeight >= 700) return 'Direct-BoldItalic';
    return 'Direct-Italic';
  }

  if (fontWeight >= 900) return 'Direct-Bold';
  if (fontWeight === 700) return 'Direct-SemiCondensedBold';
  if (fontWeight === 600) return 'Direct-SemiBold';
  if (fontWeight === 500) return 'Direct-Regular';
  if (fontWeight === 400) return 'Direct-Condensed';
  if (fontWeight === 300) return 'Direct-CondensedLight';

  return 'Direct-Regular'; // Default fontFamily for all other weights
};

export default React.memo(TextInput);
