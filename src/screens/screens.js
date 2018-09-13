
import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import MainReducer from "../redux/main-reducer";
import Timer from "./Timer/timer-container";
import TimeEntries from "./User/TimerEntries/timer-entries-container";
import Auth from "./Auth/auth-container";
import Pomodoro from "./Pomodoro/pomodoro-container";
import TabIcon from "../../assets/icons/icons";

const RouterWithRedux = connect()(Router);
const store = createStore(MainReducer, {}, applyMiddleware(thunk));


const Routes = () => (
    <Provider store={store}>
        <RouterWithRedux>
            <Stack key="root" tabs={true}>
                <Stack icon={() => <TabIcon icon="CLOCK"/>} key="Time Tracking" tabs={true}>
                    <Scene title="Countdown" icon={() => <TabIcon icon="HOURGLASS"/>}  key="Countdown" component={Timer} mode={"COUNTDOWN"}/>
                    <Scene title="Chronometer" icon={() => <TabIcon icon="CHRONOMETER"/>}  key="Chronometer" component={Timer} mode={"CHRONOMETER"}/>
                    <Scene title="Pomodoro" icon={() => <TabIcon icon="TOMATO"/>}  key="Pomodoro" component={Pomodoro} mode={"POMODORO"}/>
                </Stack>
                 <Stack icon={() => <TabIcon icon="USER"/>} key="User Panel">
                    <Scene key="SignIn" hideNavBar component={Auth} title="Sign-in" />
                    <Scene hideNavBar key="TimeEntries" component={TimeEntries} title="Time Entries" />
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