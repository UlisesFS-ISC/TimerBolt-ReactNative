import {Toast } from "native-base";

export const showToast = ({success, message, error}) => {
    if (error) {
        Toast.show({
            text: error.message || message,
            buttonText: "Dismiss",
            type: "danger"
          })
    } else {
        Toast.show({
            text: message,
            buttonText: "Ok",
            type: success ? "success" : "warning"
          })
    }

}