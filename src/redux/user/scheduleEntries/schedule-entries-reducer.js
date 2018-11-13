import { Map, fromJS } from "immutable";
import moment from 'moment';

const initialState = fromJS({
  entries: new Map(),
  selectedDay: `${moment().format('dddd')}, ${moment().format('MMMM Do YYYY')}`,
  scheduleEntriesError: false,
  serviceCallFlag: false
});

const ScheduleEntriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SCHEDULE_SELECTED_DAY": {
      let { date } = action;
      return state.set("selectedDay", `${moment(date).add(1,'days').format('dddd')}, ${moment(date).add(1,'days').format('MMMM Do YYYY')}`);
    }
    case "SCHEDULE_ENTRIES_GET_CALL_FULFILLED": {
      let { entries } = action.response.data;
      let stateEntries = new Map();
      entries.forEach(scheduleRecord => {
        let formatedRecord = fromJS(scheduleRecord);
        stateEntries = stateEntries.set(formatedRecord.get("uuid"), formatedRecord);
      });
      return state.set("entries", stateEntries);
    }
    case "SCHEDULE_ENTRIES_DELETE_CALL_FULFILLED": {
      let { uuid } = action;
      return state.deleteIn(['entries',uuid]);
    }
    case "SCHEDULE_ENTRIES_INSERT_CALL_FULFILLED": {
      let entry = fromJS(action.entry);
      return state.setIn(["entries", entry.get("uuid", 'NA')], entry);
    }
    case "SCHEDULE_ENTRIES_SERVICE_CALL_FAILED": {
      let { error } = action;
      return state.set("scheduleEntriesError", error);
    }
    case "SET_SERVICE_CALL_FLAG": {
      return state.set("serviceCallFlag", action.value);
    }
    case "RESET_SCHEDULE_ENTRIES": {
      return initialState;
    }
    default:
      return state;
  }
};

export default ScheduleEntriesReducer;
