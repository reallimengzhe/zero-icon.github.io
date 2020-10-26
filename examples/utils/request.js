import axios from "axios";
import { Message } from "element-ui";
// import store from "@/store";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 1000 * 20 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      Message.error(response.message || "Error");
    } else {
      return response;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message.error(error.message || "Error");
    return Promise.reject(error);
  }
);

export default service;
