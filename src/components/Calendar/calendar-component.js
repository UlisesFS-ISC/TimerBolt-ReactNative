import React from "react";
import {
  Modal
} from "react-native";
import { Calendar } from 'react-native-calendars'; 


const CalendarWrapper = ({ selectedEntry, onSelectingCalendarDay, toggleCalendar, visible}) => {
  return (
    <Modal
    onRequestClose={() =>{}}
    columnFormat='two-column'
    style={{
    padding: 20
    }}
      animationType="slide"
      transparent={false}
      visible={visible}>
         <Calendar
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 350,
              marginTop: '30%'
            }}
            onDayPress={day => {
                      onSelectingCalendarDay(day.timestamp);
                      toggleCalendar(false);
                    }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textMonthFontWeight: 'bold',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
/>
</Modal>
  );
};

export default CalendarWrapper;
