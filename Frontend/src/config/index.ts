import { clearUser } from "@/lib/states/auth.slice";
import store from "@/store";
import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 100000 * 12,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const RETRY_LIMIT = 3;
export const RETRY_DELAY = 2000;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("401 Unauthorized, clearing user...");
      store.dispatch(clearUser());
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
