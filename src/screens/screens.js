import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import MainReducer from "../redux/main-reducer";
import Timer from "./Timer/timer-container";
import TimeRecords from "./User/TimerRecords/timer-records-container";
import Auth from "./Auth/auth-container";
import Pomodoro from "./Pomodoro/pomodoro-container";
import Schedule from "./User/Schedule/schedule-container";
import UserPanel from "./User/UserPanel/user-panel-container";
import TabIcon from "../../assets/icons/icons";

const RouterWithRedux = connect()(Router);
const store = createStore(MainReducer, {}, applyMiddleware(thunk));


const Routes = () => (
    <Provider store={store}>
        <RouterWithRedux>
            <Stack key="root" tabs={true}>
                <Stack icon={() => <TabIcon icon="CLOCK"/>} key="Time Tracking" tabs={true}>
                    <Scene icon={() => <TabIcon icon="HOURGLASS"/>}  key="Countdown" component={Timer} mode={"COUNTDOWN"}/>
                    <Scene icon={() => <TabIcon icon="CHRONOMETER"/>}  key="Chronometer" component={Timer} mode={"CHRONOMETER"}/>
                    <Scene icon={() => <TabIcon icon="TOMATO"/>}  key="Pomodoro" component={Pomodoro} mode={"POMODORO"}/>
                </Stack>
                 <Stack icon={() => <TabIcon icon="USER"/>} key="User Panel">
                 <Scene key="SignIn"  component={Auth} />
                    <Scene key="UserPanel" component={UserPanel} />
                    <Scene key="TimeRecords" component={TimeRecords} />
                    <Scene key="Schedule" component={Schedule} />
                </Stack>
            </Stack>
        </RouterWithRedux>
    </Provider>
);
const styles = {
    navigationBarStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
};

export default Routes;