import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import {Map} from 'immutable';
import Timeline from 'react-native-timeline-listview';
import moment from 'moment';

import ScheduleEntryModal from '../Modals/ScheduleEntryModal/schedule-entry-modal-component';
import {groupEntriesByDate} from '../../utils/schedule-utils';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 15,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
  title:{
    fontSize:16,
    fontWeight: 'bold'
  },
  timeContainerStyle: {
    minWidth:52, 
    marginTop: -5
  },
  timeStyle: {
    textAlign: 'center', 
    backgroundColor:'#ff9797',
    color:'white',
    padding:5, borderRadius:13
  },
  detailContainerStyle: {
    marginBottom: 20, 
    paddingLeft: 5, 
    paddingRight: 5, 
    backgroundColor: "#BBDAFF", 
    borderRadius: 10
  },
  descriptionStyle:{
    color: 'gray'
  }
});

export default class DaySchedule extends Component {
  constructor(){
    super()
    this.state = {
      selectedEntry: null,
      data: []
    }
  } 

  onEventPress = (data) => {
    this.setState({selectedEntry: data})
  }


  async componentWillMount(){
    let {userScheduleEntries, selectedDay} = this.props;
    await this.setState({data: groupEntriesByDate(userScheduleEntries, selectedDay)})
  }

   async componentWillUpdate(nextProps){
     let {userScheduleEntries, selectedDay} = this.props;
    
    if(nextProps.selectedDay !== selectedDay){
      await this.setState({data: groupEntriesByDate(userScheduleEntries, selectedDay)})
    } 
  }

  render() {
    let {selectedEntry, data} = this.state
    let {userScheduleEntries, setSelectedEntryModal} = this.props;
    return (
      <View style={styles.container}>
      <Text style={styles.title}>{this.props.selectedDay}</Text>
        <Timeline 
          style={styles.list}
          data={data}
          circleSize={25}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={styles.timeContainerStyle}
          timeStyle={styles.timeStyle}
          descriptionStyle={styles.descriptionStyle}
          options={{
            style:{paddingTop:5}
          }}
          innerCircle={'icon'}
          onEventPress={setSelectedEntryModal}                    
          separator={false}
          detailContainerStyle={styles.detailContainerStyle}
          columnFormat='two-column'
        />
      </View>
    );
  }
}
