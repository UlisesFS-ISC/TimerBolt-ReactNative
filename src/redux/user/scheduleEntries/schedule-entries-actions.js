import {
  getEntries,
  insertEntry,
  deleteEntry
} from "../../../services/UserData/schedule-entries";
import {showToast} from "../../../utils/toast-utils";

const setScheduleSelectedDay = date => {
  return {
    type: "SET_SCHEDULE_SELECTED_DAY",
    date
  };
};

const scheduleEntriesGetServiceCall = token => {
  return dispatch => {
    dispatch(setServiceCallFlag(false));
    getEntries(token)
      .then(response => {
        dispatch(scheduleEntriesGetCallFulfilled(response));
        dispatch(setServiceCallFlag(true));
      })
      .catch(error => {
        showToast({error});
        dispatch(setServiceCallFlag(true));
      });
  };
};

const scheduleEntriesGetCallFulfilled = response => {
  return {
    type: "SCHEDULE_ENTRIES_GET_CALL_FULFILLED",
    response
  };
};

const scheduleEntriesInsertServiceCall = (
  token,
  entry
) => {
  return dispatch => {
    dispatch(setServiceCallFlag(false));

    insertEntry(token, entry)
      .then(response => {
        let { success, msg } = response.data;
        if (success) {
          dispatch(
            scheduleEntriesInsertCallFulfilled(response.data.entry)
          );
        } 
          showToast({success, message: msg});
        dispatch(setServiceCallFlag(true));
      })
      .catch(error => {
        showToast({error});
        dispatch(setServiceCallFlag(true));
      });
  };
};

const scheduleEntriesInsertCallFulfilled = entry => {
  return {
    type: "SCHEDULE_ENTRIES_INSERT_CALL_FULFILLED",
    entry
  };
};

const scheduleEntriesDeleteServiceCall = (token, uuid) => {
  return dispatch => {
    dispatch(setServiceCallFlag(false));
    deleteEntry(token, uuid)
      .then(response => {
        let { success, msg } = response.data;
        if (success) {
          dispatch(scheduleEntriesDeleteCallFulfilled(uuid));
          dispatch(setServiceCallFlag(true));
        } else {
          dispatch(setServiceCallFlag(true));
        }
        showToast({success, message: msg});
      })
      .catch(error => {
        showToast({error});
        dispatch(setServiceCallFlag(true));
      });
  };
};

const scheduleEntriesDeleteCallFulfilled = uuid => {
  return {
    type: "SCHEDULE_ENTRIES_DELETE_CALL_FULFILLED",
    uuid
  };
};

const scheduleEntriesServiceCallFailed = error => {
  return {
    type: "SCHEDULE_ENTRIES_SERVICE_CALL_FAILED",
    error
  };
};

const setServiceCallFlag = value => {
  return {
    type: "SET_SERVICE_CALL_FLAG",
    value
  };
};

const resetScheduleEntries = value => {
  return {
    type: "SET_SERVICE_CALL_FLAG",
    value
  };
};

export const scheduleEntriesActions = {
  setScheduleSelectedDay,
  scheduleEntriesGetServiceCall,
  scheduleEntriesGetCallFulfilled,
  scheduleEntriesInsertServiceCall,
  scheduleEntriesInsertCallFulfilled,
  scheduleEntriesDeleteServiceCall,
  scheduleEntriesDeleteCallFulfilled,
  scheduleEntriesServiceCallFailed,
  resetScheduleEntries,
  setServiceCallFlag
};
