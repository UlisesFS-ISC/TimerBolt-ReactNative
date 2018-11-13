import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {Header, Left, Body, Title} from 'native-base';


import getScreenStyles from "../screen-styles";
import TimeInputs from "../../components/TimeInput/time-input-component";
import TimeEntryPromptModal from "../../components/Modals/TimeEntryPromptModal/time-entry-prompt-modal-component";
import DynamicButtonGroup from "../../components/DynamicButtonGroup/dynamic-button-group-component";
import TimeCircle from "../../components/TimeCircle/time-circle-component";

const screenStyles = getScreenStyles();

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 80
  }
});

export default class Timer extends Component {

  static Header({mode}){
    return (<Header style={screenStyles.header}>
          <Left>
           
          </Left>
          <Body>
            <Title>{mode}</Title>
          </Body>

        </Header>);
  }
  constructor(props) {
    super();
    this.state = {
      activityTime: "",
      modalVisible: false
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


  toggleModal = value => {
    this.setState({
      modalVisible: value
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
        if (token !== "") toggleModal(true);
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
      toggleModal
    } = this;
    let {activityTime, modalVisible } = this.state;
    let {
      mode,
      chronometer,
      countdown,
      setChronometer,
      setCountdown,
      token,
      insertEntry
    } = this.props;
    let {Header} = Timer;
    let status, hour, min, sec;
    let timeInputs, dynamicButtonGroup, modalView = <View />;

    if (modalVisible && token !== "") {
      modalView = (
     <TimeEntryPromptModal
     timerType={mode}
     visible={modalVisible}
     toggleModal={toggleModal}
     insertEntry={insertEntry(token)}
     timeElapsed={activityTime}
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
    <Header mode={mode}/>
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
