import { combineReducers } from "redux";

import UserInfo from "./userInfo/user-info-reducer";
import TimeRecords from "./timeRecords/time-records-reducer";
import ScheduleEntries from "./scheduleEntries/schedule-entries-reducer";

const UserReducer = combineReducers({
  UserInfo,
  TimeRecords,
  ScheduleEntries
});

export default UserReducer;
