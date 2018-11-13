import React from "react";
import { connect } from "react-redux";

import { scheduleEntriesActions } from "../../../redux/user/scheduleEntries/schedule-entries-actions";
import Schedule from "./schedule";

const mapStateToProps = state => {
  return {
    entries: state.User.ScheduleEntries.get("entries"),
    selectedDay: state.User.ScheduleEntries.get("selectedDay"),
    token: state.User.UserInfo.get("token"),
    serviceCallFlag: state.User.ScheduleEntries.get("serviceCallFlag")
  };
};

const mapDispatchToProps = dispatch => {
  return {
      setScheduleSelectedDay: date => dispatch(
        scheduleEntriesActions.setScheduleSelectedDay(date)
      ),
    getEntries: token =>
      dispatch(scheduleEntriesActions.scheduleEntriesGetServiceCall(token)),
    insertScheduleEntry: token => entry =>
      dispatch(
        scheduleEntriesActions.scheduleEntriesInsertServiceCall(token, entry)
      ),
    deleteEntry: token => uuid =>
      dispatch(
        scheduleEntriesActions.scheduleEntriesDeleteServiceCall(token, uuid)
      )
  };
};

const ScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);

export default ScheduleContainer;
