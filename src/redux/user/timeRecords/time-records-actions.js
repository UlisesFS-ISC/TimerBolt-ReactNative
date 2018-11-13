import {
  getEntries,
  insertEntry,
  deleteEntry
} from "../../../services/UserData/time-records";
import {showToast} from "../../../utils/toast-utils";

const timeRecordsGetServiceCall = (token) => {
  return dispatch => {
    dispatch(setServiceCallFlag(false));
    getEntries(token)
      .then(response => {
        dispatch(timeRecordsGetCallFulfilled(response));
        dispatch(setServiceCallFlag(true));
      })
      .catch(error => {
        serviceCallAlert(error.message);
        timeRecordsServiceCallFailed(error.message);
        dispatch(setServiceCallFlag(true));
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
  token,
  entry
) => {
  return dispatch => {
    insertEntry(token, entry)
      .then(response => {
        if (response.data.success) {
          dispatch(
            timeRecordsInsertCallFulfilled(response.data.entry)
          );
        showToast({success: true, message: 'Activity saved'});
        } else
        showToast({success: false, message: 'Could not save this activity'});
      })
      .catch(error => {
        showToast({error});
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

const timeRecordsDeleteServiceCall = (token, uuid) => {
  return dispatch => {
    dispatch(setServiceCallFlag(false));
    deleteEntry(token, uuid)
      .then(response => {
        if (response.data.success) {
          dispatch(setServiceCallFlag(true));
          dispatch(timeRecordsDeleteCallFulfilled(uuid));
          showToast({success: true, message: 'Activity deleted'});
        } else {
          showToast({success: false, message: 'Activity cant be deleted'});
        }
      })
      .catch(error => {
        dispatch(setServiceCallFlag(true));
        showToast({error});
        serviceCallAlert({success: false, msg: error.message});
        timeRecordsServiceCallFailed(error.message);
      });
  };
};

const timeRecordsDeleteCallFulfilled = uuid => {
  return {
    type: "TIME_RECORDS_DELETE_CALL_FULFILLED",
    uuid
  };
};

const timeRecordsServiceCallFailed = error => {
  return {
    type: "TIME_RECORDS_SERVICE_CALL_FAILED",
    error
  };
};

const setServiceCallFlag = value => {
  return {
    type: "SET_SERVICE_CALL_FLAG",
    value
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
  setServiceCallFlag,
  resetTimeRecords
};
