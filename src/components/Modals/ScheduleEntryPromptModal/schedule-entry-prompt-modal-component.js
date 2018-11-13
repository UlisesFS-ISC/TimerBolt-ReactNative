import React from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
   View,
   ScrollView,
   Picker
} from "react-native";
import icons from "react-native-vector-icons";
import { CheckBox,
Item,
 Label,
  Input,
  Button
   } from 'native-base';
   import moment from 'moment';

import {DAY_CONSTANTS, ACTIVITY_TAG_CONSTANTS} from '../../../utils/schedule-constants';
import Calendar from '../../Calendar/calendar-component';

import getModalStyles from '../modal-styles';

const modalStyles = getModalStyles();


export default class ScheduleEntryPromptModal extends React.Component {

  

static RecurrentDaySection = ({setDays, checkedDays, singleUse, calendarDate, toggleCalendar}) => {
  if (singleUse) {
    return (
        <View style={[modalStyles.modalFormColumn , {width: 200}]}>
        <Item>
            <Label>Current selection: {calendarDate}</Label>
        </Item>
        <Item>
          <Button block  success onPress={() => 
            toggleCalendar(true)
          }><Text> Select Date </Text></Button>
        </Item>
      </View>
  );
  } else {
  let checkBoxColumns = [];
  DAY_CONSTANTS.forEach(day => {
    let isInArray = (checkedDays.indexOf(day) > -1);
    checkBoxColumns.push(
       <Item key={day} style={modalStyles.modalCheckBoxGroupItem}>
          <CheckBox
              color="green"
              checked={isInArray}
              onPress={() => setDays(day, isInArray)}
            />
            <Label>{day}</Label>
      </Item>
      )
  });
  return (
        <View style={[modalStyles.modalFormColumn , {width: 200}]}>
         <Item>
          <Label>Set task days:</Label>
      </Item>
       {checkBoxColumns}
      </View>

  );
  }
};

static TypeTagPicker = ({activityTag, setActivityTag}) => {
  const pickerItems = [];
  ACTIVITY_TAG_CONSTANTS.forEach(activity => {
    pickerItems.push(
      <Picker.Item label={activity} value={activity} key={activity} />
    );
  });
  return (
    <View style={modalStyles.modalFormColumn}>
      <Item>
          <Label>Set task type:</Label>
      </Item>
       <Picker
        selectedValue={activityTag}
        style={{ width: 150 }}
        onValueChange={(itemValue) => setActivityTag(itemValue)}>
        {pickerItems}
      </Picker>
    </View>
  );
};

static ActivityNameDescriptionFields= ({name, setName, description, setDescription}) => {
  return (
    <View style={modalStyles.modalFormTextInputs}>
         <Item rounded style={modalStyles.modalInputFieldContainer}>
              <Input placeholder="Enter task title" onChangeText={setName}/>
            </Item>
            <Item rounded style={modalStyles.modalInputFieldContainer} last>
               <Input placeholder="Enter task description" onChangeText={setDescription}/>
            </Item>
    </View>
  );
};

static DayTimeInputFields = ({hour, setHour, min, setMin, dayTime, setDayTime}) => {
  return (
    <View style={modalStyles.modalFormRow}>
      <Item>
          <Label>Set time:</Label>
      </Item>
         <Item rounded style={[modalStyles.modalInputFieldContainer, {width: 50}]}>
              <Input placeholder="HH" onChangeText={setHour} />
            </Item>
            <Item rounded style={[modalStyles.modalInputFieldContainer, {width: 50}]} last>
               <Input placeholder="MM" onChangeText={setMin}/>
            </Item>
            <Item>
            <CheckBox
            color="green"
            checked={dayTime === 'am'}
            onPress={()=>setDayTime('am')}
          />
          <Label> - am</Label>
          <CheckBox
          color="green"
          checked={dayTime === 'pm'}
          onPress={()=>setDayTime('pm')}
        />
        <Label> - pm</Label>
      </Item>
    </View>
  );
};

setName = value => {
  this.setState({
  name: value
  });
}

setDescription = value => {
  this.setState({
  description: value
  });
}

setHour = value => {
  this.setState({
  hour: value
  });
}

setMin = value => {
  this.setState({
  min: value
  });
}

setDays = (day, isInArray) => {
  let newCheckedDays = this.state.checkedDays;
  if (isInArray) {newCheckedDays = newCheckedDays.filter(checkedDay => checkedDay !== day);} else {newCheckedDays.push(day);}
  this.setState({
    checkedDays: newCheckedDays
  });
}

setActivityTag = value => {
  this.setState({
    activityTag: value
  });
}

setCalendarDate = value => {
  this.setState({
  calendarDate: moment(value).add(1,'days').format('MMMM Do YYYY') 
  });
}

setDayTime = value => {
  this.setState({
  dayTime: value
  });
}

setSingleUseFlag = value => {
  this.setState({
    singleUse: value
  });
}

toggleCalendar = value => {
  this.setState({
    calendarFlag: value
  });
}

constructor(props) {
    super();
    this.state = {
      name: 'NA',
      description: 'NA',
      hour: '12',
      min:'00',
      dayTime: 'am',
      checkedDays: [],
      singleUse: true,
      calendarDate: moment().format('MMMM Do YYYY'),
      activityTag: 'PRODUCTIVITY',
      calendarFlag: false
    }
  }

