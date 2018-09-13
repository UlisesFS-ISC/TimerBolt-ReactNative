import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import DynamicButtonGroup from "../../components/DynamicButtonGroup/dynamic-button-group-component";
import TimeCircle from "../../components/TimeCircle/time-circle-component";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 80
  }
});

export default class Pomodoro extends Component {
  onStart = () => {
    let { setPomodoroStatus } = this.props;
    setPomodoroStatus("STARTED");
  };

  onPause = () => {
    let { setPomodoroStatus } = this.props;
    setPomodoroStatus("PAUSED");
  };

  onStop = () => {
    let {
      setPomodoroStatus,
      setPomodoroTime,
      setPomodoroRuns,
      setPomodoroState
    } = this.props;
    setPomodoroStatus("STOPPED");
    setPomodoroState("PRODUCTIVITY");
    setPomodoroTime(0, 0);
    setPomodoroRuns(0);
  };

  pomodoroRun = (timeLimit) => {
    let {
      pomodoroState,
      min,
      sec,
      runs,
      setPomodoroState,
      setPomodoroTime,
      setPomodoroRuns
    } = this.props;


    setTimeout(() => {
      if (min < timeLimit && sec < 59) {
        setPomodoroTime(-1, ++sec);
      } else if (min < timeLimit && sec === 59) {
        setPomodoroTime(++min, 0);
      } else if (min === timeLimit) {
        setPomodoroTime(0, 1);
        if (pomodoroState === "PRODUCTIVITY") {
          setPomodoroRuns(++runs);
          setPomodoroState("REST");
        } else setPomodoroState("PRODUCTIVITY");
      }
    }, 1000);
  };

  render() {
    let { onStart, onStop, onPause, pomodoroRun } = this;
    let { pomodoroState, productivityRunDuration, restRunDuration, status, mode, min, sec, runs } = this.props;

    let timeLimit =
      pomodoroState === "PRODUCTIVITY"
        ? productivityRunDuration
        : restRunDuration;

    if (status === "STARTED") {
      pomodoroRun(timeLimit);
    }

    return (
      <View style={styles.container}>
      <TimeCircle 
            min={min}
            sec={sec}
            status={status}
            mode={mode}
            pomodoroState={pomodoroState}
            pomodoroMaxValue={timeLimit}
          />
        <Text>Productivity runs: {runs}</Text>
        <DynamicButtonGroup
          status={status}
          onStart={onStart}
          onStop={onStop}
          onPause={onPause}
        />
      </View>
    );
  }
}
