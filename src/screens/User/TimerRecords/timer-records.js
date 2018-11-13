import React, { Component } from "react";
import {Actions} from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
import { Map } from "immutable";
import {Header, Left, Body, Button, Right, Icon, Title, Spinner, Content, List, ListItem, SwipeRow} from 'native-base';

import TimeEntryModal from "../../../components/Modals/TimeEntryModal/time-entry-modal-component";
import SpinnerScreen from "../../../components/SpinnerScreen/spinner-screen-component";
import getScreenStyles from "../../screen-styles";
import {TIMER_TYPE_ICON}  from '../../../utils/timer-constants';
import {TAG_COLORS}  from '../../../utils/style-constants';

const screenStyles = getScreenStyles();

const styles = StyleSheet.create({
timeEntryTable: {
    flexWrap:'wrap',
    paddingTop: 30
  },
  iconButton: {
    fontSize: 32,
     color: 'white'
  },
});

export default class TimerEntries extends Component {

   static Header(){
    return (<Header style={screenStyles.header}>
          <Left>
            <Button transparent
            onPress={Actions.UserPanel}>
              <Icon name='arrow-back' style={styles.iconButton}/>
            </Button>
          </Left>
          <Body>
            <Title>Timer entries</Title>
          </Body>
          <Right>
           
          </Right>
        </Header>);
  }

  static EntrySection({ entries, triggerModal, deleteEntry, token }) {
    let entryRows = [];
    entries.forEach(entry => {
      entryRows.push(
       <SwipeRow
            key={entry.get("uuid")}
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
              <Button success onPress={() => {
                triggerModal(entry);
              }}>
                <Icon active name="search" />
              </Button>
            }
            body={
             <ListItem icon>
            <Left>
                <Icon type="FontAwesome" active name={TIMER_TYPE_ICON[entry.get("timerType", "CHRONOMETER")]} style={{color: TAG_COLORS[entry.get("activityTag", "LEISURE")]}}/>
                <Text></Text>
            </Left>
            <Body>
            </Body>
            <Right>
             <Text>{entry.get("timeEntryName")} - {entry.get("timeElapsed")}</Text>
            </Right>
          </ListItem>
            }
            right={
              <Button danger onPress={() => deleteEntry(entry.get('uuid'))}>
                <Icon active name="trash" />
              </Button>
            }
          />
      );
    });
    return (
      <ScrollView contentContainerStyle={styles.timeEntryTable}>
        <List>
          {entryRows}
        </List>
      </ScrollView>
    );
  }

  constructor(props) {
    super();
    this.state = {
      modalVisible: false,
      modalEntry: []
    };
  }

   componentWillMount() {
    let { getEntries, token} = this.props;
    getEntries(token);
  }

  componentDidUpdate() {
    let { getEntries, token, entries, serviceCallFlag } = this.props;
    if ( token !== "" && !serviceCallFlag)
    getEntries(token);
  }


  triggerModal = entry => {
    this.setState({
      modalVisible: true,
      modalEntry: entry
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
      modalEntry: new Map()
    });
  };

  render() {
    let { EntrySection, Header } = TimerEntries;
    let {
      deleteEntry,
      serviceCallFlag,
      entries,
      token
    } = this.props;
    let { modalVisible, modalEntry } = this.state;
    let { triggerModal, hideModal } = this;
 
    if (token === "") {
      return (
        <View style={screenStyles.screenContainer}>
        <Header />
          <Text style={screenStyles.title}>Please log in to check your activities.</Text>
        </View>
      );
    }
     else if (!serviceCallFlag) {
      return (
        <SpinnerScreen  />
      );
    }
      else if (entries.size < 1) {
        return (
          <View>
          <Header />
            <Text style={screenStyles.title}>There are no timer entries.</Text>
          </View>
        );
    }
    let modal = (
      <TimeEntryModal
      visible={modalVisible}
        modalEntry={modalEntry}
        deleteEntry={deleteEntry}
        hideModal={hideModal}
        token={token}
      />
    );
    return (
      <View>
       {modalVisible ? modal : <View></View>}
        <Header />
         <EntrySection
            entries={entries}
            deleteEntry={deleteEntry(token)}
            triggerModal={triggerModal}
          />
      </View>
    );
  }
}
