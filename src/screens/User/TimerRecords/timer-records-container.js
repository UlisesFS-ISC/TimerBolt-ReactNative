import { connect } from "react-redux";

import { timeRecordsActions } from "../../../redux/user/timeRecords/time-records-actions";
import TimeRecords from "./timer-records";

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
    deleteEntry: token => uuid =>
      dispatch(timeRecordsActions.timeRecordsDeleteServiceCall(token, uuid)),
  };
};

const TimeRecordsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeRecords);

export default TimeRecordsContainer;
