import axios from "axios";
import { API_CONTEXT_ROOT } from "../context-root";

export const getEntries = token =>
  axios({
    method: "get",
    url: `${API_CONTEXT_ROOT}/api/chronoInfo`,
    params: { token }
  });

export const insertEntry = (name, timeelapsed, token) =>
  axios({
    method: "post",
    url: `${API_CONTEXT_ROOT}/api/insertActivity`,
    data: {
      name: name,
      timeelapsed: timeelapsed
    },
    params: {
      token: token
    }
  });

export const deleteEntry = (token, entry) =>
  axios({
    method: "post",
    url: `${API_CONTEXT_ROOT}/api/removeActivity`,
    data: entry,
    params: { token }
  });
