import { connect } from "react-redux";
import {Actions} from 'react-native-router-flux';

import { timeRecordsActions } from "../../../redux/user/timeRecords/time-records-actions";
import { userInfoActions } from "../../../redux/user/userInfo/user-info-actions";
import TimerEntries from "./timer-entries";

const mapStateToProps = state => {
  return {
    entries: state.User.TimeRecords.get("entries"),
    token: state.User.UserInfo.get("token"),
    serviceCallFlag: state.User.TimeRecords.get("serviceCallFlag")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEntries: token =>
      dispatch(timeRecordsActions.timeRecordsGetServiceCall(token)),
    deleteEntry: (token, entry) =>
      dispatch(timeRecordsActions.timeRecordsDeleteServiceCall(token, entry)),
    logOut: () => {
      dispatch(timeRecordsActions.resetTimeRecords());
      dispatch(userInfoActions.resetUserInfo());
      Actions.SignIn();
    }
  };
};

const TimerEntriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerEntries);

export default TimerEntriesContainer;
