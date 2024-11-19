// src/components/BottomSheet.tsx

import React, {forwardRef, useRef, useImperativeHandle, ReactNode} from 'react';
import {
  StyleSheet,
  Keyboard,
  ViewStyle,
  StyleProp,
  DimensionValue,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Text from './react-native-override-components/Text';
import {useTheme} from '@theme/ThemeContext';

/**
 * Interface for the props accepted by the BottomSheet component.
 */
interface BottomSheetProps {
  /**
   * Height of the BottomSheet.
   * @type {number | DimensionValue}
   */
  height: number | DimensionValue;

  /**
   * Child components to render inside the BottomSheet.
   * @type {ReactNode | undefined}
   */
  children?: ReactNode;

  /**
   * Style for the BottomSheet's container.
   * @type {StyleProp<ViewStyle> | undefined}
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Additional custom styles for the BottomSheet.
   * @type {StyleProp<ViewStyle> | undefined}
   */
  customStyle?: StyleProp<ViewStyle>;

  /**
   * Callback invoked when the BottomSheet is closed.
   * @type {() => void | undefined}
   */
  onClose?: () => void;

  /**
   * Enables or disables dragging of the BottomSheet.
   * @type {boolean | undefined}
   * @default true
   */
  draggable?: boolean;

  /**
   * Enables dragging of the BottomSheet on its content area.
   * @type {boolean | undefined}
   * @default false
   */
  dragOnContent?: boolean;

  /**
   * Enables the use of native driver for animations.
   * @type {boolean | undefined}
   * @default false
   */
  useNativeDriver?: boolean;

  /**
   * Custom properties for the modal behavior.
   * @type {object | undefined}
   */
  customModalProps?: object;

  /**
   * Custom properties for the avoiding view behavior.
   * @type {object | undefined}
   */
  customAvoidingViewProps?: object;

  /**
   * Callback invoked when the BottomSheet is opened.
   * @type {() => void | undefined}
   */
  onOpen?: () => void;

  /**
   * Animation type for opening and closing the BottomSheet.
   * @type {'none' | 'fade' | 'slide' | undefined}
   * @default 'fade'
   */
  animationType?: 'none' | 'fade' | 'slide';

  /**
   * Duration for the opening animation in milliseconds.
   * @type {number | undefined}
   * @default 200
   */
  openDuration?: number;

  /**
   * Duration for the closing animation in milliseconds.
   * @type {number | undefined}
   * @default 0
   */
  closeDuration?: number;

  /**
   * Whether to close the BottomSheet when the mask is pressed.
   * @type {boolean | undefined}
   * @default true
   */
  closeOnPressMask?: boolean;

  /**
   * Whether to close the BottomSheet when the back button is pressed.
   * @type {boolean | undefined}
   * @default false
   */
  closeOnPressBack?: boolean;

  /**
   * Title displayed at the top of the BottomSheet.
   * @type {string | undefined}
   */
  title?: string;
}

/**
 * Interface for the methods exposed by the BottomSheet ref.
 */
export interface BottomSheetRef {
  /**
   * Opens the BottomSheet.
   */
  open: () => void;

  /**
   * Closes the BottomSheet and dismisses the keyboard.
   */
  close: () => void;

  /**
   * Forces the BottomSheet to close without additional actions.
   */
  forceClose: () => void;

  /**
   * Collapses the BottomSheet to its initial state, if supported.
   */
  collapse: () => void;

  /**
   * Snaps the BottomSheet to a specific index position.
   * @param index The index to snap to.
   */
  snapToIndex: (index: number) => void;

  /**
   * Snaps the BottomSheet to a specific position in pixels.
   * @param position The position in pixels to snap to.
   */
  snapToPosition: (position: number) => void;
}

/**
 * A customizable BottomSheet component.
 * Provides methods to open, close, or manipulate the sheet dynamically.
 * @param props The props for configuring the BottomSheet.
 * @param ref The ref object for accessing BottomSheet methods.
 * @returns A BottomSheet component.
 */
const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      height = 300,
      children,
      customStyle,
      draggable = true,
      dragOnContent = false,
      useNativeDriver = false,
      customModalProps,
      customAvoidingViewProps,
      onOpen = () => {},
      onClose = () => {},
      containerStyle,
      animationType = 'fade',
      closeOnPressMask = true,
      closeOnPressBack = false,
      openDuration = 200,
      closeDuration = 0,
      title,
      ...rest
    },
    ref,
  ) => {
    // Internal ref for the RBSheet component
    const bottomSheetRef = useRef<RBSheet>(null);

    // Theme context for dynamic styling
    const {theme} = useTheme();

    // Expose ref methods to the parent component
    useImperativeHandle(ref, () => ({
      /**
       * Opens the BottomSheet.
       */
      open: () => bottomSheetRef.current?.open(),

      /**
       * Closes the BottomSheet and dismisses the keyboard.
       */
      close: () => {
        Keyboard.dismiss();
        bottomSheetRef.current?.close();
        onClose?.();
      },

      /**
       * Forces the BottomSheet to close without dismissing the keyboard.
       */
      forceClose: () => {
        onClose?.();
        bottomSheetRef.current?.close();
      },

      /**
       * Collapses the BottomSheet (if supported by RBSheet).
       */
      collapse: () => bottomSheetRef.current?.collapse?.(),

      /**
       * Snaps the BottomSheet to a specific index.
       * @param index The index to snap to.
       */
      snapToIndex: (index: number) =>
        bottomSheetRef.current?.snapToIndex?.(index),

      /**
       * Snaps the BottomSheet to a specific position in pixels.
       * @param position The position in pixels to snap to.
       */
      snapToPosition: (position: number) =>
        bottomSheetRef.current?.snapToPosition?.(position),
    }));

    return (
      <RBSheet
        ref={bottomSheetRef}
        height={height}
        animationType={animationType}
        openDuration={openDuration}
        closeDuration={closeDuration}
        closeOnPressMask={closeOnPressMask}
        closeOnPressBack={closeOnPressBack}
        draggable={draggable}
        dragOnContent={dragOnContent}
        useNativeDriver={useNativeDriver}
        customStyles={{
          container: [
            styles.container,
            {backgroundColor: theme.card},
            customStyle,
            containerStyle,
            {height},
          ],
        }}
        customModalProps={customModalProps}
        customAvoidingViewProps={customAvoidingViewProps}
        onOpen={onOpen}
        onClose={onClose}
        {...rest}>
        {/* Display title if provided */}
        {title && (
          <Text style={[styles.title, {color: theme.text}]}>{title}</Text>
        )}
        {children}
      </RBSheet>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  title: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '700',
  },
});

export default BottomSheet;
