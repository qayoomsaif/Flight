// src/styles/globalStyles.ts
import {StyleSheet, Dimensions} from 'react-native';
import {width, wps} from '@utilities/resizeUtils';


const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
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
  },
  multiSelectContainer: {
    flexDirection: 'row',
    // marginTop: 16,
    flexWrap: 'wrap',
  },
  multiSelectItem: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 5,
    marginRight: 8,
  },
  multiSelectItemText: {
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
  },
  secondaryText: {
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
  },
  subHeadingText: {
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  selectedItem: {
    backgroundColor: '#FFF7EE',
  },
  _button: {
    borderRadius: 8,
    width: width - 32,
    paddingVertical: 16,
    // paddingVertical: 9,
    // paddingHorizontal: 16,
    // borderRadius: 8,
    // marginVertical: 5,
    // marginRight: 8,
  },
});

export default globalStyles;
