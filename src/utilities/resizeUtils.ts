// src/utilities/resizeUtils.ts

import DeviceInfo from 'react-native-device-info';
import {Platform, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Helper function to check if the device is an iPad or Android tablet
export const tablet = (): boolean => {
  const isAndroidTablet = Platform.OS === 'android' && DeviceInfo.isTablet();
  const isIosTablet = Platform.OS === 'ios' && DeviceInfo.isTablet();
  return isAndroidTablet || isIosTablet;
};

// Helper function to check if the device is an iPad
export const ipad = (): boolean => {
  return Platform.OS === 'ios' && DeviceInfo.isTablet();
};

// Helper function to check if the device is a mobile phone
export const mobile = (): boolean => {
  return !tablet();
};
export const isTablet = tablet();
export const isIpad = ipad();
export const isMobile = mobile();

// Function to scale size based on screen width
export const scale = (size: number): number =>
  (width / (isTablet ? 768 : 375)) * size;

// Function to scale size based on screen height with a factor
export const scaleHeight = (size: number, factor = 1): number =>
  (height / 812) * size;

// Function to scale height with an optional factor
export const heightScale = (size: number, factor = 1): number =>
  size + (scaleHeight(size) - size) * factor;

// Function to scale width with an optional factor
export const widthScale = (size: number, factor = 1): number =>
  size + (scale(size) - size) * factor;

// Function to calculate the width subtraction from the scale
export const widthScaleSub = (size: number): number => width - widthScale(size);

// Function to scale a square dimension
export const square = (size: number, factor = 1): number =>
  height < width
    ? size + (scaleHeight(size) - size)
    : size + (scale(size) - size) * factor;

// Width subtraction with scaling
export const wps = (size: number): number => width - widthScale(size);

// Height subtraction with scaling
export const hps = (size: number): number => width - heightScale(size);

// Height percentage scaling with a factor
export const hp = (size: number, factor = 1): number =>
  size + (scaleHeight(size) - size) * factor;

// Width percentage scaling with a factor
export const wp = (size: number, factor = 1): number =>
  size + (scale(size) - size) * factor;

// Square percentage scaling with a factor
export const sp = (size: number, factor = 1): number =>
  height < width
    ? size + (scaleHeight(size) - size)
    : size + (scale(size) - size) * factor;

// Flexible height percentage scaling with a default factor
export const fhp = (size: number, factor = 0.7): number =>
  size + (scaleHeight(size) - size) * factor;

// Flexible width percentage scaling with a default factor
export const fwp = (size: number, factor = 1): number =>
  size + (scale(size) - size) * factor;

// Flexible square percentage scaling with a default factor
export const fsp = (size: number, factor = 0.5): number =>
  height < width
    ? size + (scaleHeight(size) - size)
    : size + (scale(size) - size) * factor;

// Exporting Dimensions and StyleSheet for convenience
export {width, height};
