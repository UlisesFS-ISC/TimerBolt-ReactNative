import axios from "axios";
import { API_CONTEXT_ROOT } from "../context-root";

const url = `${API_CONTEXT_ROOT}/user/scheduleEntry`;

export const getEntries = token =>
  axios({
    method: "get",
    url: url,
    params: { token }
  });

export const insertEntry = (
  token,
  entry
) =>  axios({
    method: "post",
    url: url,
    data: entry,
    params: {
      token
    }
  });

export const deleteEntry = (token, uuid) =>
  axios({
    method: "delete",
    url: url,
    data: {uuid},
    params: { token }
  });
