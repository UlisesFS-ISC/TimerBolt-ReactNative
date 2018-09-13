import axios from "axios";
import { API_CONTEXT_ROOT } from "../context-root";

export const logIn = (name, password) =>
  axios.post(`${API_CONTEXT_ROOT}/authenticate`, {
    name,
    password
  });

export const signUp = (name, password, email) =>
  axios.post(`${API_CONTEXT_ROOT}/signup`, { name, password, email });
