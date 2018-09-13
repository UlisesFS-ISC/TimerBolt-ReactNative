import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import pomodoroImage from '../../../assets/images/pomodoroImage.png'

export const styles = StyleSheet.create({
  innerText: {
      fontWeight: "bold",
      fontSize: 14,
      marginVertical: 1,
      textAlign: "center"
  },
  innerImage:{
    width: 60,
    height: 60,
    alignSelf: "center"
  }
});

const TimeCircles = ({hour, min, sec, status, mode='COUNTDOWN', pomodoroMaxValue=25, pomodoroState='PRODUCTIVITY'}) => {
    if (mode === 'POMODORO') {
        return (
            <AnimatedCircularProgress
                size={200}
                width={20}
                fill={parseInt((min / pomodoroMaxValue) * 100)}
                tintColor={pomodoroState !== "PRODUCTIVITY"  ? "dodgerblue" : "green"}
                backgroundColor="#BDBDBD" >
                {
                    (fill) => (
                        <AnimatedCircularProgress
                            size={160}
                            width={18}
                            fill={parseInt((sec / 60) * 100)}
                            tintColor={pomodoroState !== "PRODUCTIVITY"  ? "blue" : "red"}
                            backgroundColor="#BDBDBD" >
                            {
                                (fill) => (
                                    <View>
                                        <Image
                                            source={pomodoroImage}
                                            style={styles.innerImage}
                                        />
                                        <Text>
                                            {pomodoroState} !
                                        </Text>
                                        <Text style={styles.innerText}>
                                            {min} : {sec}
                                        </Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                    )
                }
                </AnimatedCircularProgress>
        );
    }
    else
    return (
        <AnimatedCircularProgress
            size={200}
            width={20}
            fill={parseInt((hour / 24) * 100)}
            tintColor={status !== "STOPPED"  ? "#00BCD4" : "#FF5722"}
            backgroundColor="#BDBDBD" >
            {
                (fill) => (
                    <AnimatedCircularProgress
                        size={160}
                        width={18}
                        fill={parseInt((min / 60) * 100)}
                        tintColor={status !== "STOPPED"  ? "#009688" : "#F44336"}
                        backgroundColor="#9E9E9E" >
                        {
                            (fill) => (
                                <AnimatedCircularProgress
                                    size={124}
                                    width={18}
                                    fill={parseInt((sec / 60) * 100)}
                                    tintColor={ status !== "STOPPED"  ? "#00796B" : "#D32F2F"}
                                    backgroundColor="#757575" >
                                    {
                                        (fill) => (
                                            <Text style={styles.innerText}>
                                                {hour} : {min} : {sec}
                                            </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>
                            )
                        }
                    </AnimatedCircularProgress>
                )
            }

        </AnimatedCircularProgress>
    );
};

export default TimeCircles;