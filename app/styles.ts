// * React Native
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#efebe9',
    borderColor: '#4e342e',
    borderLeftColor: '#4e342e',
    borderCurve: 'continuous',
    borderTopWidth: Platform.OS === 'ios' ? 0.2 : 0.5,
    borderBottomWidth: 0.1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  helperText: {alignSelf: 'flex-end', marginTop: -25},
});
