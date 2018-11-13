import { Map, fromJS } from "immutable";

const initialState = fromJS({
  entries: new Map(),
  serviceCallFlag: false,
  timeRecordsError: false
});

const TimeRecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIME_RECORDS_GET_CALL_FULFILLED": {
       let { entries } = action.response.data;
      let stateEntries = state.get('entries');
      entries.forEach(timeRecord => {
        stateEntries = stateEntries.set(timeRecord["uuid"], fromJS(timeRecord));
      });
      return state.set("entries", stateEntries);
    }
    case "TIME_RECORDS_DELETE_CALL_FULFILLED": {
      let { uuid } = action;
      return state.deleteIn(["entries", uuid]);
    }
    case "TIME_RECORDS_INSERT_CALL_FULFILLED": {
      let entry  = fromJS(action.entry);
      return state.setIn(["entries", entry.get('uuid')], entry);
    }
    case "TIME_RECORDS_SERVICE_CALL_FAILED": {
      let { error } = action;
      return state.set("timeRecordsError", error);
    }
    case "SET_SERVICE_CALL_FLAG": {
      let {value} = action;
      return state.set("serviceCallFlag", value);
    }
    case "RESET_TIME_RECORDS": {
      return initialState;
    }
    default:
      return state;
  }
};

export default TimeRecordsReducer;
