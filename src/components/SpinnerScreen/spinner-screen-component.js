import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import {Spinner} from 'native-base';

const styles = StyleSheet.create({
  spinnerContainer:{
    flex: 1,
    opacity: 0.7,
    backgroundColor:'gray',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const SpinnerScreen = ({ status, onStart, onStop, onPause }) => {
  
  return (<View style={styles.spinnerContainer}>
    <Spinner color='blue' />
  </View>);
};

export default SpinnerScreen;
