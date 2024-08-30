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

// Define the interface for the BottomSheet props
interface BottomSheetProps {
  height: number | DimensionValue;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  customStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  draggable?: boolean;
  dragOnContent?: boolean;
  useNativeDriver?: boolean;
  customModalProps?: object;
  customAvoidingViewProps?: object;
  onOpen?: () => void;
  animationType?: 'none' | 'fade' | 'slide';
  openDuration?: number;
  closeDuration?: number;
  closeOnPressMask?: boolean;
  closeOnPressBack?: boolean;
  title?: string;
}

// Define the interface for the ref methods
export interface BottomSheetRef {
  open: () => void;
  close: () => void;
  forceClose: () => void;
  collapse: () => void;
  snapToIndex: (index: number) => void;
  snapToPosition: (position: number) => void;
}

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
    const bottomSheetRef = useRef<RBSheet>(null);
    const {theme} = useTheme();

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.open(),
      close: () => {
        Keyboard.dismiss();
        bottomSheetRef.current?.close();
        onClose?.();
      },
      forceClose: () => {
        onClose?.();
        bottomSheetRef.current?.close();
      },
      collapse: () => bottomSheetRef.current?.collapse?.(),
      snapToIndex: (index: number) =>
        bottomSheetRef.current?.snapToIndex?.(index),
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
