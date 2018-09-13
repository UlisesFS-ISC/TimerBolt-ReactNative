import { Map, fromJS } from "immutable";

const initialState = fromJS({
  entries: new Map(),
  serviceCallFlag: false,
  timeRecordsError: false
});

const TimeRecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIME_RECORDS_GET_CALL_FULFILLED": {
      let { msg } = action.response.data;
      let entries = new Map();
      msg.forEach(timeRecord => {
        let formatedRecord = fromJS(timeRecord);
        entries = entries.set(formatedRecord.get("name"), formatedRecord);
      });
      return state.set("entries", entries);
    }
    case "TIME_RECORDS_DELETE_CALL_FULFILLED": {
      let { entryName } = action;
      return state.deleteIn(["entries", entryName]);
    }
    case "TIME_RECORDS_INSERT_CALL_FULFILLED": {
      let { entry } = action;
      return state.setIn(["entries", entry.name], fromJS(entry));
    }
    case "TIME_RECORDS_SERVICE_CALL_FAILED": {
      let { error } = action;
      return state.set("timeRecordsError", error);
    }
    case "TOGGLE_SERVICE_CALL_FLAG": {
      let toggledFlag = !state.get("serviceCallFlag");
      return state.set("serviceCallFlag", toggledFlag);
    }
    case "RESET_TIME_RECORDS": {
      return initialState;
    }
    default:
      return state;
  }
};

export default TimeRecordsReducer;
