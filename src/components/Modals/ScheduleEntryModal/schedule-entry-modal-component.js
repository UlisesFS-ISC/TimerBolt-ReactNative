import React from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
   View
} from "react-native";

import getModalStyles from '../modal-styles';

const modalStyles = getModalStyles();

const ScheduleEntryModal = ({ modalEntry, deleteEntry, hideModal, visible }) => {
  let setForEntry;
    if(modalEntry.get("singleUse")) {
      setForEntry = (
          <Text style={modalStyles.modalBoldText}>
                {`Set to:  `}
                <Text style={modalStyles.modalText}>{modalEntry.get("scheduledDayTime", '')}</Text>
          </Text>
        );
    } else  {
          setForEntry = (
          <Text style={modalStyles.modalBoldText}>
                {`Happens every: `}
                <Text style={modalStyles.modalText}>{modalEntry.get("activeInDays", []).join(', ')}</Text>
                <Text style={modalStyles.modalText}>{` at  ${modalEntry.get("scheduledDayTime", '')}`}</Text>
          </Text>
        );
    }
  return (
    <View style={modalStyles.overlay}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEntry.size > 1 && visible}
        onRequestClose={() =>{}}
        >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalEntryDescription}>
          <Text style={modalStyles.modalBoldText}>
            {`Schedule entry name:  `}
            <Text style={modalStyles.modalText}>
              {modalEntry.get("scheduleEntryName")}
            </Text>
          </Text>
          <Text style={modalStyles.modalBoldText}>
            {`Schedule entry description:  `}
            <Text style={modalStyles.modalText}>
              {modalEntry.get("scheduleEntryDescription")}
            </Text>
          </Text>
          {setForEntry}
          <Text style={modalStyles.modalBoldText}>
            {`Entry type:  `}
            <Text style={modalStyles.modalText}>
              {modalEntry.get("activityTag")}
            </Text>
          </Text>
          <Text style={modalStyles.modalBoldText}>
            {`Scheduled by:  `}
            <Text style={modalStyles.modalText}>
              {modalEntry.get("userName")}
            </Text>
          </Text>
          </View>
          <View style={modalStyles.modalNavigationActions}>
            <TouchableHighlight
              onPress={() => {
                deleteEntry(modalEntry.get("uuid"));
                hideModal();
              }}>
              <Text>Delete entry</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                hideModal();
              }}>
              <Text>Return</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ScheduleEntryModal;
