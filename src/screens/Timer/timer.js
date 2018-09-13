import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import TimeInputs from "../../components/TimeInput/time-input-component";
import TimeEntryPromptModal from "../../components/Modals/TimeEntryPromptModal/time-entry-prompt-modal-component";
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

export default class Timer extends Component {
  constructor(props) {
    super();
    this.state = {
      activityTime: "",
      entryName: "",
      modal: false
    };
  }
s
  setActivityTime = timer => {
    this.setState({
      activityTime: `${timer.get("hour", "0")} : ${timer.get(
        "min",
        "0"
      )} : ${timer.get("sec", "0")}`
    });
  };

  setEntryName = value => {
    this.setState({
      entryName: value
    });
  };

  toggleModal = () => {
    let { modal } = this.state;
    this.setState({
      modal: !modal
    });
  };

  onStart = () => {
    let { countdown, chronometer, mode, setTimerStatus } = this.props;
    let { setActivityTime } = this;
    let timer = mode !== 'CHRONOMETER' ? countdown : chronometer;
    if (timer.get("status") === "STOPPED" && mode !== "CHRONOMETER") {
      setActivityTime(timer);
    }
    setTimerStatus("STARTED", mode);
  };

  onPause = () => {
    let { setTimerStatus, mode } = this.props;
    setTimerStatus("PAUSED", mode);
  };

  onStop = () => {
    let { setTimerStatus, setCountdown, setChronometer, mode } = this.props;
    setTimerStatus("STOPPED", mode);
    if (mode !== "CHRONOMETER") setCountdown(0, 0, 0);
    else setChronometer(0, 0, 0);
  };



  timerRun = (hour, min, sec, setCountdown, token, toggleModal) => {
    let { onStop } = this;
    setTimeout(() => {
      if (sec > 0) {
        setCountdown(-1, -1, --sec);
      } else if (min > 0 && sec === 0) {
        setCountdown(-1, --min, 59);
      } else if (hour > 0 && min === 0) {
        setCountdown(--hour, 59, 59);
      } else {
        onStop();
        if (token !== "") toggleModal();
        else alert("countdown has finished");
      }
    }, 1000);
  };

  chronometerRun = (hour, min, sec, setChronometer) => {
    setTimeout(() => {
      if (sec < 59) {
        setChronometer(hour, min, ++sec);
      } else if (min < 59 && sec === 59) {
        setChronometer(hour, ++min, 0);
      } else if (hour < 59 && min === 59) {
        setChronometer(++hour, 0, 0);
      }
    }, 1000);
  };

  render() {
    let {
      onStart,
      onStop,
      onPause,
      timerRun,
      chronometerRun,
      setEntryName,
      toggleModal
    } = this;
    let { entryName, activityTime, modal } = this.state;
    let {
      mode,
      chronometer,
      countdown,
      setChronometer,
      setCountdown,
      userName,
      token,
      timeRecordsInsertServiceCall
    } = this.props;

    let status, hour, min, sec;
    let timeInputs, dynamicButtonGroup, modalView = <View />;

    if (modal && token !== "") {
      modalView = (
     <TimeEntryPromptModal
       visible={modal}
       toggleModal={toggleModal}
       insertEntry={timeRecordsInsertServiceCall}
       changeEntryName={setEntryName}
       entryName={entryName}
       timeElapsed={activityTime}
       userName={userName}
       token={token}
     />
   );
 }

    if(mode !== "CHRONOMETER"){
      status = countdown.get("status");
      hour = countdown.get("hour");
      min = countdown.get("min");
      sec = countdown.get("sec");
    } else {
      status = chronometer.get("status");
      hour = chronometer.get("hour");
      min = chronometer.get("min");
      sec = chronometer.get("sec");
    }

      if (status === "STOPPED" && mode === "COUNTDOWN") {
        timeInputs = (
          <TimeInputs
            hour={hour}
            min={min}
            sec={sec}
            setTime={setCountdown}
          />
        );
      }
      if (hour > 0 || min > 0 || sec > 0 || mode === "CHRONOMETER") {
        dynamicButtonGroup = (
          <DynamicButtonGroup
            status={status}
            onStart={onStart}
            onStop={onStop}
            onPause={onPause}
          />
        );
      }
      if (status === "STARTED") {
        if (mode === "COUNTDOWN") {
          timerRun(
            hour,
            min,
            sec,
            setCountdown,
            token,
            toggleModal,
            mode
          );
        } else {
          chronometerRun(hour, min, sec, setChronometer, mode);
        }
      }

    return (<View>
    <View style={styles.container}>
          <TimeCircle 
            hour={hour}
            min={min}
            sec={sec}
            status={status}
            mode={mode}
          />
          {timeInputs}
          {dynamicButtonGroup}
          {modalView}
        </View>
    </View>);
  }
}
