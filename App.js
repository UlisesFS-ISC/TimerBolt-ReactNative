
import React from 'react';
import {AppLoading, Font} from "expo";
import Screens from './src/screens/screens';
import {Root} from 'native-base';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("native-base/Fonts/Ionicons.ttf")
        });
        this.setState({loading: false});
    }

    render() {
        return (
            <Root>
                {this.state.loading ? <AppLoading/> : <Screens/>}
            </Root>
        );
    }
}
