
import React from 'react';
import { Icon, View, Image} from "react-native";
import hourglass from "./hourglass.png";
import tomato from "./tomato.png";
import stopwatch from "./stopwatch.png";
import user from "./user.png";
import clock from "./clock.png";

const ICONS = {
    "HOURGLASS": hourglass,
    "TOMATO": tomato,
    "CHRONOMETER": stopwatch,
    "CLOCK": clock,
    "USER": user,
};

const TabIcon = ({icon}) => {
    let iconSource = ICONS[icon];
    return (
        <View>
          <Image
            source={iconSource}
            style={{ width: 18, height: 22 }}
            tintColor={'blue'}
          />
        </View>
      );
  }
  
  
  export default TabIcon