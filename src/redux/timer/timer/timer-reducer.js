import { fromJS } from "immutable";

const POMODORO_STANDARD_RUN_VALUES = {
  PRODUCTIVITY: 25,
  REST: 5
};

const POMODORO_STATES = {
  PRODUCTIVITY: "PRODUCTIVITY",
  REST: "REST"
};

const TIMER_MODES = {
  COUNTDOWN: "COUNTDOWN",
  CHRONOMETER: "CHRONOMETER",
  POMODORO: "POMODORO"
};

const TIMER_STATUS = {
  STOPPED: "STOPPED",
  PAUSED: "PAUSED",
  STARTED: "STARTED"
};

const initialState = fromJS({
  chronometer: {
    status: TIMER_STATUS.STOPPED,
    hour: 0,
    min: 0,
    sec: 0
  },
  countdown: {
    status: TIMER_STATUS.STOPPED,
    hour: 0,
    min: 0,
    sec: 0
  },
  pomodoro: {
    status: TIMER_STATUS.STOPPED,
    pomodoroState: POMODORO_STATES.PRODUCTIVITY,
    productivityRunDuration: POMODORO_STANDARD_RUN_VALUES.PRODUCTIVITY,
    restRunDuration: POMODORO_STANDARD_RUN_VALUES.REST,
    min: 0,
    sec: 0,
    runs: 0
  }
});

const TimerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHRONOMETER_SET_STATUS": {
      let { status } = action;
      return state.setIn(["chronometer", "status"], status);
    }
    case "CHRONOMETER_SET_TIME": {
      let { hour, min, sec } = action;
      let newHour = hour >= 0 ? hour : state.getIn(["chronometer", "hour"]);
      let newMin = min >= 0 ? min : state.getIn(["chronometer", "min"]);
      let newSec = sec >= 0 ? sec : state.getIn(["chronometer", "sec"]);
      return state
        .setIn(["chronometer", "hour"], newHour)
        .setIn(["chronometer", "min"], newMin)
        .setIn(["chronometer", "sec"], newSec);
    }
    case "COUNTDOWN_SET_STATUS": {
      let { status } = action;
      return state.setIn(["countdown", "status"], status);
    }
    case "COUNTDOWN_SET_TIME": {
      let { hour, min, sec } = action;
      let newHour = hour >= 0 ? hour : state.getIn(["countdown", "hour"]);
      let newMin = min >= 0 ? min : state.getIn(["countdown", "min"]);
      let newSec = sec >= 0 ? sec : state.getIn(["countdown", "sec"]);
      return state
        .setIn(["countdown", "hour"], newHour)
        .setIn(["countdown", "min"], newMin)
        .setIn(["countdown", "sec"], newSec);
    }
    case "POMODORO_SET_STATE": {
      let { pomodoroState } = action;
      return state.setIn(["pomodoro", "pomodoroState"], pomodoroState);
    }

    case "POMODORO_SET_TIME": {
      let { sec, min } = action;
      let newMin = min >= 0 ? min : state.getIn(["pomodoro", "min"]);
      let newSec = sec >= 0 ? sec : state.getIn(["pomodoro", "sec"]);
      return state
        .setIn(["pomodoro", "min"], newMin)
        .setIn(["pomodoro", "sec"], newSec);
    }
    case "POMODORO_SET_STATUS": {
      let { status } = action;
      return state.setIn(["pomodoro", "status"], status);
    }
    case "POMODORO_SET_RUNS": {
      let { runs } = action;
      return state.setIn(["pomodoro", "runs"], runs);
    }
    default:
      return state;
  }
};

export default TimerReducer;
