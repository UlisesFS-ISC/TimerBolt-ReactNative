import { logIn, signUp } from "../../../services/Auth/auth";
import {serviceCallAlert} from "../../../components/Alert/alert-component";

const logInCallFulfilled = (token, userName) => {
  return {
    type: "LOGIN_SERVICE_CALL_FULFILLED",
    token,
    userName
  };
};

const authCallFailed = error => {
  return {
    type: "AUTH_SERVICE_CALL_FAILED",
    error
  };
};

const setFormType = formType => {
  return {
    type: "SET_FORM_TYPE",
    formType
  };
};

const logInCallAction = (name, password) => {
  return dispatch => {
    dispatch(toggleServiceCallFlag());
    logIn(name, password)
      .then(response => {
        let { success, token } = response.data;
        if (success) {
          dispatch(logInCallFulfilled(token, name));
          response.data.msg = `Welcome ${name}`;
        } 
        serviceCallAlert(response.data);
        dispatch(toggleServiceCallFlag());
      })
      .catch(error => {
        alert({success: false, msg: error.message});
        authCallFailed(error.message);
        dispatch(toggleServiceCallFlag());
      });
  };
};

const signUpCallAction = (name, password, email) => {
  return dispatch => {
    dispatch(toggleServiceCallFlag());
    signUp(name, password, email)
      .then(response => {
        serviceCallAlert(response.data);      
        dispatch(toggleServiceCallFlag());
      })
      .catch(error => {
        serviceCallAlert({success: false, msg: error.message});
        authCallFailed(error.message);
        dispatch(toggleServiceCallFlag());
      });
  };
};

const toggleServiceCallFlag = () => {
  return {
    type: "TOGGLE_SERVICE_CALL_FLAG"
  };
};

const resetUserInfo = () => {
  return {
    type: "RESET_USER_INFO"
  };
};

export const userInfoActions = {
  logInCallAction,
  signUpCallAction,
  logInCallFulfilled,
  authCallFailed,
  setFormType,
  toggleServiceCallFlag,
  resetUserInfo
};
