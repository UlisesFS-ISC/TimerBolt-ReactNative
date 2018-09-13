import { connect } from "react-redux";

import { timerActions } from "../../redux/timer/timer/timer-actions";
import Pomodoro from "./pomodoro";

const mapStateToProps = state => {
  return {
    sec: state.Timer.getIn(["pomodoro", "sec"]),
    min: state.Timer.getIn(["pomodoro", "min"]),
    status: state.Timer.getIn(["pomodoro", "status"]),
    pomodoroState: state.Timer.getIn(["pomodoro", "pomodoroState"]),
    productivityRunDuration: state.Timer.getIn([
      "pomodoro",
      "productivityRunDuration"
    ]),
    restRunDuration: state.Timer.getIn(["pomodoro", "restRunDuration"]),
    runs: state.Timer.getIn(["pomodoro", "runs"])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPomodoroState: pomodoroState =>
      dispatch(timerActions.setPomodoroState(pomodoroState)),
    setPomodoroTime: (min, sec) =>
      dispatch(timerActions.setPomodoroTime(min, sec)),
    setPomodoroStatus: status =>
      dispatch(timerActions.setPomodoroStatus(status)),
    setPomodoroRuns: runs => dispatch(timerActions.setPomodoroRuns(runs))
  };
};

const PomodoroContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pomodoro);

export default PomodoroContainer;
