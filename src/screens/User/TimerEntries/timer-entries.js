import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Map } from "immutable";

import TimeEntryModal from "../../../components/Modals/TimeEntryModal/time-entry-modal-component";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 80
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  timeEntrySection: {
    maxHeight: "300",
    flexDirection: "column",
    paddingTop: 15
  },
  timeEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: 10,
    margin: 10,
    backgroundColor: "dodgerblue"
  },
  timeEntryName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18
  },
  timeEntryElapsedTime: {
    fontWeight: "100",
    color: "white",
    fontSize: 16,
    marginRight: 50
  },
  bottomButton: {
    width: 200,
    alignSelf: "center",
    paddingTop: 60
  }
});

export default class TimerEntries extends Component {
  static EntrySection({ entries, triggerModal }) {
    let entryRows = [];

    entries.forEach(entry => {
      entryRows.push(
        <TouchableHighlight
          onPress={() => {
            triggerModal(entry);
          }}
          key={entry.get("name")}
        >
          <View style={styles.timeEntry}>
            <Text style={styles.timeEntryName}>{entry.get("name")}</Text>
            <Text style={styles.timeEntryElapsedTime}>
              {entry.get("timeelapsed")}
            </Text>
          </View>
        </TouchableHighlight>
      );
    });
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {entryRows}
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
    let { getEntries, token, entries, serviceCallFlag } = this.props;
    if (entries.size < 1 && token !== "" && !serviceCallFlag)
    getEntries(token);
  }

  componentDidUpdate() {
    let { getEntries, token, entries, serviceCallFlag } = this.props;
    if (entries.size < 1 && token !== "" && !serviceCallFlag)
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
    let { EntrySection } = TimerEntries;
    let {
      deleteEntry,
      serviceCallFlag,
      entries,
      token,
      logOut
    } = this.props;
    let { modalVisible, modalEntry } = this.state;
    let { triggerModal, hideModal } = this;
    let logOutButton = <View style={styles.bottomButton}>
    <Button
        title="Log-out"
        color="red"
        onPress={() => {
          logOut();
        }}
    />
    </View>;
    if (token === "") {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Please log in to check your activities.</Text>
        </View>
      );
    }
     else if (!serviceCallFlag) {
      return (<View style={styles.container}>
        <Text style={styles.title}>loading...</Text>
      </View>);
    }
      else if (entries.size < 1) {
        return (
          <View>
            <Text style={styles.title}>There are no timer entries.</Text>
            {logOutButton}
          </View>
        );
    }
    let modal = (
      <TimeEntryModal
        modalEntry={modalEntry}
        deleteEntry={() => deleteEntry(token, modalEntry)}
        hideModal={hideModal}
      />
    );
    let entrySection = (
      <EntrySection
        entries={entries}
        deleteEntry={deleteEntry}
        triggerModal={triggerModal}
      />
    );
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Timer entries</Text>
        {modalVisible ? modal : entrySection} 
        {logOutButton}
      </View>
    );
  }
}
