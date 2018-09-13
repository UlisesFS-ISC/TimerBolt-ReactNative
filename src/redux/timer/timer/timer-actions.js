const setTimerStatus = (status, mode) => {
  let type = mode === 'CHRONOMETER' ? "CHRONOMETER_SET_STATUS" : "COUNTDOWN_SET_STATUS"
  return {
    type,
    status
  };
};

const setChronometer = (hour, min, sec) => {
  return {
    type: "CHRONOMETER_SET_TIME",
    hour,
    min,
    sec
  };
};

const setCountdown = (hour, min, sec) => {
  return {
    type: "COUNTDOWN_SET_TIME",
    hour,
    min,
    sec
  };
};

const setPomodoroState = pomodoroState => {
  return {
    type: "POMODORO_SET_STATE",
    pomodoroState
  };
};

const setPomodoroTime = (min, sec) => {
  return {
    type: "POMODORO_SET_TIME",
    min,
    sec
  };
};

const setPomodoroStatus = status => {
  return {
    type: "POMODORO_SET_STATUS",
    status
  };
};

const setPomodoroRuns = runs => {
  return {
    type: "POMODORO_SET_RUNS",
    runs
  };
};



export const timerActions = {
  setTimerStatus,
  setChronometer,
  setCountdown,
  setPomodoroState,
  setPomodoroTime,
  setPomodoroStatus,
  setPomodoroRuns
};
