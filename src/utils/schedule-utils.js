import {TAG_COLORS, TAG_ICONS} from './style-constants';


const getRecurrentEntriesForSelectedDay = (userScheduleEntries, day) => {
  let recurrentEntries = userScheduleEntries.filter(entry => {
      if(!entry.get('singleUse')){
        let recurrentDays = entry.get('activeInDays');
        return (recurrentDays.indexOf(day) >= 0)
      } else
      return false;
  });
  return recurrentEntries;
};

const getSingleUseEntriesForSelectedDate = (userScheduleEntries, selectedEntry) => {
  let date = selectedEntry.split(',').pop().trim();
  let singleUseEntries = userScheduleEntries.filter(entry => {
      if(entry.get('singleUse')){
        let scheduledDay = entry.get('scheduledDayTime').split(',')[0].trim();
        return date === scheduledDay;
      } else
      return false;
  });
  return singleUseEntries;
};

const groupEntriesByDate = (userScheduleEntries, selectedEntry) => {
  let groupedEntries = [];
  let day = selectedEntry.split(',')[0].toUpperCase();
  let recurrentEntries = getRecurrentEntriesForSelectedDay(userScheduleEntries, day);
  let singleUseEntries = getSingleUseEntriesForSelectedDate(userScheduleEntries, selectedEntry);
  recurrentEntries.merge(singleUseEntries).forEach(entry => {
  let scheduledTime = entry.get('singleUse') ? entry.get('scheduledDayTime').split(',').pop().trim() : entry.get('scheduledDayTime').trim();
    groupedEntries.push({
        uuid: entry.get('uuid'),
        time: scheduledTime, 
        title: entry.get('scheduleEntryName'), 
        description: entry.get('scheduleEntryDescription'),
        lineColor:TAG_COLORS[entry.get('activityTag','LEISURE')], 
        icon: TAG_ICONS[entry.get('activityTag', 'LEISURE')],

    });
  });
  groupedEntries =  groupedEntries.sort((entry1, entry2) => {
    let scheduleTime1 = entry1.time;
    let scheduleTime2 = entry2.time;
    let dayTimeIndicator1 = scheduleTime1.split(' ').pop();
    let dayTimeIndicator2 = scheduleTime2.split(' ').pop();
    let taskHour1 = scheduleTime1.split(':')[0];
    let taskHour2 = scheduleTime2.split(':')[0];
    if(dayTimeIndicator1 !== dayTimeIndicator2){
      return dayTimeIndicator1 > dayTimeIndicator2;
    } else if(taskHour1 !== taskHour2){
      return Number(taskHour1) > Number(taskHour2);
    } 
  });
  return groupedEntries;
};

export  {
  groupEntriesByDate
}