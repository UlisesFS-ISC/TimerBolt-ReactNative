import React from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from "react-native";

import getModalStyles from '../modal-styles';

const modalStyles = getModalStyles();

const TimeEntryModal = ({ visible, modalEntry, hideModal }) => {
  return (
     <View style={modalStyles.overlay}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
       onRequestClose={() => {}}
    >
      <View style={modalStyles.modalContainer}>
      <View style={modalStyles.modalEntryDescription}>
        <Text style={modalStyles.modalBoldText}>
          {`Activity name:  `}
          <Text style={modalStyles.modalText}>{modalEntry.get("timeEntryName")}</Text>
        </Text>
        <Text style={modalStyles.modalBoldText}>
          {`Activity duration:  `}
          <Text style={modalStyles.modalText}>
            {modalEntry.get("timeElapsed")}
          </Text>
        </Text>
         <Text style={modalStyles.modalBoldText}>
          {`Activity tag:  `}
          <Text style={modalStyles.modalText}>
            {modalEntry.get("activityTag", "N/A")}
          </Text>
        </Text>
        <Text style={modalStyles.modalBoldText}>
          {`Timer entry type:  `}
          <Text style={modalStyles.modalText}>
            {modalEntry.get("timerType", "N/A")}
          </Text>
        </Text>
        <Text style={modalStyles.modalBoldText}>
          {`Date:  `}
          <Text style={modalStyles.modalText}>
            {modalEntry.get("datePosted")}
          </Text>
        </Text>
      </View>
        <View style={modalStyles.modalNavigationActions}>
          <TouchableHighlight
            onPress={() => {
              hideModal();
            }}
          >
            <Text style={modalStyles.modalBoldText}>Return</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
    </View>
  );
};

export default TimeEntryModal;
