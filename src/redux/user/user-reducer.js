import { combineReducers } from "redux";

import UserInfo from "./userInfo/user-info-reducer";
import TimeRecords from "./timeRecords/time-records-reducer";

const UserReducer = combineReducers({
  UserInfo,
  TimeRecords
});

export default UserReducer;
