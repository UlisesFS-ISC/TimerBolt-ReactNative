import {
  getEntries,
  insertEntry,
  deleteEntry
} from "../../../services/UserData/timer-entries";
import {serviceCallAlert} from "../../../components/Alert/alert-component";

const timeRecordsGetServiceCall = (token) => {
  return dispatch => {
    dispatch(toggleServiceCallFlag());
    getEntries(token)
      .then(response => {
        dispatch(timeRecordsGetCallFulfilled(response));
      })
      .catch(error => {
        serviceCallAlert(error.message);
        timeRecordsServiceCallFailed(error.message);
      });
  };
};

const timeRecordsGetCallFulfilled = response => {
  return {
    type: "TIME_RECORDS_GET_CALL_FULFILLED",
    response
  };
};

const timeRecordsInsertServiceCall = (
  entryName,
  timeElapsed,
  userName,
  email,
  token
) => {
  return dispatch => {
    insertEntry(entryName, timeElapsed, token)
      .then(response => {
        if (response.data.success) {
          dispatch(
            timeRecordsInsertCallFulfilled({
              name: entryName,
              timeelapsed: timeElapsed,
              dateposted: new Date().toDateString(),
              user: userName,
              email: email
            })
          );
          serviceCallAlert({success: true, msg: 'Activity saved'});
        } else
        serviceCallAlert({success: false, msg: 'Could not save this activity'});
      })
      .catch(error => {
        serviceCallAlert({success: false, msg: error.message});
        timeRecordsServiceCallFailed(error.message);
      });
  };
};

const timeRecordsInsertCallFulfilled = entry => {
  return {
    type: "TIME_RECORDS_INSERT_CALL_FULFILLED",
    entry
  };
};

const timeRecordsDeleteServiceCall = (token, entry) => {
  return dispatch => {
    deleteEntry(token, entry)
      .then(response => {
        if (response.data.success) {
          dispatch(timeRecordsDeleteCallFulfilled(entry.get("name")));
        } 
        serviceCallAlert(response.data)
      })
      .catch(error => {
        serviceCallAlert({success: false, msg: error.message});
        timeRecordsServiceCallFailed(error.message);
      });
  };
};

const timeRecordsDeleteCallFulfilled = entryName => {
  return {
    type: "TIME_RECORDS_DELETE_CALL_FULFILLED",
    entryName
  };
};

const timeRecordsServiceCallFailed = error => {
  return {
    type: "TIME_RECORDS_SERVICE_CALL_FAILED",
    error
  };
};

const toggleServiceCallFlag = () => {
  return {
    type: "TOGGLE_SERVICE_CALL_FLAG"
  };
};

const resetTimeRecords = () => {
  return {
    type: "RESET_TIME_RECORDS"
  };
};

export const timeRecordsActions = {
  timeRecordsGetServiceCall,
  timeRecordsGetCallFulfilled,
  timeRecordsInsertServiceCall,
  timeRecordsInsertCallFulfilled,
  timeRecordsDeleteServiceCall,
  timeRecordsDeleteCallFulfilled,
  timeRecordsServiceCallFailed,
  toggleServiceCallFlag,
  resetTimeRecords
};
