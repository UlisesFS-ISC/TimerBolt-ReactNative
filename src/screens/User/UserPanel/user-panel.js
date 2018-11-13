import React, { Component } from "react";

import {Actions} from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import {Header, Left, Body, Button, Icon, Title} from 'native-base';

import getScreenStyles from "../../screen-styles";

const screenStyles = getScreenStyles();

const styles = StyleSheet.create({
  logOutContainer: {
    flex:1,
    flexDirection: "column",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 40
  },
  navigationContainer: {
    flex:1,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50
  },
  navigationPanel: {
    flex:1,
    alignContent: 'center'
  },
  navigationPanelIcon: {
    textAlign: 'center',
    fontSize: 36,
    color: 'blue'
  }
});

export default class UserPanel extends Component {

   static Header(){
    return (<Header style={screenStyles.header}>
          <Left>
           
          </Left>
          <Body>
            <Title>User panel</Title>
          </Body>

        </Header>);
  }

  static NavigationSection() {
    return (
      <View style={styles.navigationContainer}>
      <TouchableHighlight
      onPress={() => {
          Actions.TimeRecords();
      }}>
        <View style={styles.navigationPanel}>
                <Icon active type="FontAwesome" name="clock-o" style={styles.navigationPanelIcon}/>
                <Text>Time records</Text>
              
        </View>
        </TouchableHighlight>
        <TouchableHighlight
        onPress={() => {
            Actions.Schedule();
        }}>
        <View style={styles.navigationPanel}>
                <Icon active type="FontAwesome" name="calendar" style={styles.navigationPanelIcon}/>
                <Text>Schedule entries</Text>
        </View>
        </TouchableHighlight>
        
      </View>
    );
  }

   componentWillMount() {
    let { token } = this.props;
    if (token === "" )
    Actions.SignIn();
  }

  render() {
    let { NavigationSection, Header } = UserPanel;
    let {
      userName,
      token,
      logOut
    } = this.props;
    let logOutButton = <View style={styles.logOutContainer}>
    <Button danger onPress={() => logOut()}  title="Log-out">
        <Icon type="FontAwesome" active name="power-off" />
        <Text style={screenStyles.iconFont_lg}>Log out </Text>
    </Button>
    </View>;
    if (token === "") {
      return (
        <View style={screenStyles.genericScreen}>
        <Header />
          <Text style={screenStyles.title}>Please log in to check your activities.</Text>
        </View>
      );
    }
    return (
        <View style={screenStyles.genericScreen}>
        <Header />
        <Text style={screenStyles.title}>Welcome, {userName}.</Text>
        <NavigationSection />   
           {logOutButton}
      </View>
    );
  }
}
