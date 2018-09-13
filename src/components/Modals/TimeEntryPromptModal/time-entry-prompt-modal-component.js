import React from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  View
} from "react-native";

const styles = StyleSheet.create({
  timeEntryPromptModalContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    padding: 10,
    margin: 10,
    backgroundColor: "dodgerblue"
  },
  timeEntryPromptActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    padding: 20,
    margin: 20
  },
  timeEntryPromptMessage: {
    fontWeight: "100",
    color: "white",
    fontSize: 16
  },
  timeEntryNameInputFieldContainer: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 20
  },
  timeEntryNameInputField: {
    fontWeight: "400",
    color: "gray",
    fontSize: 16
  }
});

const TimeEntryPromptModal = ({
  visible,
  toggleModal,
  insertEntry,
  changeEntryName,
  entryName,
  timeElapsed,
  userName,
  email,
  token
}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={() => {}}>
      <View style={styles.timeEntryPromptModalContainer}>
        <Text style={styles.timeEntryLabel}>
          {`Do you want to save this entry in your activity log ?: `}
        </Text>
        <View style={styles.timeEntryNameInputFieldContainer}>
          <TextInput
            value={entryName}
            placeholder={"Enter the performed activity name"}
            style={styles.timeEntryNameInputField}
            onChangeText={changeEntryName}
          />
        </View>
        <View style={styles.timeEntryPromptActions}>
          <TouchableHighlight
            onPress={() => {
              insertEntry(entryName, timeElapsed, userName, email, token);
              changeEntryName("");
              toggleModal();
            }}
          >
            <Text>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              changeEntryName("");
              toggleModal();
            }}
          >
            <Text>Close</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export default TimeEntryPromptModal;
