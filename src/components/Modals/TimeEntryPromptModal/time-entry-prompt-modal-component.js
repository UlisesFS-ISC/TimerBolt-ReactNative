import React from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  Picker,
  View,
} from 'react-native';
import { CheckBox, Item, Label, Input } from 'native-base';

import { ACTIVITY_TAG_CONSTANTS } from '../../../utils/schedule-constants';
import getModalStyles from '../modal-styles';

const modalStyles = getModalStyles();

export default class TimeEntryPromptModal extends React.Component {
  static TypeTagPicker = ({ activityTag, setActivityTag }) => {
    const pickerItems = [];
    ACTIVITY_TAG_CONSTANTS.forEach(activity => {
      pickerItems.push(<Picker.Item label={activity} value={activity} key={activity} />);
    });
    return (
      <View style={[modalStyles.modalFormRow, {flexGrow: 4}]}>
        <Item>
          <Label>Set activity type:</Label>
        </Item>
        <Picker
          selectedValue={activityTag}
          style={{ width: 150 }}
          onValueChange={(itemValue, itemIndex) =>
            setActivityTag(itemValue)
          }>
          {pickerItems}
        </Picker>
      </View>
    );
  };

  setActivityTag = value => {
    this.setState({
      activityTag: value,
    });
  };

  setEntryName = value => {
    this.setState({
      timeEntryName: value,
    });
  };

  constructor() {
    super();
    this.state = {
      timeEntryName: "NA",
      activityTag: 'LEISURE'
    };
  }

  render() {
    let {
      timerType,
      visible,
      toggleModal,
      insertEntry,
      timeElapsed,
    } = this.props;
    let { TypeTagPicker } = TimeEntryPromptModal;
    let { timeEntryName, activityTag } = this.state;
    let { setActivityTag, setEntryName } = this;
    return (
      <View style={modalStyles.overlay}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {}}>
          <View style={modalStyles.modalContainer}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalHeaderText}>
                Want to save this time entry?
              </Text>
            </View>
            <View style={modalStyles.modalFormColumn}>
              <Label>Time elapsed: {timeElapsed}</Label>
            </View>
            <View style={modalStyles.modalFormRow}>
              <Label>Timer type: {timerType}</Label>
            </View>
            <View style={modalStyles.modalFormRow}>
              <Item rounded style={modalStyles.modalInputFieldContainer}>
                <Input
                  placeholder="Enter time entry title"
                  onChangeText={setEntryName}
                />
              </Item>
            </View>
            <TypeTagPicker
              activityTag={activityTag}
              setActivityTag={setActivityTag}
            />
            <View style={modalStyles.modalNavigationActions}>
              <TouchableHighlight
                onPress={() => {
                  insertEntry({timeEntryName, timeElapsed, activityTag, timerType});
                  toggleModal(false);
                }}>
                <Text>Save</Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  toggleModal(false);
                }}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
