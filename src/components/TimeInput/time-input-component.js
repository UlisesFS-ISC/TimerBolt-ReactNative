import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export const styles = StyleSheet.create({
  timeRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 400
  },
  input: {
    maxWidth: 100,
    margin: 2,
    borderStyle: "solid",
    backgroundColor: "#EEE"
  }
});

const TimeInputs = ({ setTime, hour, min, sec }) => {
  const isValid = (value, type, valueChangeHandler) => {
    if (isNaN(value) || value > 60) {
      return false;
    } else {
      return true;
    }
  };
  const onValueChange = (type, valueChangeHandler) => value => {
    let numValue = isValid(value, type, valueChangeHandler)
      ? parseInt(value)
      : -1;
    if (type === "HOUR") {
      valueChangeHandler(numValue, -1, -1);
    } else if (type === "MIN") {
      valueChangeHandler(-1, numValue, -1);
    } else {
      valueChangeHandler(-1, -1, numValue);
    }
  };

  return (
    <View style={styles.timeRow}>
      <View style={styles.input}>
        <TextInput
          
          maxLength={2}
          keyboardType="numeric"
          placeholder={"HH"}
          style={styles.input}
          onChangeText={onValueChange("HOUR", setTime)}
        />
      </View>
      <View style={styles.input}>
        <TextInput
         
          maxLength={2}
          keyboardType="numeric"
          placeholder={"MM"}
          style={styles.input}
          onChangeText={onValueChange("MIN", setTime)}
        />
      </View>
      <View style={styles.input}>
        <TextInput
         
          maxLength={2}
          keyboardType="numeric"
          placeholder={"SS"}
          style={styles.input}
          onChangeText={onValueChange("SEC", setTime)}
        />
      </View>
    </View>
  );
};

export default TimeInputs;
