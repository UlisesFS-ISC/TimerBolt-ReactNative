import { connect } from "react-redux";

import { timerActions } from "../../redux/timer/timer/timer-actions";
import { timeRecordsActions } from "../../redux/user/timeRecords/time-records-actions";
import Timer from "./timer";

const mapStateToProps = state => {
  return {
    countdown: state.Timer.get("countdown"),
    chronometer: state.Timer.get("chronometer"),
    userName: state.User.UserInfo.get("userName"),
    email: state.User.UserInfo.get("email"),
    token: state.User.UserInfo.get("token")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChronometer: (hour, min, sec) =>
    dispatch(timerActions.setChronometer(hour, min, sec)),
    setCountdown: (hour, min, sec) =>
    dispatch(timerActions.setCountdown(hour, min, sec)),
    setTimerStatus: (status, mode) => dispatch(timerActions.setTimerStatus(status, mode)),
    timeRecordsInsertServiceCall: (
      entryName,
      timeElapsed,
      userName,
      email,
      token
    ) =>
      dispatch(
        timeRecordsActions.timeRecordsInsertServiceCall(
          entryName,
          timeElapsed,
          userName,
          email,
          token
        )
      )
  };
};

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);

export default TimerContainer;
