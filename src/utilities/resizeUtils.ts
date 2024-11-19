import DeviceInfo from 'react-native-device-info';
import {Platform, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

/**
 * Helper function to check if the device is a tablet (iPad or Android tablet).
 *
 * @returns {boolean} - True if the device is a tablet, false otherwise.
 */
export const tablet = (): boolean => {
  const isAndroidTablet = Platform.OS === 'android' && DeviceInfo.isTablet();
  const isIosTablet = Platform.OS === 'ios' && DeviceInfo.isTablet();
  return isAndroidTablet || isIosTablet;
};

/**
 * Helper function to check if the device is an iPad.
 *
 * @returns {boolean} - True if the device is an iPad, false otherwise.
 */
export const ipad = (): boolean => {
  return Platform.OS === 'ios' && DeviceInfo.isTablet();
};

/**
 * Helper function to check if the device is a mobile phone.
 *
 * @returns {boolean} - True if the device is a mobile phone, false if it is a tablet.
 */
export const mobile = (): boolean => {
  return !tablet();
};

// Exporting flags for easy access throughout the app
export const isTablet = tablet();
export const isIpad = ipad();
export const isMobile = mobile();

/**
 * Scales the size based on screen width.
 *
 * @param {number} size - The size to scale.
 * @returns {number} - The scaled size based on the screen width.
 */
export const scale = (size: number): number =>
  (width / (isTablet ? 768 : 375)) * size;

/**
 * Scales the size based on screen height with an optional factor.
 *
 * @param {number} size - The size to scale.
 * @param {number} [factor=1] - The factor to scale with.
 * @returns {number} - The scaled size based on the screen height.
 */
export const scaleHeight = (size: number, factor = 1): number =>
  (height / 812) * size;

/**
 * Scales the height of an element with an optional factor.
 *
 * @param {number} size - The original size of the element.
 * @param {number} [factor=1] - The factor to scale the height with.
 * @returns {number} - The scaled height.
 */
export const heightScale = (size: number, factor = 1): number =>
  size + (scaleHeight(size) - size) * factor;

/**
 * Scales the width of an element with an optional factor.
 *
 * @param {number} size - The original size of the element.
 * @param {number} [factor=1] - The factor to scale the width with.
 * @returns {number} - The scaled width.
 */
export const widthScale = (size: number, factor = 1): number =>
  size + (scale(size) - size) * factor;

/**
 * Calculates the width subtraction from the scaled width.
 *
 * @param {number} size - The size to subtract from the scaled width.
 * @returns {number} - The result of subtracting the scaled width from the screen width.
 */
export const widthScaleSub = (size: number): number => width - widthScale(size);

/**
 * Scales a square dimension based on either height or width, depending on which is larger.
 *
 * @param {number} size - The original size of the square.
 * @param {number} [factor=1] - The factor to scale the square with.
 * @returns {number} - The scaled square dimension.
 */
export const square = (size: number, factor = 1): number =>
  height < width
    ? size + (scaleHeight(size) - size)
    : size + (scale(size) - size) * factor;

/**
 * Subtracts the width of the scaled width from the screen width.
 *
 * @param {number} size - The size to subtract from the screen width.
 * @returns {number} - The result of subtracting the width from the scaled width.
 */
export const wps = (size: number): number => width - widthScale(size);

/**
 * Subtracts the height of the scaled height from the screen width.
 *
 * @param {number} size - The size to subtract from the screen height.
 * @returns {number} - The result of subtracting the height from the scaled height.
 */
export const hps = (size: number): number => width - heightScale(size);

/**
 * Scales a value based on height percentage with an optional factor.
 *
 * @param {number} size - The size to scale based on height percentage.
 * @param {number} [factor=1] - The factor to scale the height with.
 * @returns {number} - The scaled height percentage.
 */
export const hp = (size: number, factor = 1): number =>
  size + (scaleHeight(size) - size) * factor;

/**
 * Scales a value based on width percentage with an optional factor.
 *
 * @param {number} size - The size to scale based on width percentage.
 * @param {number} [factor=1] - The factor to scale the width with.
 * @returns {number} - The scaled width percentage.
 */
export const wp = (size: number, factor = 1): number =>
  size + (scale(size) - size) * factor;

/**
 * Scales a square dimension based on the percentage and an optional factor.
 *
 * @param {number} size - The size of the square to scale.
 * @param {number} [factor=1] - The factor to scale the square with.
 * @returns {number} - The scaled square percentage.
 */
export const sp = (size: number, factor = 1): number =>
  height < width
    ? size + (scaleHeight(size) - size)
    : size + (scale(size) - size) * factor;

/**
 * Flexible height percentage scaling with a default factor.
 *
 * @param {number} size - The size to scale.
 * @param {number} [factor=0.7] - The default factor to scale with.
 * @returns {number} - The scaled height percentage.
 */
export const fhp = (size: number, factor = 0.7): number =>
  size + (scaleHeight(size) - size) * factor;

/**
 * Flexible width percentage scaling with a default factor.
 *
 * @param {number} size - The size to scale.
 * @param {number} [factor=1] - The default factor to scale with.
 * @returns {number} - The scaled width percentage.
 */
export const fwp = (size: number, factor = 1): number =>
  size + (scale(size) - size) * factor;

/**
 * Flexible square percentage scaling with a default factor.
 *
 * @param {number} size - The size of the square to scale.
 * @param {number} [factor=0.5] - The default factor to scale the square with.
 * @returns {number} - The scaled square percentage.
 */
export const fsp = (size: number, factor = 0.5): number =>
  height < width
    ? size + (scaleHeight(size) - size)
    : size + (scale(size) - size) * factor;

// Exporting Dimensions for convenience
export {width, height};
