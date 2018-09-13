import { combineReducers } from "redux";

import Timer from "./timer/timer/timer-reducer";
import User from "./user/user-reducer";

const MainReducer = combineReducers({
  Timer,
  User
});

export default MainReducer;
