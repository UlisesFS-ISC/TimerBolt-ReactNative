import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  TextInput
} from "react-native";
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  authContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 80
  },
  formSection: {
    width: 300,
    flexDirection: "column",
    justifyContent: "space-around",
    margin: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 1,
    textAlign: "center",
    paddingBottom: 35
  },
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 30
  },
  formChangeSection: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25
  },
  formChangeSectionMessage: {
    fontWeight:"400",
    color: "dodgerblue"
  },
  input: {
    width: 150,
    fontSize: 15,
    paddingLeft: 10
  },
  actionButton: {
    flex: 1
  },
  toggleButton: {
    flex: 1
  }
});

export default class Auth extends Component {
  static FormTypeChangeSection({ authFormType, setFormType }) {
    let nextForm, message;
    if (authFormType === "LOG_IN") {
      message = "Don't have an account? Press here to create your account";
      nextForm = "SIGN_UP";
    } else {
      message = "Already a member?. Press here to log-in";
      nextForm = "LOG_IN";
    }
    return (
      <View style={styles.formChangeSection}>
        <TouchableHighlight
        onPress={() => {
          setFormType(nextForm);
        }}
      >
      <Text style={styles.formChangeSectionMessage} >{message}</Text>
      </TouchableHighlight>
      </View>
    );
  }

  static AuthForm({
    userName,
    email,
    password,
    confirmPassword,
    isValid,
    setUserName,
    setPassword,
    setEmail,
    setConfirmPassword,
    authFormType,
    logIn,
    signUp
  }) {
    let title = authFormType === "LOG_IN" ? "Log-In" : "Sign-Up";
    let validUsername = isValid(userName, "USERNAME");
    let validPassword = isValid(password, "PASSWORD");
    let validEmail = isValid(email, "EMAIL");
    let submitButton =
      authFormType === "LOG_IN" ? (
        <Button
          title="Log-In"
          color="blue"
          style={styles.actionButton}
          disabled={!validUsername || !validPassword}
          onPress={() => {
            logIn(userName, password);
          }}
        />
      ) : (
        <Button
          title="Sign-up"
          color="green"
          style={styles.actionButton}
          disabled={
            !validUsername ||
            !validPassword ||
            !validEmail ||
            (confirmPassword !== password || confirmPassword.length < 8)
          }
          onPress={() => {
            signUp(userName, password, email);
          }}
        />
      );
    let confirmPasswordField =
      authFormType !== "LOG_IN" ? (
        <View>
          <View style={styles.inputContainer}>
            <Text>Confirm Password: </Text>
            <TextInput
              value={confirmPassword}
              maxLength={16}
              textContentType="password"
              secureTextEntry={true}
              placeholder={"Confirm Password: "}
              style={styles.input}
              onChangeText={setConfirmPassword}
              underlineColorAndroid={
                confirmPassword === password && confirmPassword.length > 7
                  ? "green"
                  : "red"
              }
            />
          </View>
        </View>
      ) : (
        <View />
      );
    let emailField =
      authFormType !== "LOG_IN" ? (
        <View style={styles.inputContainer}>
          <Text>Email: </Text>
          <TextInput
            value={email}
            maxLength={16}
            textContentType="email"
            placeholder={"Email"}
            style={styles.input}
            onChangeText={setEmail}
            underlineColorAndroid={email ? "green" : "red"}
          />
        </View>
      ) : (
        <View />
      );
    return (
      <View style={styles.formSection}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.inputContainer}>
          <Text>User Name: </Text>
          <TextInput
            value={userName}
            maxLength={16}
            textContentType="username"
            placeholder={"User name"}
            style={styles.input}
            onChangeText={setUserName}
            underlineColorAndroid={validUsername ? "green" : "red"}
          />
        </View>
        {emailField}
        <View style={styles.inputContainer}>
          <Text>Password: </Text>
          <TextInput
            value={password}
            minLength={8}
            maxLength={16}
            textContentType="password"
            secureTextEntry={true}
            placeholder={"Password"}
            style={styles.input}
            onChangeText={setPassword}
            underlineColorAndroid={validPassword ? "green" : "red"}
          />
        </View>
        {confirmPasswordField}
        {submitButton}
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  componentDidUpdate() {
    if (this.props.token !== "") {
      Actions.TimeEntries();
    }
   }

  setUserName = value => {
    this.setState({
      userName: value
    });
  };

  setEmail = value => {
    this.setState({
      email: value
    });
  };

  setPassword = value => {
    this.setState({
      password: value
    });
  };

  setConfirmPassword = value => {
    this.setState({
      confirmPassword: value
    });
  };

  isValid = (text, type) => {
    let regExp;
    if (type === "PASSWORD") {
      regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    } else if (type === "USERNAME") {
      regExp = /^[a-zA-Z0-9.\-_$@*!]{3,16}$/;
    } else {
      regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    return regExp.test(text);
  };

  render() {
    let { AuthForm, FormTypeChangeSection } = Auth;
    let { authFormType, logIn, signUp, serviceCallFlag, setFormType } = this.props;
    let {
      isValid,
      setUserName,
      setPassword,
      setEmail,
      setConfirmPassword,
    } = this;
    let { userName, email, password, confirmPassword } = this.state;
    if (serviceCallFlag) {
      return (
        <View style={styles.authContainer}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      );
    } else
      return (
        <View style={styles.authContainer}>
          <AuthForm
            userName={userName}
            password={password}
            email={email}
            confirmPassword={confirmPassword}
            isValid={isValid}
            setUserName={setUserName}
            setPassword={setPassword}
            setEmail={setEmail}
            setConfirmPassword={setConfirmPassword}
            authFormType={authFormType}
            logIn={logIn}
            signUp={signUp}
          />
          <FormTypeChangeSection
            authFormType={authFormType}
            setFormType={setFormType}
          />
        </View>
      );
  }
}
