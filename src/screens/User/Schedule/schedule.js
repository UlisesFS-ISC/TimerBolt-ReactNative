
import React, { Component } from "react";
import {Actions} from 'react-native-router-flux';
import {
  StyleSheet,
  View,
} from "react-native";
import { Map } from "immutable";
import {Header, Left, Body, Button, Right, Icon, Title} from 'native-base';

import getScreenStyles from "../../screen-styles";
import SpinnerScreen from "../../../components/SpinnerScreen/spinner-screen-component";
import ScheduleEntryModal from '../../../components/Modals/ScheduleEntryModal/schedule-entry-modal-component';
import ScheduleEntryPromptModal from "../../../components/Modals/ScheduleEntryPromptModal/schedule-entry-prompt-modal-component";
import Calendar from "../../../components/Calendar/calendar-component";
import Timeline from "../../../components/DaySchedule/day-schedule-component";

const screenStyles = getScreenStyles();

const styles = StyleSheet.create({
  scheduleContainer: {
    flex: 1,
    backgroundColor:'white',
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24
  },
  iconButton: {
    fontSize: 32,
     color: 'white'
  }
});

export default class Schedule extends Component {


static ScheduleHeader({toggleCalendar, toggleEntryPromptModal}){
  return (<Header style={screenStyles.header}>
        <Left>
          <Button transparent
          onPress={Actions.UserPanel}>
            <Icon name='arrow-back' style={styles.iconButton}/>
          </Button>
        </Left>
        <Body>
          <Title>Schedule</Title>
        </Body>
        <Right>
           <Button transparent onPress={() => {
            toggleCalendar(true);
            }}>
            <Icon name='calendar' style={styles.iconButton}/>
          </Button>
          <Button transparent onPress={() => {
            toggleEntryPromptModal(true);
            }}>
            <Icon type="FontAwesome" name='plus' style={styles.iconButton}/>
          </Button>
        </Right>
      </Header>);
}

  constructor() {
    super();
    this.state = {
      selectedEntry: new Map(),
      calendarVisible: false,
      promptModalVisible: false,
      selectionModalVisible: false
    };
  }

  async componentWillMount() {
    let { getEntries, token } = this.props;
    await getEntries(token);
  }

  toggleEntryPromptModal = value => {
    this.setState({
      promptModalVisible: value
    });
  };

  toggleCalendar = value => {
    this.setState({
      calendarVisible: value
    });
  };

  setSelectedEntryModal = data => {
    
    if(data)
     {
      let modalEntry = this.props.entries.get(data.uuid, new Map());
      this.setState({
        selectedEntry: modalEntry,
        selectionModalVisible: true
      });
     } else {
      this.setState({
        selectedEntry: new Map(),
        selectionModalVisible: false
      });
     }
  };


  render() {
    let {
      insertScheduleEntry,
      deleteEntry,
      serviceCallFlag,
      setScheduleSelectedDay,
      entries,
      selectedDay,
      token
    } = this.props;
    let { promptModalVisible, calendarVisible, selectedEntry, selectionModalVisible } = this.state;
    let { toggleEntryPromptModal, toggleCalendar, setSelectedEntryModal } = this;
    let {ScheduleHeader } = Schedule;
    let emptyView = <View/>;
    if (!serviceCallFlag) {
      return (
        <SpinnerScreen  />
      );
    }
    let selectionModal=(<ScheduleEntryModal 
      modalEntry={selectedEntry}
      deleteEntry={deleteEntry(token)} 
      hideModal={() => setSelectedEntryModal()} 
      visible={selectionModalVisible}
    />);
    let insertionModal=(<ScheduleEntryPromptModal
        onSubmit={insertScheduleEntry(token)}
        visible={promptModalVisible}
        toggleEntryPromptModal={toggleEntryPromptModal}
        />);
    let calendar=(<Calendar 
      onSelectingCalendarDay={setScheduleSelectedDay}
      toggleCalendar={toggleCalendar}
      selectedDay={selectedDay} 
      visible={calendarVisible}/>);
    let daySchedule = <Timeline 
            userScheduleEntries={entries}
            selectedDay={selectedDay}
            setSelectedEntryModal={setSelectedEntryModal}
          />;
    return (
        <View style={styles.scheduleContainer}>
        {!selectionModalVisible ? emptyView : selectionModal}
        {!promptModalVisible ? emptyView : insertionModal}
        {calendar}
        <ScheduleHeader toggleEntryPromptModal={toggleEntryPromptModal} toggleCalendar={toggleCalendar}/>
        {(!calendarVisible ? daySchedule : emptyView)}
        </View>
    );
  }
}

