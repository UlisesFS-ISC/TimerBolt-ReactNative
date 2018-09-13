import React from "react";
import { Button, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    paddingTop: 30
  },
  actionButton: {
    flex: 2,
    paddingRight: 30
  }
});

const DynamicButtonGroup = ({ status, onStart, onStop, onPause }) => {
  let buttonGroup = (
    <View style={styles.buttonRow}>
      <Button title="Start" style={styles.actionButton} onPress={onStart} />
    </View>
  );
  if (status === "STARTED") {
    buttonGroup = (
      <View style={styles.buttonRow}>
        <Button
          title="Pause"
          color="green"
          style={styles.actionButton}
          onPress={onPause}
        />
        <Button
          title="Stop"
          color="red"
          style={styles.actionButton}
          onPress={onStop}
        />
      </View>
    );
  }
  if (status === "PAUSED") {
    buttonGroup = (
      <View style={styles.buttonRow}>
        <Button
          title="Resume"
          color="green"
          style={styles.actionButton}
          onPress={onStart}
        />
        <Button
          title="Stop"
          color="red"
          style={styles.actionButton}
          onPress={onStop}
        />
      </View>
    );
  }
  return buttonGroup;
};

export default DynamicButtonGroup;
