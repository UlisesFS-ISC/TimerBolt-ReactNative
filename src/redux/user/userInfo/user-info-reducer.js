import {fromJS } from "immutable";

const authFormTypes = {
  AUTH_LOG_IN: "LOG_IN",
  AUTH_SIGN_UP: "SIGN_UP"
};

const initialState = fromJS({
  token: '',
  userName: "",
  authForm: {
    authFormType: authFormTypes.AUTH_LOG_IN,
    serviceCallFlag: false
  },
  userError: false
});

const UserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SERVICE_CALL_FULFILLED": {
      let { token, userName } = action;
      return state
        .set("token", token)
        .set("userName", userName);
    }
    case "AUTH_SERVICE_CALL_FAILED": {
      let { error } = action;
      return state.set("userError", error);
    }
    case "SET_FORM_TYPE": {
      let { formType } = action;
      return state.setIn(["authForm", "authFormType"], formType);
    }
    case "TOGGLE_SERVICE_CALL_FLAG": {
      let toggledFlag = !state.getIn(["authForm", "serviceCallFlag"]);
      return state.setIn(["authForm", "serviceCallFlag"], toggledFlag);
    }
    case "RESET_USER_INFO": {
      return initialState;
    }
    default:
      return state;
  }
};

export default UserInfoReducer;
