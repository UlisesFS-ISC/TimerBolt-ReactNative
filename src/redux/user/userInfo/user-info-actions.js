import { logIn, signUp } from "../../../services/Auth/auth";
import {showToast} from '../../../utils/toast-utils';

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
        showToast({success, message: response.data.msg});
        dispatch(toggleServiceCallFlag());
      })
      .catch(error => {
        showToast({error});
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
        showToast({success:response.success, message: response.msg});
      })
      .catch(error => {
        showToast({error});
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