  render(){
    let {ActivityNameDescriptionFields, DayTimeInputFields, RecurrentDaySection, TypeTagPicker} = ScheduleEntryPromptModal;
    let { onSubmit, toggleEntryPromptModal, visible } = this.props
    let {
      name,
      description,
      hour,
      min,
      dayTime,
      checkedDays,
      singleUse,
      calendarDate,
      activityTag,
      calendarFlag
    } = this.state;
    let calendar=(<Calendar 
      onSelectingCalendarDay={this.setCalendarDate}
      toggleCalendar={this.toggleCalendar}
      selectedDay={''} 
      visible={calendarFlag}/>);
    return (
    <View style={modalStyles.overlay}>
    {calendar}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() =>{}}
        >
        <ScrollView style={modalStyles.largeModalContainer}>
        <View style={modalStyles.modalHeader}>
         <Text style={modalStyles.modalHeaderText}>Create a new schedule task</Text>
        </View>
        <ActivityNameDescriptionFields name={name} setName={this.setName} description={description} setDescription={this.setDescription} />
        <DayTimeInputFields hour={hour} setHour={this.setHour} min={min} setMin={this.setMin} dayTime={dayTime} setDayTime={this.setDayTime}/>
        <View style={modalStyles.modalFormRow}>
        <Label>Set as non recurrent task:</Label>
         <CheckBox
              color="green"
              checked={singleUse}
              onPress={() => this.setSingleUseFlag(!singleUse)}
            />
        </View>
        <View style={modalStyles.modalFormRow}>
           <RecurrentDaySection checkedDays={checkedDays} setDays={this.setDays} calendarDate={calendarDate} toggleCalendar={this.toggleCalendar} singleUse={singleUse} />
           <TypeTagPicker activityTag={activityTag} setActivityTag={this.setActivityTag}/>
          </View>
                  <View style={modalStyles.modalNavigationActions}>
                    <TouchableHighlight
                      onPress={() => {
                        onSubmit({ scheduleEntryName: name,
                          scheduleEntryDescription: description,
                          activityTag: activityTag,
                          singleUse: singleUse,
                          scheduledDayTime: 
                            singleUse ? `${calendarDate}, ${hour}:${min} ${dayTime}` : `${hour}:${min} ${dayTime}`,
                          activeInDays: checkedDays
                        });
                        toggleEntryPromptModal(false);
                      }}>
                      <Text style={modalStyles.modalBoldText}>Create task</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => {
                        toggleEntryPromptModal(false);
                      }}>
                      <Text style={modalStyles.modalBoldText}>Return</Text>
                    </TouchableHighlight>
                </View>
        </ScrollView>
      </Modal>
    </View>
  );
  }
}
