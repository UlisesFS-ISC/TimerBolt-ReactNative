import { connect } from "react-redux";

import { userInfoActions } from "../../redux/user/userInfo/user-info-actions";
import Auth from "./auth";

const mapStateToProps = state => {
  return {
    authFormType: state.User.UserInfo.getIn(["authForm", "authFormType"]),
    serviceCallFlag: state.User.UserInfo.getIn(["authForm", "serviceCallFlag"]),
    token: state.User.UserInfo.get("token")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFormType: authFormType =>
      dispatch(userInfoActions.setFormType(authFormType)),
    logIn: (userName, password) =>
      dispatch(userInfoActions.logInCallAction(userName, password)),
    signUp: (userName, password, email) =>
      dispatch(userInfoActions.signUpCallAction(userName, password, email))
  };
};

const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

export default AuthContainer;
