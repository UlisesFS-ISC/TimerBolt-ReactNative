import { connect } from "react-redux";
import {Actions} from 'react-native-router-flux';

import { timeRecordsActions } from "../../../redux/user/timeRecords/time-records-actions";
import { scheduleEntriesActions } from "../../../redux/user/scheduleEntries/schedule-entries-actions";
import { userInfoActions } from "../../../redux/user/userInfo/user-info-actions";
import UserPanel from "./user-panel";

const mapStateToProps = state => {
  return {
    userName: state.User.UserInfo.get("userName"),
    token: state.User.UserInfo.get("token")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
        dispatch(timeRecordsActions.resetTimeRecords());
      dispatch(scheduleEntriesActions.resetScheduleEntries());
      dispatch(userInfoActions.resetUserInfo());
      Actions.SignIn();
    }
  };
};

const UserPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);

export default UserPanelContainer;
