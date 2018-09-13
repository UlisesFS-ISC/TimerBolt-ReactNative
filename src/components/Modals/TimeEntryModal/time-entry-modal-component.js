import React from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from "react-native";

const styles = StyleSheet.create({
  timeEntryModalContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    padding: 10,
    margin: 10,
    backgroundColor: "dodgerblue"
  },
  timeEntryActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    padding: 20,
    margin: 10
  },
  timeEntryLabel: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16
  },
  timeEntryField: {
    fontWeight: "100",
    color: "white",
    fontSize: 16
  }
});

const TimeEntryModal = ({ modalEntry, deleteEntry, hideModal }) => {
  return (
    <Modal
    style={styles.timeEntryModalContainer}
      animationType="slide"
      transparent={false}
      visible={modalEntry.size > 1}
       onRequestClose={() => {}}
    >
      <View style={styles.timeEntryModalContainer}>
        <Text style={styles.timeEntryLabel}>
          {`Activity name:  `}
          <Text style={styles.timeEntryField}>{modalEntry.get("name")}</Text>
        </Text>
        <Text style={styles.timeEntryLabel}>
          {`Activity duration:  `}
          <Text style={styles.timeEntryField}>
            {modalEntry.get("timeelapsed")}
          </Text>
        </Text>
        <Text style={styles.timeEntryLabel}>
          {`Date:  `}
          <Text style={styles.timeEntryField}>
            {modalEntry.get("dateposted")}
          </Text>
        </Text>
        <Text style={styles.timeEntryLabel}>
          {`Performed by:  `}
          <Text style={styles.timeEntryField}>{modalEntry.get("user")}</Text>
        </Text>
        <View style={styles.timeEntryActions}>
          <TouchableHighlight
            onPress={() => {
              deleteEntry();
              hideModal();
            }}
          >
            <Text>Delete entry</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              hideModal();
            }}
          >
            <Text>Return</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export default TimeEntryModal;
